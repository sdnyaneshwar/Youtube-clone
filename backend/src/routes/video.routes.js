import { Router } from "express";
import {getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getVideoSearch,
    getUserAllVideos
} from "../controllers/video.controller.js"
import { verifyJWT } from "../middlewares/user.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import { createView } from "../controllers/view.controller.js";


const router =Router()
router.use(verifyJWT)
router.route('/').post(
            upload.fields([
                {
                    name:"videoFile",
                    maxCount:1
                },
                {
                    name:"thumbnail",
                    maxCount:1
                }
            ]),
            publishAVideo
        )

router.route('/:videoId')
            .get(getVideoById)
            .delete(deleteVideo)
            .patch(upload.fields([
                {
                    name:"videoFile",
                    maxCount:1
                },
                {
                    name:"thumbnail",
                    maxCount:1
                }
            ]),updateVideo)


router.route('/toggle/publish/:videoId').patch(togglePublishStatus)
router.route('/video/search/:searchText').post(getVideoSearch);
router.route('/user/:Id').get(getUserAllVideos)
router.route('/gelAllVideos').post(getAllVideos)
router.route('/views/:videoId')
            .get(createView)

export default router