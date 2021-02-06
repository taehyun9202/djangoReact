import React from 'react'
import {ButtonGroup, Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant='h3' component="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                        <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
