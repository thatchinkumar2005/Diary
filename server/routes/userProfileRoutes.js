import { Router } from "express";
import editEmail, {
  editPswd,
  editUserInfo,
  getUserInfo,
} from "../controllers/userProfileController.js";

const router = Router();

router
  .route("/")

  .get(getUserInfo)

  .post(editUserInfo);

router.post("/editEmail", editEmail);
router.post("/changePswd", editPswd);

export default router;
