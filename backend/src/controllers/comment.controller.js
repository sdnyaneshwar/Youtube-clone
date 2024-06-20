import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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

    const data = await Comment.aggregate([
        {
            $match:{
                video:new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"commentuser",
                pipeline:[
                    {
                        $project:{
                            fullName:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                isUpdated:{
                $cond:{
                    if:{$in:[req.user?._id,"$commentuser._id"]},
                    then:true,
                    else:false


                }
            }
            }
        }


    ]
    )


  return res.status(200)
  .json(
    new ApiResponse(
        200,
        data,
        "Comment get successfully"

    )
  )
})

const addComment = asyncHandler(async(req,res)=>{
    const {content} =req.body
    const {videoId}=req.params
    console.log("content  ",content,"videoId  ",videoId);
    if(!(content && videoId) ){
        throw new ApiError(
            400,"VideoId and content required"

        )
    }

    const comment = await Comment.create({
        content:content,
        video:videoId,
        owner:req.user._id
        
    },
    )

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            comment,
            'comment added successfully'
        )
    )    
})

const updateComment = asyncHandler(async(req,res)=>{
    const {content} =req.body
    const {commentId}=req.params
    console.log(commentId,content);

    const updatedComment = await Comment.findOneAndUpdate(
        { 
          _id: new mongoose.Types.ObjectId(commentId),  
          owner: req.user._id
         },
        { 
          content: content 
        },
        { 
          new: true 
        }
      );  

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
    const {commentId} = req.params;

    if(!commentId){
        throw new ApiError(
            400,
            "commmentId is required"
        )
    }

    const commentdlt = await Comment.findOne({
        _id:new mongoose.Types.ObjectId(commentId),
        owner:req.user._id
    })

    if(!commentdlt){
        throw new ApiError(400,"user is unautherized")

    }

    const deletedcommment = await Comment.findByIdAndDelete({
        _id:commentId
    })



    return res.status(200)
    .json(
        new ApiResponse(200,
            deletedcommment,
            "Comment is deleted "
            )
    )

})



export {getVideoComments,
    addComment,
    updateComment,
    deleteComment



}