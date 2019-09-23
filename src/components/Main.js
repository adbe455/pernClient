import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles.css';
import Header from './Header';
import Splash from './Splash';
import Login from './Login';
import Signup from './Signup';
import Reviews from './Reviews';



const Main = () => {

    const [token, setToken] = useState(false)
    const [reviewId, setReviewId] = useState(1941)
    
    let storeReviewId = (id) => {
        setReviewId(id)
        console.log('current reviewId: ' + reviewId)
    }

    let storeSessionToken = (token) => {
      setToken(token)
      console.log('storesessiontoken: ' + token)
    }

    useEffect(() => {
        if (localStorage.getItem('SessionToken')){
          setToken(localStorage.getItem('SessionToken'));
        }
    }, [])
    
    const updateToken = (newToken) => {
        localStorage.setItem('SessionToken', newToken);
        setToken(newToken);
        console.log(token);
    }
    
    const clearToken = () => {
        localStorage.clear();
        setToken('');
    }


    return(
        <React.Fragment>
            <div className='main'>
                <Router>
                    {console.log('token: ' + token)}
                    <Header token={token} tokenHandler={storeSessionToken} clearToken={clearToken} />
                    <Switch>
                        <Route exact path="/" component={ Splash } />
                        <Route exact path="/login" render={(props) => <Login {...props} tokenHandler={storeSessionToken}/>}/>
                        <Route exact path="/signup" render={(props) => <Signup {...props} tokenHandler={storeSessionToken}/>} />
                        <Route exact path="/reviews/:id" render={(props) => <Reviews {...props} token={token}/>} />
                    </Switch>
                </Router>
            </div>
        </React.Fragment>
    )
}

export default Main;