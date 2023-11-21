import { Organization } from "../Models/org.model";
import { Store } from "../Models/store.model";

export const createStore = async(req,res)=>{
    
    const {name} = req.body;
    const {level} = req.user;
    if(level === 1){
        const {orgId} = req.user;
        const newStore = new Store({name:name,orgId:orgId,user:[],products:[]})
        const store = await newStore.save();
        const updatedOrg = await Organization.findByIdAndUpdate(orgId,{$push:{
            stores:store._id
        }})
        res.json(store)
        
    }
    else{
        res.status(400).json({message:"user not authorised"})
    }
}