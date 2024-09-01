"use client"
import Todo from "@/Components/Todo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Home() {
  const [formData,setFormData] = useState({
    task:"",
    description:""
  })
  const [todoList,setTodoList] = useState([])

  const onChangeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
   
    const response = await axios.post('/api',formData)
    toast(response.data.msg)
    setFormData({
      task:"",
      description:""
    })
    getAllTodos();
    
    // setTodoList([...todoList,formData])
  }

  function getAllTodos(){
    axios.get("/api")
    .then((resp)=>{
      setTodoList(resp.data)
    })
  }


  function deleteTask(id){
        
    axios.delete('/api',{ params: { mongoId: id } })
    .then((resp)=>{
        toast(resp.data.msg)
        getAllTodos();
    })

  }

  function updateStatus(id){
    console.log(id,"id")
    axios.put('/api',{mongoId:id} )
    .then((resp)=>{
        toast(resp.data.msg)
        getAllTodos();
    })
    
  }
  // console.log(todoList[0]._id)
  useEffect(()=>{
    
    getAllTodos();
    
  },[])
  return (
    <div>
    <ToastContainer theme="dark"/>
      <form className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
    <input placeholder="Enter Tasks" type="text" name="task" className="p-3 w-full border-2 border-slate-800" value={formData.task} onChange={onChangeHandler}/>
      <textarea name="description" placeholder="Enter Description" className="px-3 py-2 border-2 mt-1 border-slate-800 w-full " value={formData.description} onChange={onChangeHandler}/>
      <button type="submit" className="bg-orange-500 px-11 py-3 text-xl mt-4 font-semibold rounded-lg" onClick={onSubmitHandler}>Add Task</button>
      </form>
    

<div className="relative overflow-x-auto mt-24 w-[75%] mx-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          
          {
            todoList.map((todos,index)=>(
              
             <Todo key={index} id={index+1} taskName={todos.task} description={todos.description} mongoId={todos._id} deleteTask={deleteTask} updateStatus={updateStatus} status={todos.isCompleted}/>
            
            ))
          }
        </tbody>
    </table>
</div>
    


    </div>
  );
}
