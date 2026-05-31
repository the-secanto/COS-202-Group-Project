import express from 'express';
import { followUser, unfollowUser, getFollowers, getFollowing } from '../controllers/followController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

router.use(authMiddleware);
router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);

export default router;
