const { default: mongoose } = require("mongoose");


const Schema = new mongoose.Schema({
    task:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true 
    },
    isCompleted:{
        type:Boolean,
        default:false
    },

},{timestamp:true})

const TodoModel = mongoose.models.todo || mongoose.model('todo',Schema); //if we run this it will  create a model each time, that's why we have to use a conditional here.
export default TodoModel;