import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { Video } from "../models/video.model.js";
import {Like} from '../models/like.model.js'
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async(req,res)=>{
    const {videoId} = req.params

    if(!(videoId)){
        throw new ApiError(
            400,
            "Video id is required"
        )
    }
    const like = await Like.findOne({
        video:videoId,
        likedBy:req.user._id
    })

    if(like){
        const unlike = await Like.findOneAndDelete(
            {
                video:videoId,
                likedBy:req.user._id
            }
        )

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    unlike,
                    "unliked video success fully"
                )
            )
    }

    const likedByVideo = await Like.create({
        video:videoId,
        likedBy:req.user._id
    })


    return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    likedByVideo,
                    "liked video success fully"
                )
            )




})

const toggleCommentLike = asyncHandler(async(req,res)=>{
    const { commentId } =req.params
    if(!(commentId || commentId != '')){
        throw new ApiError(
            400,
            "comment id is required"
        )
    }

    const like = await Like.findOne({
        comment:commentId,
        likedBy:req.user._id
    })

    if(like){
        const unlike = await Like.findOneAndDelete(
            {
                comment:commentId,
                likedBy:req.user._id
            }
        )

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    unlike,
                    "unliked comment success fully"
                )
            )
    }

    const likedByComment = await Like.create({
        comment:commentId,

        likedBy:req.user._id
    })


    return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    likedByComment,
                    "liked Comment success fully"
                )
            )


})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if(!(tweetId  || tweetId != '')){
        throw new ApiError(
            400,"Tweet  id is required"
        )
    }
    const like = await Like.findOne({
        tweet:tweetId,
        likedBy:req.user._id
    })

    if(like){
        const unlike = await Like.findOneAndDelete(
            {
                tweet :tweetId,
                likedBy:req.user._id
            }
        )

        return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    unlike,
                    "unliked tweet success fully"
                )
            )
    }
    const likedByComment = await Like.create({
        comment:commentId,

        likedBy:req.user._id
    })
    return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    likedByComment,
                    "liked tweet success fully"
                )
            )
}
)

const getLikedVideos = asyncHandler(async (req,res)=>{

    const likedVideo = await Like.aggregate([
        {
            $match:{
                    likedBy:req.user_id              
            },
            

        },
        {
            $lookup:{
                from:"videos",
                localField:"video",
                foreignField:"_id",
                as:"videoList"
            }
        },
        {
            $unwind:"$videoList"
        }
    ])
     if(!likedVideo){
        throw new ApiError(
            400,"Error in accessing video  data List"
        )
     }

     return res.status(200)
        .json(
            new ApiResponse(
                200, 
                likedVideo,
                "Liked video list get Successfully"              
            )
        )

})

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
}