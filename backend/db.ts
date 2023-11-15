import mongoose from 'mongoose'
const mongodb = () =>{
    mongoose.connect(process.env.MONGO_URL).then(():void=>{
        console.log("Mongodb connected to database" );
    })
}

export {mongodb}
