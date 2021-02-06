import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import CreateRoomPage from './CreateRoomPage'

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

function Room(props) {
    const [ roomCode, setRoomCode ] = useState(props.match.params.roomCode)
    const [ guestCanPause, setGuestCanPause ] = useState(false)
    const [ votesToSkip, setVotesToSkip ] = useState(null)
    const [ isHost, setIsHost ] = useState(false)
    const classes = useStyles();
    const [ open, setOpen ] = useState(false)
    const [ spotifyAuthenticated, setSpotifyAuthenticated ] = useState(false)

    

    const getRoomDetails = () => {
        fetch('/api/get-room' + "?code=" + roomCode)
            .then(res => {
                if(!res.ok) {
                    props.leaveRoomCallback
                    props.history.push('/')
                }
                return  res.json()
                })
            .then(data => {
                setVotesToSkip(data.votes_to_skip),
                setGuestCanPause(data.guest_can_pause),
                setIsHost(data.is_host)
                if(isHost) {
                    authenticateSpotify();
                }
            })
    }

    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                setSpotifyAuthenticated(data.status)
                console.log(data.status, spotifyAuthenticated)
                if(!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then(response => response.json())
                        .then(data => window.location.replace(data.url))
                }
            })
    }
    
    useEffect(() => {
        getRoomDetails()
    })
    
    const handleOpen = () => {
        setOpen(!open)
    }

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        fetch('/api/leave-room', requestOptions)
            .then(res => {
                props.leaveRoomCallback
                props.history.push('/')
            })
    }

    

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">  
                    <Typography variant="h4" component="h4">
                        Code: {roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                <Typography variant="h4" component="h4">
                        Votes: {votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                <Typography variant="h4" component="h4">
                        Guest Can Pasue: {guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                <Typography variant="h4" component="h4">
                        Host: {isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    {isHost ? 
                        <Button variant="contained" color="primary" onClick={handleOpen}  component={Link}>
                            Setting
                        </Button>
                        : null
                    }
                    <Button variant="contained" color="secondary" onClick={leaveButtonPressed}  component={Link}>
                        Leave Room
                    </Button>
                </Grid>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open} >
                        <CreateRoomPage 
                            className={classes.paper} 
                            update={true}  
                            roomCode={roomCode}
                            guestCanPause={guestCanPause}
                            votesToSkip={votesToSkip}
                            updateCallback={getRoomDetails}
                        />
                    </Fade>
                </Modal>
            </Grid>
        </div>
    )
}

export default Room
