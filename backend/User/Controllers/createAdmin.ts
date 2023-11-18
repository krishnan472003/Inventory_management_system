import { User } from "../Models/User";

export const createAdmin = async (req, res) => {
    try {
      const { username, email, password, orgId } = req.body;
  
      const requestingUser = req.user;
      if (!requestingUser || requestingUser.level !== 0) {
        return res.status(403).json({ error: 'Permission denied. Only superadmins can create an admin user.' });
      }
  
      // Create a new admin user
      const newAdminUser = new User({ username, email, password, level: 1, orgId, });
      await newAdminUser.save();
  
      res.status(201).send(newAdminUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };
