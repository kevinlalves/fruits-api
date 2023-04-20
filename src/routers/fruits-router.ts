import { Router } from "express";
import { createFruit, getFruits, getSpecificFruit } from "../controllers/fruits-controller";
import { validateSchemaMiddleware } from "../middlewares/schemaValidatorMiddleware";
import { fruitSchema } from "../schemas/fruit-schema";

const fruitsRouter = Router();

fruitsRouter.get("/", getFruits);
fruitsRouter.get("/:id", getSpecificFruit);
fruitsRouter.post("/", validateSchemaMiddleware(fruitSchema), createFruit);

export default fruitsRouter;
