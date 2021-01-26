import React,{useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from '../../Components/layout/layout';
import config from "../../firebase/config";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
import { Auth } from "../../context/authContext";

const usestyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Loginpage() {
  const classes = usestyles();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {state, dispatch} = React.useContext(Auth);
  //const {state, dispatch} = React.useContext(Auth);
  useEffect(() => {
    console.log(state)
  },[state])
  const userlogin = (e) => {
    e.preventDefault();

    if(email === ""){
      alert("Email is required");
      return;
    }
    if(password === ""){
      alert("Password is required");
      return;
    }
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: { user: "Password is required"}
  });
    
    config.login(email,password).then(data=>{
      config.setCollectionUsersIsonline(data).then(() => {
              console.log('User logged ');
              const name = data.user.displayName.split(" ");
              const firstName = name[0];
              const lastName = name[1];

              const loggedInUser = {
                  firstName,
                  lastName,
                  uid: data.user.uid,
                  email: data.user.email
              }

              localStorage.setItem('user', JSON.stringify(loggedInUser))
          })
    }).catch(error=>{
      console.log(error)
    })
   
  }
  return (
    <Layout>
     <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={userlogin} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
</Layout>
  )
}
export default Loginpage