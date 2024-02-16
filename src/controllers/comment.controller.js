import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponce";
import { asyncHandler } from "../utils/asyncHandler";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";

const getVideoComments =asyncHandler(async(req,res)=>{
  const {videoId} = req.params
  const {page= 1, limit =10}= req.query  

  if(!(videoId || (videoId != ''))){
    throw new  ApiError(
        400,
        "Vodeo Id is required"
    )
  }

    const comment = await Video.aggregate([
    {
        $match:{
            _id:videoId
        }
        
    },{
        $lookup:{
            from:"comments",
            localField:"_id",
            foreignField:"video",
            as:"comments"
            
        }
    },
    {
        $addFields:{
            commentCount:{
                $size:"$comments"
            }
        }
    }
  ])

  return res.status(200)
  .json(
    new ApiResponse(
        200,
        comment,
        "Comment get successfully"

    )
  )
})

const addComment = asyncHandler(async(req,res)=>{
    const {content} =req.body
    const {videoId}=req.params

    if(!(content && (videoId || (videoId != '')) )){
        throw new ApiError(
            400,"VideoId and content required"

        )
    }

    const addedComment = await Comment.create({
        content:content,
        video:videoId,
        owner:req.user._id
        
    },
    )

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            addComment,
            'comment added successfully'
        )
    )    
})

const updateComment = asyncHandler(async(req,res)=>{
    const {content} =req.body
    const {videoId}=req.params

    const updatedComment = await Comment.aggregate([
        {
            $match:{
                owner:req.user._id,
                video:videoId
            }
        },
        {
            $set:{
                content:content,

            }
        }
    ])        

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                updatedComment,
                "Comment successfully updated"
            )
        )

})

const deleteComment = asyncHandler(async(req,res)=>{

})



export {getVideoComments,
    addComment,
    updateComment,
    deleteComment



}