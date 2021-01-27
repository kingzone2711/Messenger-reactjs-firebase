import React from 'react'
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import HomePage from './Containners/homePage/homePage'
import LoginPage from './Containners/loginPage/loginPage'
import RegisterPage from './Containners/registerPage/registerPage'
import PrivateRouter from './Components/privateRouter'
// import { Auth } from "./context/authContext";


function App() {
  // const { state, dispatch } = React.useContext(Auth);
 
  // useEffect(() => {
  //   if(!state.authenticated){
  //     const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  //       if(user){
  //         dispatch({
  //             type: "USER_LOGIN_SUCCESS",
  //             payload: { user }
  //         });
  //     }else{
  //         dispatch({
  //             type:"USER_LOGIN_FAIL",
  //             payload: { error: 'Login again please' }
  //         });
  //     }
  //   }
    
  // }, [])

  return (
     <div >
       <Router>
         <Switch>
          <PrivateRouter path='/' exact component={HomePage}></PrivateRouter>
         <Route exact path='/login' component={LoginPage}></Route>
         <Route exact path='/signup' component={RegisterPage}></Route>
         </Switch>
       </Router>
     </div>
     )
   
}

export default App;
