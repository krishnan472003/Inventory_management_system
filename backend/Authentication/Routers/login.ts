import { Router } from "express";
import { LoginData } from "../authInterface";
// import { mongodb } from "../../db";
import { AuthModel } from "../Model/SignupSchema";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

let data: LoginData;

//api endpoint
export const Login = () => {
  const router = Router();
  console.log("In Login");

  router.post("/login", async (req, res) => {
    data = {
      email: req.body.email,
      password: req.body.password,
    };

    let jwtToken: string;

    console.log("connected");
    let queryData = await AuthModel.findOne({ email: data.email });
    if (!queryData) {
      res.status(200).json({ error: "Wrong credentials",status:400 });
      return;
    }

    const isPasswordValid = await compare(data.password, queryData.password);

    if (isPasswordValid) {
      jwtToken = await jwt.sign(JSON.stringify(data), process.env.TOKEN_SECRET);
      queryData = await AuthModel.findOne({ email: data.email });
      queryData.accessToken = jwtToken;
      const updated = await queryData.save();
      if (jwtToken == null) {
        res.status(200).json({ error: "Wrong credentials" ,status:400 });
      }
       else {
        res.status(200).json({ token: jwtToken ,status:200, uId :updated.uId});
      }
    } else {
      res.status(200).json({ message: "wrong mail id", status:400 });
    }
  });

  return router;
}
