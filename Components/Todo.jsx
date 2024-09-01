
import React from "react";


export default function Todo({id,taskName,description,status,mongoId,deleteTask,updateStatus}){

    return (
        <tr className="bg-white dark:bg-gray-800" >
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {id}
        </th>
        <td className="px-6 py-4">
            {taskName}
        </td>
        <td className="px-6 py-4 w-1/4 text-wrap">
            {description} 
        </td>
        <td className="px-6 py-4">
            {status?"Completed":"Pending"}
        </td>
        <td className="px-6 py-4 flex gap-1">
            <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg" onClick={()=>{updateStatus(mongoId)}}>Done</button>
            <button className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg" onClick={()=>{deleteTask(mongoId)}}>Delete</button>
        </td>
        </tr>
    )
}