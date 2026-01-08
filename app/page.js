/* This is the main page component for the Todo/Product list */
"use client"// Enable client-side rendering
import Todo from "@/components/Todo";
import {useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



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
/**
 * Handles the form submission event.
 * 'async' allows us to perform network requests (like database saves) without freezing the UI.
 */
      const onSubmitHandler = async (e) =>{
        // Prevents the browser from reloading the page, which is the default behavior of forms
        e.preventDefault();
        try {
          //api call to save data to database will go here


          toast.success('Todo added successfully');//show success message
        } catch (error) {
          toast.error('Error adding todo');//show error message
        }

      }


  return (
    <>
    <ToastContainer theme="dark"/>
      {/* 1. Submission Form Section */}
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-150 mt-24 px-2 mx-auto">
        <input value={formData.title} onChange={onChangeHandler}
          type="text" 
          name="title" 
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea value={formData.description} onChange={onChangeHandler}//Bind textarea value to formData.description
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