import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

export const singupUser = async (request, response) => {
    let user = await User.findOne({email:request.body.email})
    if(user){
        return response.status(400).json({msg:"User already exist"});
    }
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      email: request.body.email,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Profile created successfully!!" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ email: request.body.email });
  if (!user) {
    return response.status(400).json({ msg: "User does not exist" });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          id:user._id,
          email:user.email,
          name:user.name
        },
        process.env.ACCESS_SECRET_KEY,
      );

      response
        .status(200)
        .json({
          accessToken: accessToken,
          name: user.name,
          username: user.email,
        });
    } else {
      response.status(400).json({ msg: "Wrong Password" });
    }
  } catch (error) {
    response.status(500).json({ msg: "error while login the user" });
  }
};

