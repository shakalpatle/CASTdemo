import {asyncHandler} from "../utils/asyncHandler.js";

import {ApiError} from "../utils/ApiError.js";

import {User} from "../models/user.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
   
   //get user detail from frontend

   const {fullName,email,username,password}=req.body
   console.log("email ",email)
   console.log("username ",username)
   console.log("password ",password)
   console.log("fullName ",fullName)
   console.log("req.files ",req.files)

//    if(fullName==="")
//    {
//     throw new ApiError(400,"fullName is required")
//    }
//check all at once and not writing multiple if statements

//validation - empty or not
if(
    [fullName,email,username,password].some((field) => field?.trim() === "")
){
    throw new ApiError(400,"fullName,email,username,password is required")
}


//check of user already exists from username , email
const existedUser = await User.findOne({
    $or: [
        { email: email },
        { username: username },
    ]
})

if (existedUser) {
    throw new ApiError(409, "Email or username already exists")
}

//check for images,check for avatar
const avatarLocalPath = req.files?.avatar[0]?.path ;

const coverImageLocalPath = req.files?.coverImage[0]?.path ;

console.log(req.files?.avatar[0]?.path)

if(!avatarLocalPath){
    throw new ApiError(400,"avatar path is required !!")
}

//upload them to cloudinary, avatar
const avatar = await uploadOnCloudinary(avatarLocalPath)

const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    console.log(avatar)
    console.log(coverImage)
    if(!avatar){
        throw new ApiError(400,"avatar file is required")
    }


//create user object - create entry in db
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
    })

    //remove and password and  refresh token field from response after saving data.
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //check for user creation
    if(!createdUser){
        throw new ApiError(500,"user not created")
    }

    //return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

})

export {registerUser}