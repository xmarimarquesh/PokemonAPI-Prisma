import express from 'express';
import pokemonController from '../controllers/pokemonController.ts';

const router = express.Router();

router.post('/capture', pokemonController.capture);

export default router;
