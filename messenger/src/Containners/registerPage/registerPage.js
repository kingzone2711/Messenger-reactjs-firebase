import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from '../../Components/layout/layout';
import { useDispatch }from 'react-redux'
import { signup } from '../../actions/auth';
import config from "../../firebase/config";

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
    const [fisrtname,setFisrtname]=useState('')
    const [lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()
      
    const register= (e) =>{
      e.preventDefault();
      // const user={fisrtname,lastname,email,password}
      // dispatch(signup(user))
      config.signup()
    }
    return (
      <Layout>
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
              label="fisrtname"
              name="first name"
              autoComplete="firstname"
              autoFocus
              value={fisrtname}
              onChange={(e)=>setFisrtname(e.target.value)}
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
              value={lastname}
              onChange={(e)=>setLastname(e.target.value)}
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
      </Layout>
  )
}
export default RegisterPage