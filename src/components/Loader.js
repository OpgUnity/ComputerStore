import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Paper, Typography} from "@material-ui/core";

const Loader = () => {
    return (
        <Grid container
              direction="column"
              justify="space-around"
              alignItems="center"
              spacing={10}>

            <Grid item >
                <div className="lds-hourglass"/>
            </Grid>

        </Grid>

    );
};

export default Loader;