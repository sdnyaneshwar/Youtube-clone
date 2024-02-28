import  {Router} from 'express'
import {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers
} from '../controllers/subscription.controller.js'

import {verifyJWT} from '../middlewares/user.middleware.js'

const router =Router()
router.use(verifyJWT)

router.route('/c/:channelId').get(getSubscribedChannels).post(toggleSubscription);


router.route("/u/:subscriberId").get(getUserChannelSubscribers);

