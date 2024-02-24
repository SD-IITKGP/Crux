from django.http import JsonResponse
import PyPDF2
import json
from time import sleep
from openai import OpenAI
import boto3
from boto3.dynamodb.conditions import Key, Attr
import json
import http.client
import os
import PyPDF2
from django.views.decorators.csrf import csrf_exempt

openai_api_key = "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"

client = OpenAI(
  api_key=openai_api_key,
)
@csrf_exempt
def lambda_handler(request):
    if request.method == 'POST':
        instructions = request.POST.get('instructions', '')
        # Step 1: Create an Assistant
        def create_assistant(name="Crux's candidate hiring bot",instructions="You are Crux's CV shortlisting bot that lets crux find the most suitable candidates amongst a list of data given to you. Just send back the json output, nothing else", tools=[{"type": "code_interpreter"}], model ="gpt-3.5-turbo-1106", file_ids=[]):
            my_assistant = client.beta.assistants.create(
                instructions=instructions,
                name=name,
                tools=tools,
                model=model,
                file_ids=file_ids
            )
            return my_assistant


        # Step 2: Create a thread
        def create_thread():
            thread = client.beta.threads.create()
            return thread


        # Step 3: Add a Message to a Thread
        def add_message_to_thread(thread_id,content):
            message = client.beta.threads.messages.create(
                thread_id=thread_id,
                role="user",
                content=content
            )
            return message


        def display_assistant_messages(thread_id):
            messages = client.beta.threads.messages.list(
                thread_id=thread_id
            )
            return messages


        def run(assistant_id, thread_id):
            run = client.beta.threads.runs.create(
                thread_id=thread_id,
                assistant_id=assistant_id
            )
            return run


        def uploadFiles(file_name):
            print(open(file_name, "rb"))
            file = client.files.create(file=open(file_name, "rb"),purpose='assistants')
            return file

        def add_message_thread_with_file(file_ids, thread_id, content):
            message = client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=content,
            file_ids=file_ids
            )
            return message

        def deleteFiles(file_id, assistant_id):
            file_deletion_status = client.beta.assistants.files.delete(
            assistant_id=assistant_id,
            file_id=file_id
            )
            return file_deletion_status

        def runStatus(thread_id, run_id):
            status = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
            )
            while(status.status != "completed"):
                status = client.beta.threads.runs.retrieve(
                thread_id=thread_id,
                run_id=run_id
                )
                print(status.status)
                sleep(5)
            return status
        response3 = None
    #     files=["myapp/file1.pdf","myapp/file3.pdf"]
    #     text = """
    #     Resume Data   
    # """
    #     for file in files:
    #         text+="""

    #         Resume:

    #         """
    #         pdf_file = open(file, 'rb')
    #         # Create a PdfReader object
    #         pdf_reader = PyPDF2.PdfReader(pdf_file)

    #         # Get the number of pages in the PDF file
    #         num_pages = len(pdf_reader.pages)

    #         # Extract text from each page
    #         for page_num in range(num_pages):
    #             page = pdf_reader.pages[page_num]
    #             text += page.extract_text()
    #         # Close the PDF file
    #         pdf_file.close()
            # Print the extracted text
        # print(text)
        # print(instructions+text)
        assistant=create_assistant()
        thread=create_thread()
        add_message_to_thread(thread.id,instructions)
        runm = run(assistant.id,thread.id)
        runStatus(thread.id,runm.id)
        print("Done")
        for item in display_assistant_messages(thread.id):
            print(item)
            response3 = item.content[0].text.value
            break
        print(response3);
        return JsonResponse({"message": "Success", "data": response3})
    else:
        return JsonResponse({"error": "Only POST requests are allowed"})


# if __name__ == '__main__':
    # assistant=create_assistant()
#     thread=create_thread()
#     file = uploadFiles(input("File to Input:"))
#     add_message_thread_with_file(file.id, thread.id,"Please take this file and answer the questions in the further inputs")
#     add_message_to_thread(thread.id,"Please provide me the summary of the file provided above.")
#     runm = run(assistant.id,thread.id)
#     runStatus(thread.id,runm.id)
#     while(1):
        # for item in display_assistant_messages(thread.id):
        #     print(item.role," : ",item.content[0].text.value,"\n")
#         add_message_to_thread(thread.id,input("Please ask a question: "))
#         runm = run(assistant.id,thread.id)
#         runStatus(thread.id,runm.id)
    # print(display_assistant_messages(thread.id))


# print(
#   lambda_handler('''- Recommend the most suitable candidates for the job amongst the list of resume data entered for a Software Engineering Intern role
#                  Give your output in the JSON format given below
#                  Format:
# {
#     "projects": [
#         {
#             "project_title": "Image classification with pytorch",
#             "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
#             "tech_stack": ["python", "pytorch"],
#             "time_duration": {
#                 "start": "04-2020",
#                 "end": "05-2020",
#                 "duration_months": 2,
#             },
#             "relevancy": 5
#         },
#         {
#             "project_title": "Stock price prediction with LSTM",
#             "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
#             "tech_stack": ["python", "pytorch", "SQL"],
#             "time_duration": {
#                 "start": "10-2021",
#                 "end": "12-2021",
#                 "duration_months": 3,
#             },
#             "relevancy": 3
#         }
#     ],
#     "professional_experience": [
#         {
# 						"role": "Data Scientist",
# 						"organization": "Swiggy"
#             "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
#             "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
#             "time_duration": {
#                 "start": "05-2022",
#                 "end": "07-2022",
#                 "duration_months": 3
#             },
#             "relevancy": 4
#         }
#     ],
#     "college": {
#         "name": "IIT Bombay",
#         "branch": "Electrical Engineering",
#         "degree": "Dual Degree",
#         "cgpa": 8.2,
#         "start": "07-2018",
#         "end": "05-2023"
#     }
# }'''
# )
# )