

// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";


// const router = Router()

// router.route("/register").post(
//     upload.fields({
//         name:"avatar",
//         maxCount:1

//     },
//     {
//         name:"coverImage",
//         maxCount:1
//     })
//     ,
//     registerUser
//     )


// export default router

import { Router } from "express";
import { registerUser,loginUser, logOutUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields(
       [ {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }]
    ),
    registerUser
    )

router.route("/login").post(loginUser)

// secured routes

router.route("/logout").post(verifyJWT , logOutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT , upload.single("avatar"),updateUserAvatar)

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"),updateUserCoverImage)

router.route("/c/:identifier").get(verifyJWT,getUserChannelProfile)
// http://localhost:8000/api/v1/users/c/dany
router.route("/history").get(verifyJWT , getWatchHistory)


export default router;