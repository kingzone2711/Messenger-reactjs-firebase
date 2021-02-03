import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Layout from '../../Components/layout/layout';
import config from "../../firebase/config";
import { Auth } from "../../context/authContext";
import { Redirect } from 'react-router-dom';


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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function RegisterPage() {
  const classes = usestyles();
  const [firstName, setFisrtname] = useState('')
  const [lastName, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { state, dispatch } = React.useContext(Auth);
 
 
 
  const register = (e) => {
    e.preventDefault();
   
    const user = {
      firstName, lastName, email, password
    }
    dispatch({type: "USER_LOGIN_REQUEST"});
    config.signup(user).then(data => {
      const currentUser = config.currentuser().currentUser;
      const name = `${user.firstName} ${user.lastName}`;
        currentUser.updateProfile({
          displayName: name
        }).then(()=>{      
             config.setCollectionUsers(data,user).then(() => {
              //succeful
              const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email
              }
              localStorage.setItem('user', JSON.stringify(loggedInUser));
              console.log('User logged in successfully...!');
              dispatch({
                  type: "USER_LOGIN_SUCCESS",
                  payload: { user: loggedInUser }
              })
          }).catch(error => {
            console.log(error);
            dispatch({ 
                type: "USER_LOGIN_FAIL",
                payload: { error }
                  });
            });
        })
    }).catch(error => {
      console.log(error)
      })
  }
  if(state.authenticated){
    return <Redirect to={`/`} />
  }

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Typography component="h1" variant="h5">
            Register Account
          </Typography>
          <form className={classes.form} noValidate onSubmit={register}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="firstName"
              name="first name"
              autoComplete="firstname"
              autoFocus
              value={firstName}
              onChange={(e) => setFisrtname(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="last name"
              name="last name"
              autoComplete="email"
              autoFocus
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
            />
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              RegisterPage
            </Button>
          </form>
        </div>
      </Container>
    
  )
}
export default RegisterPage