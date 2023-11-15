import mongoose from "mongoose";
import { SignupData } from "../authInterface";
// import {SignupData} from "../Routers/SignupEndpoint"

 
const SignupSchema = new mongoose.Schema<any>({
        uId :{ type:String, required: true},
        email: { type: String},
        password: { type: String},    
        accessToken: { type: String, required: true },
      });
      // SignupSchema.plugin(passportLocalMongoose);
      // SignupSchema.plugin(findOrCreate);
export const AuthModel = mongoose.model<any>('auth', SignupSchema);
      
