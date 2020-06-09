import express from "express";
import swaggerUi from "swagger-ui-express";

import {specs} from "../../config/swagger";

const router = express.Router();

/**
 * GET v1/health
 */


router.get("/health", (req, res) => res.status(200).send("OK"));
/**
 * GET v1/docs
 */
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));





export default router;
