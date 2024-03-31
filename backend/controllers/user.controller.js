const dotenv = require('dotenv');
dotenv.config();
const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params;
    try {
        const userProfile = await fetch(`https://api.github.com/users/${username}`,{
            headers: {
                authorisation: `token ${process.env.GITHUB_API_KEY}`
            }
        })
        const profile = await userProfile.json()
        const userRepos = await fetch(profile.repos_url,{
            headers: {
                authorisation : `token ${process.env.GITHUB_API_KEY}`
            }
        })

        const repoData = await userRepos.json()
        res.status(200).json({ profile, repoData });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { getUserProfileAndRepos };