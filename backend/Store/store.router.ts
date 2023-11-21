import { authenticate } from "../middlewares";
import { createOrg } from "./Controllers/createOrg";
import {createStore} from './Controllers/createStore';
import {Router} from 'express'

const StoreModule = ()=>{
    const router = Router();

    router.post('/org/create',authenticate,createOrg);
    router.post('/store/create',authenticate,createStore);

    return router;
}