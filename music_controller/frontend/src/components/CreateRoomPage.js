import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Link, useHistory } from 'react-router-dom'
import { Collapse } from "@material-ui/core"

function CreateRoomPage(props) {
    const [ guestCanPause, setGuestCanPause ] = useState(props.guestCanPause)
    const [ votesToSkip, setVotesToSkip ] = useState(props.votesToSkip)
    const [ roomCode, setRoomCode ] = useState(props.roomCode)
    const [ message, setMessage ] = useState('')
    const [ error, setError ] = useState('')
    var history = useHistory();

    const handleVotesChange = e => {
        setVotesToSkip(e.target.value)
    }

    const handleGuestCanPasueChange = e => {
        setGuestCanPause(!guestCanPause)
    }

    const handleCreateButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                guest_can_pause: guestCanPause,
                votes_to_skip: votesToSkip
            })
        }
        fetch('/api/create-room', requestOptions)
            .then(res => res.json())
            .then(data => history.push('/room/' + data.code))
    } 
    

    const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: roomCode,
                guest_can_pause: guestCanPause,
                votes_to_skip: votesToSkip,
            })
        }
        console.log(requestOptions)
        fetch('/api/update-room', requestOptions)
            .then((response) => {
                if (response.ok) {
                    setMessage("Room updated successfully!")
                } else {
                    setError("Error updating room...")
                }
                this.props.updateCallback();
            });
    }

    return (
        <div className={props.update === false ? null : props.className } style={{margin:"0 200px"}} >
            <Grid container spaceing={1}>
                <Grid item xs={12} align="center">
                    <Collapse in={error != "" || message != ""}>
                        {message}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        { props.update === false ? "Create a Room" : props.roomCode  }
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={guestCanPause.toString()} onChange={handleGuestCanPasueChange}>
                            <FormControlLabel 
                                value="true" 
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel 
                                value="false" 
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                            required={true}
                            type="number"
                            onChange={handleVotesChange}
                            defaultValue={votesToSkip}
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                        />
                        <FormHelperText>
                            <div align="center">Votes Required to Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                { props.update === false ? 
                    <Button 
                    color="primary" 
                    variant="contained"
                    onClick={handleCreateButtonPressed}
                    >Create a Room</Button>
                    : 
                    <Button 
                    color="primary" 
                    variant="contained"
                    onClick={handleUpdateButtonPressed}
                    >Update Room</Button> 
                }
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link} >Back</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateRoomPage
