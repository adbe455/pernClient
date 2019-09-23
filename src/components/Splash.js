import React from 'react';
import {
    Jumbotron,
    Container
} from 'reactstrap';
import '../styles.css';
import Searchbar from './Searchbar'

const Splash = () => {
    return(
        <div>
            <Jumbotron id='jumbotron' fluid>
                <Container fluid>
                    <h1 style={{fontWeight: 400}} className="display-3 d-flex justify-content-center">Critical Hits</h1>
                    <p className="lead d-flex justify-content-center">Community reviews and info on your favorite games</p>
                </Container>
            </Jumbotron>
            <Searchbar/>
        </div>
    )
}

export default Splash;