 
import photoModal from "../models/photoModal.js";
import fs from 'fs';

export const addPhotoController = async (req, res) => {
  try {
    const photo = req.files.photo; // formidableMiddleware parses the files into req.files
    if (!photo) {
      return res.status(400).json({
        success: false,
        message: "No photo provided",
      });
    }

    let newPhoto = new photoModal();
    newPhoto.photo.data = fs.readFileSync(photo.path);
    newPhoto.photo.contentType = photo.type; // Assuming you want to store the content type as well

    const savedPhoto = await newPhoto.save();
    res.status(201).json({
      success: true,
      message: "New photo is added",
      savedPhotoId: savedPhoto._id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while adding photo",
      error: error.message,
    });
  }
};

// export const addPhotoController = async (req, res) => {
//   try {
//     const  photo  = req.file;
//     console.log("photo", photo)
//     if (!photo) {
//       return res.status(400).json({
//         success: false,
//         message: "No photo provided",
//       });
//     }
//     let newPhoto = new photoModal();
//     if (photo) {
//       newPhoto.photo.data = fs.readFileSync(photo.path);
//     }
//     const savedPhoto = await newPhoto.save();
//     res.status(201).json({
//       success: true,
//       error: false,
//       message: "New photo is added",
//       savedPhotoId: savedPhoto._id,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while adding photo",
//       error: error.message,
//     });
//   }
// };


export const getPhotoController = async (req, res) => {
  console.log(req.params.pid)
  try {
    const project = await photoModal.findOne({_id:req.params.pid});

    if (project && project.photo && project.photo.data) {  // Check for existence of project and project.photo
      res.set("Content-type", project.photo.contentType);
      return res.status(200).send(project.photo.data);
    } else {
      res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error: "this error" + error,
    });
  }
  
};