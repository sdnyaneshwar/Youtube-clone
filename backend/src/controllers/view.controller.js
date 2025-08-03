import mongoose from "mongoose";
import { View } from "../models/view.model.js";
import { Video } from "../models/video.model.js";

export const createView = async (req, res) => {
  try {
    const { videoId } = req.params;
    const viewerId = req.user?._id;

    if (!videoId || !viewerId) {
      return res.status(400).json({ message: "videoId and viewerId are required" });
    }

    // Create a new view for every watch, regardless of viewer
    const view = new View({
      video: videoId,
      viwer: viewerId,
    });
    await view.save();

    // Count total views for this video
    const totalViews = await View.countDocuments({ video: videoId });

    // Update video document with new view count
    await Video.findByIdAndUpdate(videoId, { views: totalViews });

    return res.status(201).json({ message: "View recorded", totalViews });
  } catch (error) {
    return res.status(500).json({ message: "Error creating view", error: error.message });
  }
};
