import React from 'react';
import {
    Jumbotron,
    Container
} from 'reactstrap';
import '../styles.css';
import Searchbar from './Searchbar'

const Splash = () => {
    return(
        <div className='darkred'>
            <Jumbotron id='jumbotron' fluid>
                <Container fluid>
                    <h1 className="display-3 d-flex justify-content-center">Game Critic</h1>
                    <p className="lead d-flex justify-content-center">Community reviews and info on your favorite games</p>
                </Container>
            </Jumbotron>
            <Searchbar/>
        </div>
    )
}

export default Splash;