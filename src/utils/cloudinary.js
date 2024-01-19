// import {v2 as cloudnary} from 'cloudnary'
// import { log } from 'console';
// import fs from 'fs'


          
// cloudnary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret:  CLOUDINARY_API_SECRET
// });


// const uploadOnCloudinary = async(localFilePath)=>{
//     try {
//         if(!localFilePath) return null;
//         //upload the file on cludinary
//         const response =await cloudnary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         //file has been uloaded successfully;
//         console.log("file is uploaded on cloudnary",response.url)

//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath) //remove the localy save temporary file as the uploaded operation on fail
//         return null;
//     }
// }


// export {uploadOnCloudinary}


import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}