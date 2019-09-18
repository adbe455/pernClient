import React, { useState } from 'react';
import '../styles.css';
import Header from './Header'
import Splash from './Splash';
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Searchpage from './Searchpage';




const Main = () => {

    const [token, setToken] = useState(false)

    let storeSessionToken = (token) => {
      setToken(token)
    }

    return(
        <React.Fragment>
            <div className='main'>
                <Router>
                    <Header token={token} />
                    <Switch>
                        <Route exact path="/" component={ Splash } />
                        <Route exact path="/login" render={(props) => <Login {...props} tokenHandler={storeSessionToken}/>}/>
                        <Route exact path="/signup" render={(props) => <Signup {...props} tokenHandler={storeSessionToken}/>} />
                        <Route exact path="/search" component={ Searchpage } />
                    </Switch>
                </Router>
            </div>
        </React.Fragment>
    )
}

export default Main;