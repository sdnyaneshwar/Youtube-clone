import {Router} from 'express'
import {
    toggleVideoLike,
    toggleTweetLike,
    toggleCommentLike,
    getLikedVideos
} from '../controllers/like.controller.js'

import {verifyJWT} from '../middlewares/user.middleware.js'

const router =Router()
router.use(verifyJWT);
router.route('/c/:videoId').get(toggleVideoLike)




export default router;