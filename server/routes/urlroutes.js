import express from "express";
import {getStats, shortTheUrl} from "../controllers/urlShortner.js";

const router = express.Router();

router.get('/:code', getStats);
router.post('/',shortTheUrl);

export default router;