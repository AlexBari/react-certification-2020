import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { useAuth } from '../hooks/auth.hook'
import '../App.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: '-webkit-center',
    color: theme.palette.text.secondary,
    height: '200px'
  },
}));

const ProfilePage = () => {
  const auth = useAuth();;
  const classes = useStyles();
  const { photoURL, displayName, email } = auth.user || { photoURL: '', displayName: '', email: '' };
  return (
    <div className={classes.root} >
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div
              style={{
                background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
              }}
              className="profileImage border border-blue-300"
            ></div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <h2 className="text-2xl font-semibold">{displayName}</h2>
            <h3 className="italic">{email}</h3>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
};
export default ProfilePage;
