import mongoose,{isValidObjectId} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";



const getAllVideos = asyncHandler(async (req, res) => {
    //const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const videos = await Video.find({})

    console.log(videos)
    if(!videos){
        throw new ApiError(
            400,
            "video not found"
        )
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Success fully get all video"
        )
    )
})

const publishAVideo = asyncHandler(async(req,res)=>{
     const {title  , description } = req.body

     if([title ,description].some((field)=>field?.trim() === ""))
     {
        throw new ApiError(
            400,
            "All fiels are required"
            
        )
     }

     const videoFileLocalpath = req.files?.videoFile[0]?.path
     const thumbnailLocalpath = req.files?.thumbnail[0]?.path

     if(!(videoFileLocalpath && thumbnailLocalpath)){
        throw new ApiError(
            400, "All files are required"
        )

     }
     const videoFile = await uploadOnCloudinary(videoFileLocalpath)
     const thumbnail =  await uploadOnCloudinary(thumbnailLocalpath)
     console.log(videoFile);
     if(!(videoFile)){
        throw new ApiError(
            400,"File is not uploaded on cloudinary"
        )
     }
     const video = await Video.create({
        videoFile:videoFile.url,
        thumbnail:thumbnail.url,
        title,
        description,
        owner:req.user._id,
        avatar:req.user.avatar,
        isPublished:true,
        duration:videoFile.duration
     })
     console.log(video._id);
     return res
     .status(200)
     .json(
        new ApiResponse(
            200,
            video,
            "Video Successfully published "
        )
     )




}
)


const getVideoById = asyncHandler(async(req,res)=>{
    const { videoId } = req.params

    if(!videoId){
        throw new ApiError(
            400,
            "Viedo Id is required"
        )
    }

    const video = await Video.findById(videoId)

    return res 
    .status(200)
    .json(
        new ApiResponse(
            200,
            video,
            "A video get success fully"
        )
    )
    
    
})

const updateVideo = asyncHandler(async(req,res)=>{
    const {videoId } = req.params
    const { title , description} = req.body

    if([videoId ,title ,description].some((field)=>field.trim()==="")){
        throw new ApiError("All fiels are requied with params")

    }

    const videoFileLocalpath = req.files?.videoFile[0]?.path 
    const thumbnailLocalpath = req.files?.thumbnail[0]?.path

    const videoFile = await uploadOnCloudinary(videoFileLocalpath)
    const thumbnail =await uploadOnCloudinary(thumbnailLocalpath)
    console.log(videoFile);
    const updatedVideo = await Video.findByIdAndUpdate(videoId,
        {
            $set:{
                videoFile:videoFile.url,
                thumbnail:thumbnail.url,
                title,
                description,
                isPublished:true

            }
        },
        {
            new:true
        }
        )
    console.log(updateVideo._id);
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedVideo,
            "Video updated Successfully"
        )
    )


})

const deleteVideo = asyncHandler(async(req,res)=>{
    const { videoId } = req.params

    if(!(videoId || (videoId != ""))){
        throw new ApiError(400 , "Video id is required")
    }

    const deletedVideo = await Video.findByIdAndDelete(videoId)
    return res
    .status(400)
    .json(
        200,
        deletedVideo,
        "Video deleted succesfully"
    )

 })

 const togglePublishStatus = asyncHandler(async(req,res)=>{
    const {videoId} = req.params

    if(!(videoId || (videoId != ""))){
        throw new ApiError(400 , "Video id is required")
    }

    const video = await Video.findById(videoId)   // const video = await Video.findById(videoId);
    console.log(video.isPublished);
    video.isPublished = !video.isPublished
    const togglepublish = await video.save()
    // Video is a blueprint for documents, and video is an instance of that blueprint representing a specific document in the database. The changes made to video are changes to that specific document in the MongoDB collection.

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            togglepublish,
            "a togglepublish video successfully"
        )
    )

 })

const getUsersAllVideo = asyncHandler(async(req,res)=>{
    
})




export {getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus

}