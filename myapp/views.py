import json
import os
import io
import pdfplumber
from openai import OpenAI
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from time import sleep

load_dotenv()
openai_api_key = os.getenv("API")

client = OpenAI(api_key=openai_api_key)

@csrf_exempt
def lambda_handler(request):
    if request.method == 'POST':
        instructions = request.POST.get('instructions', '')
        files = request.FILES
        response3 = None
        text = ""  # Initialize text variable
        
        for file_obj in request.FILES.getlist('FILES'):
            print("IN")
            text += "\nResume Data:\n"
            # Read the PDF file data
            pdf_data = file_obj.read()
            # Extract text from PDF using pdfplumber
            pdf_text = extract_text_from_pdf(pdf_data)
            text+=pdf_text + "\n"
            # Append extracted text to the main text variable
        
        # Append instructions to the main text variable
        text += instructions
        print( text)
        # Create assistant, thread, and message
        assistant = create_assistant()
        thread = create_thread()
        add_message_to_thread(thread.id, text)
        
        # Run assistant and wait for completion
        runm = run(assistant.id, thread.id)
        run_status(thread.id, runm.id)
        
        # Retrieve assistant response
        for item in display_assistant_messages(thread.id):
            response3 = item.content[0].text.value
            break
        
        print(response3)
        return JsonResponse({"message": "Success", "data": response3})
    else:
        return JsonResponse({"error": "Only POST requests are allowed"})

# Function to create an OpenAI assistant
def create_assistant(name="Crux's candidate hiring bot", instructions="You are Crux's CV shortlisting bot that lets crux find the most suitable candidates amongst a list of data given to you. Just send back the json output, nothing else", tools=[{"type": "code_interpreter"}], model="gpt-3.5-turbo-1106", file_ids=[]):
    my_assistant = client.beta.assistants.create(
        instructions=instructions,
        name=name,
        tools=tools,
        model=model,
        file_ids=file_ids
    )
    return my_assistant

# Function to create a thread
def create_thread():
    thread = client.beta.threads.create()
    return thread

# Function to add a message to a thread
def add_message_to_thread(thread_id, content):
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=content
    )
    return message

# Function to display assistant messages
def display_assistant_messages(thread_id):
    messages = client.beta.threads.messages.list(
        thread_id=thread_id
    )
    return messages

# Function to run assistant
def run(assistant_id, thread_id):
    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=assistant_id
    )
    return run

# Function to check run status
def run_status(thread_id, run_id):
    status = client.beta.threads.runs.retrieve(
        thread_id=thread_id,
        run_id=run_id
    )
    while status.status != "completed":
        status = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
        )
        print(status.status)
        sleep(5)
    return status

# Function to extract text from PDF data using pdfplumber
def extract_text_from_pdf(pdf_data):
    # Inside the extract_text_from_pdf function
    try:
        with pdfplumber.open(io.BytesIO(pdf_data)) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
    except Exception as e:
        print("Error extracting text from PDF:", e)
        text = None
    return text
