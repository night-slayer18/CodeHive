const dotenv = require('dotenv');
dotenv.config();

const exploreReposWithLanguage = async (req, res) => {
    const { language } = req.params;
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=50`,{
            headers: {
                authorisation: `token ${process.env.GITHUB_API_KEY}`
            }
        })
        const data = await response.json()
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { exploreReposWithLanguage };