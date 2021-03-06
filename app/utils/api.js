import axios from 'axios'

//const id = "CLIENT_ID"
//const sec = "SECRET_ID"
//const params = "?client_id=" + id + "&client_secret=" + sec;

const getProfile = (username) => {
    // axios will return a promise
    return axios.get('https://api.github.com/users/' + username)
        .then((user) => {
            return user.data
        })
}

const getRepos = (username) => {
    return axios.get('https://api.github.com/users/' + username + '/repos?per_page=10')
}

const getStarCount = (repos) => {
    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count
    }, 0)
}

const calculateScore = (profile, repos) => {
    const followers = profile.followers
    const totalStars = getStarCount(repos)

    return (followers * 3) + totalStars
}

const handleError = (error) => {
    console.warn(error);
    return null
} 

const getUserData = (player) => {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
        const profile = data[0]
        const repos = data[1]

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}

const sortPlayers = (players) => {
    return players.sort((a, b) => {
        return b.score - a.score
    })
}

export default {
    battle: (players) => {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
    fetchPopularRepos: (language) => {
        const encodedURI = window.encodeURI(
            'https://api.github.com/search/repositories?q=stars:>1+language:' +
            language + 
            '&sort=stars&order=desc&type=Repositories'
        )

        return axios.get(encodedURI)
            .then((response) => {
                return response.data.items
            }) 
    }
}
