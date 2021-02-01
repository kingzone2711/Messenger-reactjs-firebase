import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Auth } from "../../context/authContext";
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { NavLink, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


const usestyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = usestyles();
  const { state, dispatch } = useContext(Auth);
  const logout = (uid) => {

    // dispatch({ type: "USER_LOGOUT_REQUEST" });
    //Now lets logout user

    const db = firebase.firestore();
    db.collection('users')
      .doc(uid)
      .update({
        firstName: state.firstName,
        lastName: state.lastName,
        uid:state.uid,
        createdAt: new Date(),
        isOnline: false
      })
      .then(() => {

        firebase.auth()
          .signOut()
          .then(() => {
            //successfully
            localStorage.clear();
            dispatch({ type: "USER_LOGOUT_SUCCESS" });
            console.log("USER_LOGOUT_SUCCESS")
          })
          .catch(error => {
            console.log(error);
            dispatch({ type: "USER_LOGOUT_FAIL", payload: { error } })
          })

      })
      .catch(error => {
        console.log(error);
      })


  }
  if(!state.authenticated){
         return <Redirect to={`/login`} />
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
            </Typography>
          <div style={{ margin: '20px 0', color: '#fff', fontWeight: 'bold' }}>
            {state.authenticated ? `hola ${state.firstName} ${state.lastName}` : ''}
          </div>
          <ul className="menu">
            {
              state.authenticated ?
                <li>
                  <Link to={'#'} onClick={() => {
                    logout(state.uid)
                  }}> <Button color="inherit">Logout</Button></Link>
                </li> : <NavLink to={'/login'}>Login</NavLink>
            }
          </ul>

        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header