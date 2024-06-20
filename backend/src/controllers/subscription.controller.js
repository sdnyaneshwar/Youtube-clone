import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subcription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// const toggleSubscription = asyncHandler(async (req, res) => {

//     const { channelId } = req.params;
//     console.log(channelId);
//     if (!channelId) {
//         throw new ApiError(400, "channel id is not provided")

//     }
    
//     const checkModel = await Subscription.findOneAndDelete([
//         {
//             $match:{
//                 subscriber: req.user._id,  
//                 channel: channelId    
//             }
//         },
        
//     ])

//     if(checkModel){
//         return res.status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 checkModel,
//                 "channel is Unsubscribed"     

//             )
//         )
//     }

//     console.log(req.user._id);
//     const model = await Subscription.create({
//         subscriber: req.user._id,    // user
//         channel: channelId          // channel
//     })

//     // if (!model?.length) {
//     //     throw new ApiError(404, "model does not created")
//     // }

//     return res.status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 model,
//                 "user is subcribed"
//             )
//         )
// })


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!channelId) {
        throw new ApiError(400, "Channel ID is not provided");
    }

    // Check if the user is already subscribed to the channel
    const existingSubscription = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId
    });

    if (existingSubscription) {
        // If the subscription exists, delete it (unsubscribe)
        await Subscription.findOneAndDelete({
            subscriber: req.user._id,
            channel: channelId
        });
        

        return res.status(200).json(new ApiResponse(
            200,
            existingSubscription,
            "Channel is unsubscribed"
        ));
    }

    // If the subscription does not exist, create a new subscription (subscribe)
    const newSubscription = await Subscription.create({
        subscriber: req.user._id,
        channel: channelId
    });

    return res.status(200).json(new ApiResponse(
        200,
        newSubscription,
        "User is subscribed"
    ));
});



const  getSubscribedChannels= asyncHandler(async (req, res) => {  // channel list who subscribed me

    const {channelId} = req.params
    if(!channelId){
        throw new ApiError(400,"Do not get channelId")
    }

    const subscriberList = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId)
            },

        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "Subscribers",
                pipeline: [
                    {
                        $project: {
                            fullName:1,
                            username:1,
                            avatar:1
                        }
                    }
                ]

            }
        }
    ])
    if (!subscriberList?.length) {
        throw new ApiError(404, " subscriberList not created")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                subscriberList,
                "subscriberList get successfully"
            )
        )


})


const getUserChannelSubscribers = asyncHandler(async (req, res) => {  //me as user which channel i subcribed
    const {subscriberId} = req.params;
    if(!subscriberId){
        throw new ApiError(400,"subscriberId is not get")
    }
    const channelList = await Subscription.aggregate([{
        $match: {
            subscriber: new mongoose.Types.ObjectId(subscriberId)
        }
    }, {
        $lookup:{
            from:"users",
            localField:"channel",
            foreignField:"_id",
            as:"Shannels",
            pipeline:[
                {
                    $project:{
                            fullName:1,
                            username:1,
                            avatar:1
                    }
                }
            ]

        }
    }
    ])
    if (!channelList?.length) {
        throw new ApiError(404, " channelList not created")
    }

    return res.status(200)
    .json(
        ApiResponse(
            200,
            channelList,
            "Channel list get successfully"
        )
    )

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
