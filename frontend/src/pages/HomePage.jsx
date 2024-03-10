import { useCallback, useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const HomePage = () => {
	const [userProfile, setUserProfile] = useState(null)
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [sortType, setSortType] = useState('fork')
	const fetchUserProfile = useCallback(async (username = "night-slayer18") => {
		setLoading(true)
		try {
			const response = await fetch(`https://api.github.com/users/${username}`)
			const profile = await response.json()
			setUserProfile(profile)

			const repoResponse = await fetch(profile.repos_url)
			const repoData = await repoResponse.json()
			setRepos(repoData)

			console.log('User Profile:', profile)
			console.log('User Repos:', repoData)

			return { profile, repoData }
		} catch (error) {
			toast.error('Error fetching user profile: ', error.message)
			setLoading(false)
		}
		finally {
			setLoading(false)
		}
	}, [])
	useEffect(() => {
		fetchUserProfile()
	}, [fetchUserProfile])

	const onSearch = async (e, username) => {
		e.preventDefault()
		setLoading(true)
		setRepos([])
		setUserProfile(null)
		const { profile, repoData } = await fetchUserProfile(username)
		setUserProfile(profile)
		setRepos(repoData)
		setLoading(false)
	}

	const onSort = (sortType) => {
		if (sortType === 'forks') {
			if(repos.every(repo => repo.forks_count === 0)){
				toast.error('No Repositories with forks to sort')
			}
			else{
				setRepos([...repos].sort((a, b) => b.forks_count - a.forks_count));
			}
		} else if (sortType === 'stars') {
			if (repos.every(repo => repo.stargazers_count === 0)) {
				toast.error('No Repositories with stars to sort');
			} else {
				setRepos([...repos].sort((a, b) => b.stargazers_count - a.stargazers_count));
			}
		} else if (sortType === 'recent') {
			setRepos([...repos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
		}
		setSortType(sortType);
	};

	return (
		<div className='m-4'>
			<Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
			</div>
		</div>
	);
};
export default HomePage
