import express from "express";
import {  addProject, getProjects, getSingleProject } from "../controllers/projectsController.js";

const route = express.Router();
route.post("/add-project",addProject);
route.get("/get-projoct", getProjects);
route.get("/get-single-project/:id", getSingleProject);
// route.get("/get-single-photo/:id",getPhoto)



export default route;
