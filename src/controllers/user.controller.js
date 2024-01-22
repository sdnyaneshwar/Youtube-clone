import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponce.js";


// const registerUser=asyncHandler(async (req,res)=>{
//     res.status(200).json({
//         message:"ok"
//     })
// })

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    //validation -not empty
    //check if user already exist :username,emails
    // check for images
    //upload them to cloudnary,avatar

    // creat user object -creat entry db
    //remove password and refresh token
    //check for user creaton
    // return response

    const {fullname, email, username,password}=req.body
    console.log("email : ",email)
    
    if( 
        [ fullname,email,username,password].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400 ,"All fiels are required")
    }

   const existedUser = await User.findOne({
        $or: [{ username } , { email }]
    })

    if(existedUser){
        throw new ApiError( 409 , "User with email or username already exist ")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;    //it is on server not on cloudnary
    const coverImageLocalpath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

   const avatar= await uploadOnCloudinary(avatarLocalPath);
   const coverImage= await uploadOnCloudinary(coverImageLocalpath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")

    }
     
    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowercase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
        )
    
    if(!createdUser){
        throw new ApiError(500, "something went wrong registering user")
    }    

    return res.status(201).json(
        new ApiResponse(200, createdUser ,"user registered successfully")
    )
    
} )

export {registerUser,}