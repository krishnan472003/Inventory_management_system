import { User } from "../Models/User";


export const register = async (req, res) => {
    try {
      const { username, email, password, level, storeId, orgId } = req.body;
 
      const newUser = new User({ username, email, password, level });
        if (level === 0) {
        newUser.storeId = null;
        newUser.orgId = null;
      } else {
        newUser.storeId = storeId;
        newUser.orgId = orgId;
      }
  
      await newUser.save();
  
      res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
      res.status(400).send(error.message);
    }
  };
  
