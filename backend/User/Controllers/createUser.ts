import { User } from "../Models/User";
export const createUser = async (req, res) => {
    try {
      const { username, email, password, storeId, orgId } = req.body;
  
      const requestingUser = req.user;
      if (!requestingUser || requestingUser.level !== 1) {
        return res.status(403).json({ error: 'Permission denied. Only level 1 users can create a level 2 user.' });
      }
  
      const newUserId = requestingUser._id; // Admin's ID
  
      const newUser = new User({
        username,
        email,
        password,
        level: 2,
        storeId,
        orgId,
        createdBy: newUserId, // Store the admin's ID who created the user
      });
  
      await newUser.save();
  
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };
  
  