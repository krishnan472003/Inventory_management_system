import jwt from "jsonwebtoken"
import { User } from "../Models/User";


export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign({ _id: user._id, level: user.level }, process.env.JWT_TOKEN, { expiresIn: '12h' });
      res.cookie('authToken', token, { httpOnly: true });
  
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  