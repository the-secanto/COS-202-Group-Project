import { prisma } from "../config/db.js";

export const followUser = async (req, res) => {
  const { followingId } = req.body;
  const followerId = req.user.id;

  if (parseInt(followingId) === followerId) {
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    const targetUser = await prisma.user.findUnique({
      where: { id: parseInt(followingId) }
    });

    if (!targetUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId: parseInt(followingId)
        }
      }
    });

    if (existingFollow) {
      return res.status(400).json({ message: "You are already following this user." });
    }

    await prisma.follow.create({
      data: {
        followerId,
        followingId: parseInt(followingId)
      }
    });

    return res.status(200).json({ message: "Followed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  const { followingId } = req.body;
  const followerId = req.user.id;

  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId: parseInt(followingId)
        }
      }
    });

    return res.status(200).json({ message: "Unfollowed successfully." });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({ message: "You are not following this user." });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getFollowers = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const followers = await prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: { id: true, name: true, avatar: true }
        }
      }
    });

    return res.status(200).json(followers.map(f => f.follower));
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getFollowing = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: { id: true, name: true, avatar: true }
        }
      }
    });

    return res.status(200).json(following.map(f => f.following));
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
