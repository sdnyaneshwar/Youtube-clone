import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const viewSchema = new Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    viwer:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
}
)
viewSchema.plugin(mongooseAggregatePaginate)

export const View = mongoose.model("View",viewSchema)