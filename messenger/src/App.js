import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import HomePage from './Containners/homePage/homePage'
import LoginPage from './Containners/loginPage/loginPage'
import RegisterPage from './Containners/registerPage/registerPage'

function App() {
  return (
     <div >
       <Router>
        <Route path='/' exact component={HomePage}></Route>
         <Route path='/login' component={LoginPage}></Route>
         <Route path='/signup' component={RegisterPage}></Route>
       </Router>
     </div>
     )
   
}

export default App;
