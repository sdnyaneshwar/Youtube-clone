import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";



const getAllVideos = asyncHandler(async (req, res) => {
    const {isVideo} = req.body
    //const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const videos = await Video.find(
        {
           isVideo:isVideo
        }
    )

    if (!videos) {
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

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description,isVideo } = req.body

    if ([title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(
            400,
            "All fiels are required"

        )
    }

    const videoFileLocalpath = req.files?.videoFile[0]?.path
    const thumbnailLocalpath = req.files?.thumbnail[0]?.path

    if (!(videoFileLocalpath && thumbnailLocalpath)) {
        throw new ApiError(
            400, "All files are required"
        )

    }
    const videoFile = await uploadOnCloudinary(videoFileLocalpath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalpath)
    //  console.log(videoFile);
    if (!(videoFile)) {
        throw new ApiError(
            400, "File is not uploaded on cloudinary"
        )
    }
    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        owner: req.user._id,
        avatar: req.user.avatar,
        isPublished: true,
        duration: videoFile.duration,
        isVideo:isVideo
    })
    //  console.log(video._id);
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


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(
            400,
            "Viedo Id is required"
        )
    }

    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "videoLikedList",

            }
        },
        
        {
            $addFields: {
                videoLikedCount: {
                    $size: "$videoLikedList"
                },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user._id, "$videoLikedList.likedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $limit: 1 // Limit the result to only one document
        }
    ])

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

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body

    if ([videoId, title, description].some((field) => field.trim() === "")) {
        throw new ApiError("All fiels are requied with params")

    }

    const videoFileLocalpath = req.files?.videoFile[0]?.path
    const thumbnailLocalpath = req.files?.thumbnail[0]?.path

    const videoFile = await uploadOnCloudinary(videoFileLocalpath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalpath)
    // console.log(videoFile);
    const updatedVideo = await Video.findByIdAndUpdate(videoId,
        {
            $set: {
                videoFile: videoFile.url,
                thumbnail: thumbnail.url,
                title,
                description,
                isPublished: true

            }
        },
        {
            new: true
        }
    )
    // console.log(updateVideo._id);
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

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!(videoId || (videoId != ""))) {
        throw new ApiError(400, "Video id is required")
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

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!(videoId || (videoId != ""))) {
        throw new ApiError(400, "Video id is required")
    }

    const video = await Video.findById(videoId)   // const video = await Video.findById(videoId);
    // console.log(video.isPublished);
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

const getUserAllVideos = asyncHandler(async (req, res) => {
    const { Id } = req.params
    console.log(Id);


    const videos = await Video.aggregate([{
        $match: {
            owner: new mongoose.Types.ObjectId(Id)
        }
    }])

    if (!videos) {
        throw new ApiError("Error in finding videos");

    }
    return res.status(200).json(new ApiResponse(
        200,
        videos,
        "videos get successfully"
    ))
})


const getVideoSearch = asyncHandler(async (req, res) => {
    const { searchText } = req.params

    console.log(searchText);

    const videos = await Video.find({});
    if (!videos) {
        throw new ApiError("Videos are not found");

    }
    const searchVideos = videos.filter((video) => video.title.toLowerCase().includes(searchText.toLowerCase()))
    if (!searchText) {
        throw new ApiError("Error in search video");
    }

    return res.status(200).json(
        new ApiResponse(200,
            searchVideos,
            "Video search get successfully"
        )
    )
})



export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getVideoSearch,
    getUserAllVideos

}