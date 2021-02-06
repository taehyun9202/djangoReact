import React, { useState } from 'react'
import {TextField, Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

function RoomJoinPage(props) {
    const [ roomCode, setRoomCode ] = useState('')
    const [ error, setError ] = useState(null)

    const handleTextFieldChange = e => {
        setRoomCode(e.target.value)
    }

    const roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: roomCode
            })
        }
        fetch('/api/join-room', requestOptions)
            .then(res => {
                if (res.ok) {
                    props.history.push(`/room/${roomCode}`)
                } else {
                    setError("Room not found")
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="center">
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant='h4' component="h4">Join a Room</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField 
                        error={error} 
                        label="Code"
                        placeholdeer="Enter a Room Code"
                        value={roomCode}
                        helperText={error}
                        variant="outlined"
                        onChange={handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={roomButtonPressed}  component={Link}>
                        Enter
                    </Button>
                    <Button variant="contained" color="secondary" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default RoomJoinPage
