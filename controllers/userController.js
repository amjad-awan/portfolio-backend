import userModel from "../models/userModel.js";
import { comparePass, createToken, doHashed } from "../utils.js";

// create user
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    switch (true) {
      case !name:
        res.status(400).json({
          success: false,
          message: "Name is required",
        });
      case !email:
        res.status(400).json({
          success: false,
          message: "Email is required",
        });
      case !password:
        res.status(400).json({
          success: false,
          message: "Password is required",
        });
    }

    // check this email already exist
    const isAccountExist = await userModel.findOne({ email });
    if (!isAccountExist) {
      const hashed = await doHashed(password);
      // create admin
      await userModel({
        name,
        email,
        password: hashed,
      }).save();
      res.status(200).json({
        success: true,
        message: "user added successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Account already exists, please login",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};

// create user
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    switch (true) {
      case !email:
        res.status(400).json({
          success: false,
          message: "Email is required",
        });
      case !password:
        res.status(400).json({
          success: false,
          message: "Password is required",
        });
    }
    // check this email already exist
    let isAccountExist = await userModel.findOne({ email });
    if (isAccountExist) {
      const token = isAccountExist && (await createToken(isAccountExist._id));
      const passOk = await comparePass(password,isAccountExist.password)
      if(!passOk)
        {
          res.status(400).json({
            success: false,
            message: "password not matched",
          });
          return
        }
      res.status(200).json({
        success: true,
        message: "user login successfully",
        user: isAccountExist,
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Account does not exists, please register",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wronge",
    });
  }
};
