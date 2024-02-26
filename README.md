**README.md**

### Introduction
This Django application serves as an endpoint to process PDF files and text instructions using OpenAI's GPT-3.5 model. It extracts text from uploaded PDF files and combines it with user-provided instructions to generate responses from the AI model.

### [Frontend Link](https://github.com/SD-IITKGP/Crux/tree/frontend?tab=readme-ov-file)


### Setup
1. **Environment Setup**: Ensure you have Python installed on your system. Install required packages using `pip install -r requirements.txt`.
   
2. **Environment Variables**: Create a `.env` file in the myapp directory and provide your OpenAI API key.
    ```
    API=your_openai_api_key_here
    ```
   
3. **Run Server**: Start the Django development server using `python manage.py runserver`.

### Usage
1. **Endpoint**: Send a POST request to `/` endpoint with the following parameters:
   - `instructions`: Text instructions for the AI model.
   - `FILES`: PDF files to process.
   
2. **Response**: The server responds with a JSON object containing the message and the generated response from the AI model.

### Dependencies
- Django: Web framework for building web applications in Python.
- OpenAI: Python client library for interacting with the OpenAI API.
- pdfplumber: Library for extracting text from PDF files.

### Notes
- Ensure that PDF files are correctly formatted and contain readable text for accurate text extraction.
- Monitor server logs for any errors or exceptions during text extraction or AI model processing.
- This application does not handle user authentication or file management. Implement additional features as needed for production use.

### Contributors
- [Sourabh Choudhary](https://github.com/SD-IITKGP)
- [Mahim Jain](https://github.com/jainmahim)
