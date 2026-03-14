import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const doHashed = async (password) => {
  try {
    const Salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, Salt);
  } catch (error) {
    console.log("error while hashing password");
  }
};
export const comparePass = async (plainPass,hashedPass) => {
  try {
    // const Salt = await bcrypt.genSalt(10);

    return await bcrypt.compare(plainPass,hashedPass)
  } catch (error) {
    console.log("error while comparing password");
  }
};

export const createToken= async (userId)=> {
  try {
// Create the JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token
  } catch (error) {
    console.log(error)
  }
}