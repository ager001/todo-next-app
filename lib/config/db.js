import mongoose from 'mongoose'

export const ConnectDB = async ()=>{
    await mongoose.connect('mongodb+srv://agermidenga_db_user:DKUcTzG49RXRn424@todo.rqx6jrx.mongodb.net/todo-app');
    console.log("tuko ndani ya Database");
    
}