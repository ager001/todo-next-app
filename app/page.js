/* This is the main page component for the Todo/Product list */
"use client"// Enable client-side rendering
import Todo from "@/components/Todo";
import {useState} from 'react';



export default function Home() {

  {/* Form Data State that holds the form input values */}
      const [formData, setFormData] = useState({
        title:"",
        description:""
      });

      {/*This function handles changes in the form inputs */}
      const onChangeHandler = (e) =>{
        const name = e.target.name;//Get the name attribute of the input field
        const value = e.target.value;//Get the current value of the input field
        setFormData(form => ({...form, [name]: value}));//Update the formData state with the new value 
        console.log(formData);
        

      }


  return (
    <>
      {/* 1. Submission Form Section */}
      <form className="flex items-start flex-col gap-2 w-[80%] max-w-150 mt-24 px-2 mx-auto">
        <input 
          type="text" 
          name="title" 
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea 
          name="description" 
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>

        <button 
          type="submit" 
          className="bg-emerald-600 text-white py-3 px-11 hover:bg-emerald-700 transition-colors"
        >
          Add Todo
        </button>
      </form>

      {/* 2. Data Table Section */}
      <div className="relative overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200 mt-12 w-[80%] mx-auto mb-24">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          {/* Table Header */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold">Id</th>
              <th scope="col" className="px-6 py-3 font-bold">Title</th>
              <th scope="col" className="px-6 py-3 font-bold">Description</th>
              <th scope="col" className="px-6 py-3 font-bold">Status</th>
              <th scope="col" className="px-6 py-3 font-bold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
           <Todo/>
            <Todo/>
             <Todo/>
      
          </tbody>
        </table>
      </div>
    </>
  );
}