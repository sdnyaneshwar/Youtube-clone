// import mongoose from 'mongoose'
// import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'


// const videoSchema =new Schema({

//     video:{
//         type:String,
//         required:true
//     },
//     thumbnail:{
//         type:String,
//         required:true
//     },
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     duration:{
//         type:Number,     //cloudnary
//         required:true
//     },
//     view:{
//         type:Number, 
//         default:0
//     },
//     isPublish:{
//         type:Boolean,
//         default:true
//     },
//     owner:{
//         type:Schema.Type.ObjectId,
//         ref:"User"
//     }



// },{timestamps:true})

// videoSchema.plugin(mongooseAggregatePaginate);

// export const Video = mongoose.modle("Video",videoSchema)


import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        avatar:{
            type:String,
            required:true

        }

    }, 
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)