// import mongoose, { Schema } from "mongoose"

// const reelSchema= new Schema(
//     {
//         videoFile: {
//             type: String, //cloudinary url
//             required: true
//         },
//         thumbnail: {
//             type: String, //cloudinary url
//             required: true
//         },
//         title: {
//             type: String, 
//             required: true
//         },
//         description: {
//             type: String, 
//             required: true
//         },
//         duration: {
//             type: Number, 
//             required: true
//         },
//         views: {
//             type: Number,
//             default: 0
//         },
//         isPublished: {
//             type: Boolean,
//             default: true
//         },
//         owner: {
//             type: Schema.Types.ObjectId,
//             ref: "User"
//         },
//         avatar:{
//             type:String,
//             required:true

//         }
//     }
//     ,
//     {timestamps:true})



// const reel = mongoose.model("reel",reelSchema);
