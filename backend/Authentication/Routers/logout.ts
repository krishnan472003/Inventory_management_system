import { Router } from "express";

// import { mongodb } from "../../db";
import { AuthModel } from "../Model/SignupSchema";
// import { verifyTokenMiddleware } from "../../middleware";

//api endpoint
export const Logout = () => {
  const router = Router();
  
  router.post("/logout",async (req, res) => {
    const uId = req.body.uId;
    

      // req.session = null;
      // req.logout();
    

    try {
      const updatedUser = await AuthModel.findOneAndUpdate(
        { uId: uId },
        { $unset: { accessToken: "" } },
        { new: true }
      );

      if (updatedUser) {
        res.json({status:200,message:"logged out successfully"});
      } else {
        res.status(200).json({ message: "Invalid or expired token." });
      }
    } catch (error) {
      res.status(200).json({ message: "Error while logging out." });
    }
  });


  return router;
};
