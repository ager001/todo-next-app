/* This is the main page component for the Todo/Product list */
"use client"// Enable client-side rendering
import Todo from "@/components/Todo";
import axios from "axios";
import {useEffect, useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



export default function Home() {

  {/* Form Data State that holds the form input values */}
      const [formData, setFormData] = useState({
        title:"",
        description:""
      });

      const [todoData, setTodoData] = useState([]); //State to hold fetched todo items

       const fetchTodos = async () =>{
                const response = await axios('/api');//I have made a request to /api endpoint to fetch todos
                setTodoData(response.data.todos);//Update the todoData state with fetched todos
       }

       {/* Function to delete a todo item by its mongoId */}
       const deleteTodo = async(id)=>{
        //api call to delete todo will go here
          const response = await axios.delete('/api', {
            params: {
              mongoId: id
            }
          });
          //success message
          toast.success(response.data.msg);
          //then refresh the todo list
          await fetchTodos();//Refresh the todo list after deletion
         
       }

      const completeTodo = async(id)=>{
           //api call to mark todo as completed will go here

           //
           const response = await axios.put('/api', {},{
            params: {
              mongoId: id
            }
           });
           toast.success(response.data.msg);
           await fetchTodos();//Refresh the todo list after marking as completed
      }



       useEffect(()=>{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchTodos();
       },[])

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
          const response = await axios.post('/api', formData);//Send Post request to /api with formData
          toast.success(response.data.msg);//show success message from server
          setFormData({
             title:"",
             description:""
          });
          await fetchTodos();//Refresh the todo list to include the new item
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
            {/*I have made a request to /api endpoint to fetch todos and display them on the user interface */}
          {todoData.map((item, index)=>{
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id}
              deleteTodo={deleteTodo}  completeTodo={completeTodo}/>
          })}
      
          </tbody>
        </table>
      </div>
    </>
  );
}