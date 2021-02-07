import React, { useState } from 'react'
import { Card, Grid, Typography, IconButton, LinearProgress } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PauseIcon from '@material-ui/icons/Pause'

function MusicPlayer(props) {

    const pauseSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' }
        }
        fetch('/spotify/pause', requestOptions)
            .then(response => console.log(response))
    }

    const playSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        }
        fetch('/spotify/pause', requestOptions)
            .then(response => console.log(response))
    }

    const skipSong = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }
        fetch('/spotify/skip', requestOptions)
            .then(response => console.log(response))
    }


    function display (seconds) {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const minutes = (seconds % 3600) / 60
      
        return [minutes, seconds % 60].map(format).join(':')
    }

    const songProgress = (props.time / props.duration) * 100
    return (
        <div style={{
            position:'absolute',
            maxWidth: '640px',
            marginTop: '50px',
            left: "50%",
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card>
                <Grid container alignItems="center">
                    <Grid item align="center" xd={4}>
                        <img src={props.image_url} height="100%" width="100%"/>
                    </Grid>
                    <Grid item align="center" xd={8} style={{
                        position: 'relative',
                        left: "50%",
                        transform: 'translateX(-50%)',
                    }}>
                        <Typography component="h5" variant="h5">
                            {props.title}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1">
                            {props.artist}
                        </Typography>
                        <div>
                            { props.is_playing ? 
                                <IconButton onClick={pauseSong}>
                                    <PauseIcon/>
                                </IconButton> : 
                                <IconButton onClick={playSong}>
                                    <PlayArrowIcon /> 
                                </IconButton>
                            }
                            <IconButton>
                                <SkipNextIcon onClick={skipSong} />
                            </IconButton>
                            <Typography color="textSecondary" variant="subtitle1">
                                <div align="center">Votes to Skip</div>
                                {props.votes} / {" "}{props.votes_required}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <LinearProgress variant="determinate" value={songProgress} />
                    <Typography color="textSecondary" variant="subtitle1">
                        {display(props.time / 1000)} / {display(props.duration / 1000)}
                    </Typography>
            </Card>
        </div>
    )
}

export default MusicPlayer
