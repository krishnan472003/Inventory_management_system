import { Organization } from "../Models/org.model";


export const createOrg =async (req,res)=>{
    const {name} = req.body;
    const {level} = req.user;
    if(level === 0){
        try{const newOrg = new Organization({name,store:[],admins:[]});
        await newOrg.save();
        res.json({message:"organization added"})
    }
    catch(e){
        res.json({e})
    }
    }
    else{
        res.status(400).json({message:"user not authorised"})
    }
}