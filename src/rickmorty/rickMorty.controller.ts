import { Request, Router, Response } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isValidRickMorty } from "../middlewares/isValid";
import rickMortyService from "./rickMorty.service";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router();


router.post('/character', isAuthenticated, isValidRickMorty, rickMortyService.getCharacters);
router.post('/location', isAuthenticated, isValidRickMorty, rickMortyService.getLocations);
router.post('/episode', isAuthenticated, isAdmin, isValidRickMorty, rickMortyService.getEpisodes);

export default router;