import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponce.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken= async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh token  ")
    }

}


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

    const {fullName, email, username,password}=req.body
    console.log("email : ",email)
    
    if( 
        [ fullName,email,username,password].some((field)=> field?.trim()==="")
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
    //const coverImageLocalpath = req.files?.coverImage[0]?.path;

    let coverImageLocalpath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
        coverImageLocalpath= req.files.coverImage[0].path;

    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar 2 file is required")
    }

   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalpath);
    //console.log(avatar)
   if(!avatar){
        throw new ApiError(400,"Avatar 1 file is required")

   }
     
    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
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

const loginUser = asyncHandler( async(req,res)=>{
    // req body => data
    // username or email
    //find the user
    //password check
    //access and refresh token
    //send cookies
    // res successfully login

    const { email,username,password} = req.body
    console.log(req.body)
    if(!username && !email){
        throw new ApiError(400, "username or password is required")
    }

    const user = await User.findOne({
        $or:[{username} , {email}]
    })

    if(!user){
        throw new ApiError(400,"User does not exist")
    }

    const ispasswordvalid = await user.isPasswordCorrect(password)

    if(!ispasswordvalid){
        throw new ApiError(401,"Invalid user credentials")
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    console.log(loggedInUser)
    const options ={
        httpOnly:true,
        secure:true
    }
    // return res
    // .status(200)
    // .cookie("accessToken",accessToken,options)
    // .cookie("refreshToken",refreshToken,options)
    // .json(
    //     new ApiResponse(
    //         200,
    //         {
    //             user : loggedInUser , accessToken , refreshToken
    //         },
    //         "User logged In Successfully"
    //     )
    // )
    return res
    .status(300)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )



})

const logOutUser = asyncHandler( async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options ={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, {},"User logged Out"))
})

const refreshAccessToken = asyncHandler( async (req,res) =>{
   const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

   if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
   }

   try {
    const decodedToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET)
    
    const user = await User.findById(decodedToken?._id)
 
    if(!user){
     throw new ApiError(401 ,"Invalid refresh token")
    }
    //compare user refreshtoken and database refreshtoken
 
    if(incomingRefreshToken !== user?.refreshToken){
     throw new ApiError(401, "Refresh token invalid or expire")
    }
 
    const options ={
     httpOnly:true,
     secure:true
    }
 
    const {accessToken ,newRefreshToken}=await generateAccessAndRefreshToken(user._id)
 
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken", newRefreshToken,options)
    .json(
         new ApiResponse(
             200,
             {accessToken,refreshToken : newRefreshToken}
             ,
             "Access token refreshed"
         )
    )
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
    
   }

})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
   const {oldPassword ,newPassword}= req.body

   const user = await User.findById(req.user._id) // add user in user middleware
   
   const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

   if(!isPasswordCorrect){
    throw new ApiError(201,)
   }

   user.password =password;
   user.save({validateBeforeSave:false}) // when user password .save then it call the pre function inside the usermodel

   return res
   .status(200)
   .json(new ApiResponse(
    200,
    {},
    "password change successfully"
   ))

})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(200 , req.user ,"Current user fetched successfully")
})

const updateAccountDetails = asyncHandler(async(req,res)=>{
    
    const {fullName , email} = req.body
    
    if(!fullName || !email){
        throw new ApiError(400 ,"all field are reuired")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                fullName,  // fullName =fullName default name are same
                email:email
            }
        },
        {
        new:true
        }
        ).select("-password") // if we add new:true it returns updated user and we have not required password field

        return res
        .status(200)
        .json(
            new ApiResponse(200, user ," account details updated successfully")
        )

})

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400, " Error while Uploading avatar ")
    }

   const user =  await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{avatar:avatar.url}
        },
        {new:true}).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200,
            user,
            "Avatar Image updated successfully")
        )

})
const updateUserCoverImage = asyncHandler(async(req,res)=>{
    const CoverImageLocalPath = req.file?.path

    if(!CoverImageLocalPath){
        throw new ApiError(400 , "CoverImage file is missing")
    }

    const coverImage = await uploadOnCloudinary(CoverImageLocalPath)

    if(!coverImage.url){
        throw new ApiError(400, " Error while Uploading coverImage ")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{coverImage:coverImage.url}
        },
        {new:true}).select("-password")
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,
        user,
        "coverImage updated successfully")
    )
})


export {registerUser ,
     loginUser ,
      logOutUser,
        refreshAccessToken,
        changeCurrentPassword,
        getCurrentUser,
        updateAccountDetails,
        updateUserAvatar,
        updateUserCoverImage

    }