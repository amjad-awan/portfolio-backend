import express from "express";
import { addPhotoController, getPhotoController } from "../controllers/photoController.js";
import  formidableMiddleware from 'express-formidable'

const route = express.Router();
// route.post("/add-photo", upload.single('photo'),addPhotoController);
route.post("/add-photo", formidableMiddleware(), addPhotoController);

route.get("/get-photo/:pid", getPhotoController);
export default route;
