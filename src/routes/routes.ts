import { Router } from "express";
import { vehicleRoutes } from ".";

/**
 * `/auth`
 *
 * `/individual`
 *
 * `/interests`
 *
 * `/admin`
 */

const router = Router();

router.use("/vehicle", vehicleRoutes);

export default router;
