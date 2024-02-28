import mongoose from "mongoose";
import { User } from "../models/user.model";
import { Subscription } from "../models/subcription.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponce";
import { asyncHandler } from "../utils/asyncHandler";


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channel_id } = req.params;
    if (!channel_id) {
        throw new ApiError(400, "channel id is not provided")

    }
    const model = await Subscription.create({
        subscriber: req.user._id,    // user
        channel: channel_id          // channel
    })

    if (!model?.length) {
        throw new ApiError(404, "model does not created")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                model,
                "user is subcribed"
            )
        )
})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {  // channel list who subscribed me



    const subscriberList = await Subscription.aggregate([
        {
            $match: {
                channel: req.user_id
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
                            fullName,
                            username,
                            avatar
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


const getSubscribedChannels = asyncHandler(async (req, res) => {  //me as user which channel i subcribed

    const channelList = await Subscription.aggregate([{
        $match: {
            subscriber: req.user._id
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
                            fullName,
                            username,
                            avatar
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
