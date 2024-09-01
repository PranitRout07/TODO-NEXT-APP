import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModels";
import { NextResponse } from "next/server";
const LoadDB = async () => {
    await ConnectDB()
}

LoadDB();

export async function GET(request) {
    
   const all = await TodoModel.find({})
   return NextResponse.json(all)
}

export async function POST(request){
    const {task,description} = await request.json();
    await TodoModel.create({
        task,
        description
    })
    return NextResponse.json({msg:"Task added"})
}

export async function DELETE(request){
    const mongoId = await request.nextUrl.searchParams.get('mongoId')
    const task = await TodoModel.findByIdAndDelete(mongoId)
    return NextResponse.json({msg:`${task['task']} is deleted!`})
}

export async function PUT(request){
    const mongoId = await request.json()
    const task = await TodoModel.findById(mongoId['mongoId'])
    console.log(task)
    const id = mongoId['mongoId']
    if(!task.isCompleted){
        await TodoModel.findByIdAndUpdate(id,{isCompleted:true})
    }else{
        await TodoModel.findByIdAndUpdate(id,{isCompleted:false})
    }
    return NextResponse.json({msg:`${task['task']}'s status is updated!`})
}