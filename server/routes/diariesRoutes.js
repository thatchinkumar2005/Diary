import { Router } from "express";
import {
  addUserDiary,
  deleteUserDiary,
  getUserDiaries,
  getUserDiary,
  updateUserDiary,
} from "../controllers/diariesController.js";

const router = Router();

router
  .route("/diaries")

  .get(getUserDiaries)

  .post(addUserDiary)

  .put(updateUserDiary)

  .delete(deleteUserDiary);

router.get("/diaries/:id", getUserDiary);
export default router;
