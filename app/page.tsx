'use client'
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
interface FileStatus {
  [key: string]: string;
}

function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<FileStatus>({});
  const [jd, setJD] = useState("");
  const [role, setRole] = useState("");
  const [output, setoutput] = useState("");
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files as FileList);
    setFiles(fileList);
  };

  async function handleSubmitRole() {
    try {
      // URL of your Django backend endpoint
      const url = 'http://127.0.0.1:8000';

      // Request body containing instructions and files
      const formData = new FormData();
      formData.append('instructions', 'role:\n' + role + '\ndescription:\n' + jd + `- Recommend the most suitable candidates for the job amongst the list of resume data
      then give your output in the JSON format given below for each of the candidate you recommend
      Format:
      {
        "candidate name":"John Doe"
      "projects": [
      {
      "project_title": "Image classification with pytorch",
      "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
      "tech_stack": ["python", "pytorch"],
      "time_duration": {
      "start": "04-2020",
      "end": "05-2020",
      "duration_months": 2,
      },
      "relevancy": 5
      },
      {
      "project_title": "Stock price prediction with LSTM",
      "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
      "tech_stack": ["python", "pytorch", "SQL"],
      "time_duration": {
      "start": "10-2021",
      "end": "12-2021",
      "duration_months": 3,
      },
      "relevancy": 3
      }
      ],
      "professional_experience": [
      {
                  "role": "Data Scientist",
                  "organization": "Swiggy"
      "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
      "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
      "time_duration": {
      "start": "05-2022",
      "end": "07-2022",
      "duration_months": 3
      },
      "relevancy": 4
      }
      ],
      "college": {
      "name": "IIT Bombay",
      "branch": "Electrical Engineering",
      "degree": "Dual Degree",
      "cgpa": 8.2,
      "start": "07-2018",
      "end": "05-2023"
      }
      }` );
      // Assuming you have access to file objects in your React component state
      files.forEach((file, index) => {
        formData.append(`FILES`, file);
      });

      // Send POST request to Django backend
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response from Django backend
      console.log(response.data);
      setoutput(response.data.data);

    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
    // axios.post('http://127.0.0.1:8000', { instructions:'role:\n'+role+'\ndescription:\n'+jd  , FILES: files })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  }

  const handleUpload = () => {
    console.log(files);
    const promises = files.map(file => {
      return new Promise<void>((resolve) => {


        setUploadStatus(prevStatus => ({
          ...prevStatus,
          [file.name]: 'Uploaded successfully'
        }));



        resolve(); // Resolve with no value

      });



    })
  };

  return (
    <div className='container mx-auto mt-24'>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-2/5 border-2 border-[#5E5ADB] border-solids rounded-xl cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-[#5E5ADB]">Click to upload PDF</span> or drag and drop</p>
          </div>
          <input id="dropzone-file" type="file" multiple onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      <div className='flex mt-8 items-center justify-center '>
        <button className='border-2 mr-2 p-2 px-5 text-black text-sm rounded-md'>Cancel</button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='bg-[#5E5ADB] p-2 px-5 text-white text-sm rounded-md' onClick={handleUpload}>Attach File </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Role</DialogTitle>
              <DialogDescription>
                Add the job description
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-8 py-4">
              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="role" className="">
                  Role*
                </Label>
                <Input
                  id="name"
                  defaultValue="Full Stack Developer"
                  className="col-span-3"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="desc" className="">
                  Job Description*
                </Label>
                <Input
                  id="desc"
                  defaultValue="eg. I joined crux's Customer Success team to help.."
                  className="col-span-3"
                  onChange={(e) => setJD(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button className='w-1/2 border-2 p-2 px-5 text-black bg-white text-sm rounded-md'>Cancel</Button></DialogClose>
              <DialogClose asChild>
                <Button className=' w-1/2 bg-[#5E5ADB] p-2 px-5 text-white text-sm rounded-md' onClick={handleSubmitRole}>
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className=''>{files.map(file => (
        <div className='flex mt-2 justify-center' key={file.name}>
          {file.name} - {uploadStatus[file.name] || 'Waiting for upload'}
        </div>
      ))}
        <div>

          <code>{output}</code>

        </div>
      </div>



    </div>
  );
}

export default FileUpload;
