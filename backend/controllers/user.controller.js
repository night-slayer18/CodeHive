const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params;
    try {
        const userProfile = await fetch(`https://api.github.com/users/${username}`,{
            headers:{
                'Authorization': `token ${process.env.GITHUB_API_KEY}`
            }
		})
        const profile = await userProfile.json()

        const repoResponse = await fetch(userProfile.repos_url,{
            headers:{ 
                'Authorization': `token ${process.env.GITHUB_API_KEY}`
            }
        })
        const repoData = await repoResponse.json()

        res.json({ profile, repoData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

}

module.exports = { getUserProfileAndRepos };