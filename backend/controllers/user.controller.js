const dotenv = require('dotenv');
const User = require('../models/user.model');

dotenv.config();
const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params;
    try {
        const userProfile = await fetch(`https://api.github.com/users/${username}`,{
            method: 'GET',
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        })
        const profile = await userProfile.json()
        const userRepos = await fetch(`${profile.repos_url}?page=1&per_page=100`,{
            method: 'GET',
            headers: {
                authorization : `token ${process.env.GITHUB_API_KEY}`
            }
        })

        const repoData = await userRepos.json()
        res.status(200).json({ profile, repoData });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const likeProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findById(req.user._id.toString());
        const userToLike = await User.findOne({ username });
        if (!userToLike) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.likedProfiles.includes(userToLike.username)) {
            return res.status(400).json({ error: 'Profile already liked' });
        }
        userToLike.likedBy.push({username: user.username,avatarUrl: user.avatarUrl,likedDate: Date.now()});
        user.likedProfiles.push(userToLike.username);
        await Promise.all([user.save(), userToLike.save()]);
        res.status(200).json({ message: 'Profile liked' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getLikes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id.toString());  
        res.status(200).json({likedBy: user.likedBy});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getUserProfileAndRepos, likeProfile, getLikes};