import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("local file path",localFilePath);
        if(!localFilePath) {
            console.log("file path is empty when using cloudinary");
            return null;
        }
        //upload file on cloudinary from local server
        console.log("cloudinary upload");
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        })
        //file uploaded
        console.log("response is: ", response);

        console.log("file uploaded on cloudinary",response.url);
        return response;
        

    } catch (error) { 
        fs.unlinkSync(localFilePath);

        console.log("error in cloudinary upload:  ", error)  //delete file from local server as upload operation failed
        return null;
    }
}

  export {uploadOnCloudinary}