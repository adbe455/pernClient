import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    Row,
    Col,
  } from 'reactstrap';
import '../styles.css';
import snespad from '../assets/no-image.png'

// const serverUrl = 'http://localhost:3000'
const serverUrl = 'https://pernproject.herokuapp.com'


const Reviews = (props) => {

    const [ results, setResults ] = useState([]); 
    const [ reviews , setReviews ] = useState([]);
    const [ showReviews, setShowReviews ] = useState(false)

    const imgPrefix = 'https://images.igdb.com/igdb/image/upload/t_screenshot_med/';
    const id = window.location.href.split('reviews/')[1];

    const fetchResults = (a) => {

        const url = 'https://cors-anywhere.herokuapp.com/';
        const url2 = 'https://api-v3.igdb.com/games';


        fetch(url + url2, {
            method: 'POST',
            headers: {
                'user-key':'cc5441053548ed186c2e6a3add7af2f1',
                'Accept':'application/json'
            },
            body:`
                where id=${id};
                fields artworks.*, storyline, summary, name;
            `
        })
            .then(res => res.json())
            .then(data => {
                console.log('fetched: ', data)
                setResults(data);                
            })
            .catch(err => console.log(err));
    }

    const fetchReviews = () => {
        if(reviews == 0){
            fetch(serverUrl + '/review/all/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                }
            }) 
            .then( (res) => res.json())
            .then((reviewData) => {
                setReviews(reviewData);
                console.log(reviewData);
            })
        }
    }

    useEffect(() => {
        fetchResults();
        // fetchReviews();
      }, [])
    
    return(
        <div>
            {results.length > 0 ? 
                 <div>
                    <Container className='gamebox'>
                        <Row className='text-center'>
                            <Col>
                                <p className='game-name'>{results[0].name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <img className='screenshot col-6' alt='screenshot' src={results[0].artworks ? imgPrefix + results[0].artworks[0].image_id + '.jpg' : snespad}/>
                            <Col xs='6'>
                                <p className='game-description'>{results[0].storyline ? results[0].storyline : results[0].summary}</p>
                            </Col>
                        </Row>
                    </Container>
                    <Container className='gamebox'>
                        {props.token ? 
                            <Row style={{marginBottom:'5vh'}} className='text-center'>
                                <Col>
                                    <Button style={{backgroundColor: '#88304E'}} onClick={(e) => {e.preventDefault(); fetchReviews(); setShowReviews(!showReviews)}}>
                                        {showReviews ? 'Reviews [-]' : 'Reviews [+]'}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button style={{backgroundColor: '#88304E'}}>Write a Review</Button>
                                </Col>
                            </Row>

                            : <Row style={{marginBottom:'5vh'}} className='text-center'>
                                <Col>
                                    <h6>You must be logged in to see reviews.</h6>
                                </Col>
                            </Row>
                        }
                        {showReviews && reviews.length > 0 ? 
                            reviews.map(review => {
                                return (
                                <Container className='review-box'>
                                    <Col className='text-center review-header'>
                                        <Row>
                                            <p className='review-subtext'>Score:</p><h5> {review.score + '/10'}</h5>
                                        </Row>
                                        <Row className='text-center'>
                                            <p className='review-subtext'>Headline:</p><h5>{`"${review.title}"`}</h5>
                                        </Row>
                                        <Row>
                                            <p className='review-subtext'>Review:</p><p>{review.body}</p>
                                        </Row>
                                    </Col>
                                </Container>
                            )})
                        : showReviews ? 
                            <Row className='text-center'>
                                <Col>
                                    <p>There are no reviews yet! Be the first!</p>
                                </Col>
                            </Row>
                        : null}
                    </Container>
                 </div>
            : null }
        </div>
    )
}

export default Reviews;