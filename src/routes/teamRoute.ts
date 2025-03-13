import express from 'express';
const router = express.Router();
import teamController from '../controllers/teamController.ts';

router.get('/team', teamController.getTeam);

export default router;