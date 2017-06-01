import React from 'react'
import queryString from 'query-string'
import api from '../utils/api'
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview'

const Profile = (props) => {
    const info = props.info
    return (
        <PlayerPreview
            avatar={info.avatar_url}
            username={info.login}>
            {info.name && <li>{info.name}</li>}
            {info.location && <li>{info.location}</li>}
        </PlayerPreview>
    )
}

const Player = (props) => {
    return (
        <div className='column'>
            <h1 className='header'>{props.label}</h1>
            <h3>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )
}



class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    } 
    
    componentDidMount () {
        const players = queryString.parse(this.props.location.search)

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then((results) => {
            if (results === null) {
                this.setState(() => {
                    return {
                        error: 'Looks like there was an error.  Check that both users exist on GitHub',
                        loading: false
                    }
                })
            }
            this.setState(() => {
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }
            })
        })
    }
    
    render() {
        const error = this.state.error
        const winner = this.state.winner
        const loser = this.state.loser
        const loading = this.state.loading


        if (loading === true) {
            return <p>Results</p>
        }
        
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player 
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player 
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )

    }
}

export default Results
