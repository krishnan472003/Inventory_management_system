import {Router} from 'express'
import { createAdmin } from './Controllers/createAdmin';
import  {login }from './Controllers/login'
import { createUser } from './Controllers/createUser';
import { register } from './Controllers/register';
import { authenticate } from './middlewares';
export const UserModule = () =>{

    const router = Router()
    
    router.post('/register', register);
    router.post('/login', login);
    router.post('/create-admin', authenticate, createAdmin); 
    router.post('/create-user', authenticate, createUser ); 
    
    
    return router;
}
