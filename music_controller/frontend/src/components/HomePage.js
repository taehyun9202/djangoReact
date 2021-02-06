import React, { useState, useEffect } from 'react'
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'
import Room from './Room'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function HomePage(props) {
    const [ roomCode, setRoomCode ] = useState(null)
    useEffect(() => {
        fetch('/api/user-in-room')
            .then(res => res.json())
            .then(data => {
                setRoomCode(data.code)
            })
    })

    const clearRoomCode = () => {
        setRoomCode(null)
    }
    return (
        <div className="center">
            <Router>
                <Switch>
                    <Route path="/join" component={RoomJoinPage} />
                    <Route path="/create">
                        <CreateRoomPage
                            update={false} 
                            roomCode={null}
                            guestCanPause={true}
                            votesToSkip={null}
                            updateCallback={() => {}}
                        />
                    </Route>
                    <Route path="/room/:roomCode" component={Room} />
                    {roomCode ?
                        <Redirect to={`/room/${roomCode}`} /> :
                        <Route exact path="/" leaveRoomCallback={clearRoomCode} component={Home} />  
                    }
                </Switch>
            </Router>
        </div>
    )
}

export default HomePage
