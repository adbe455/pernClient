import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';
import '../styles.css';
import snespad from '../assets/no-image.png'

// const serverUrl = 'http://localhost:3000'
const serverUrl = 'https://pernproject.herokuapp.com'


const Reviews = (props) => {
    
    const [ results, setResults ] = useState([]); 
    const [ reviews , setReviews ] = useState([]);
    
    const [ showReviews, setShowReviews ] = useState(false)
    const [ writeReview, setWriteReview ] = useState(false)
    
    const [ score, setScore ] = useState(10);
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');

    const [ userReview, setUserReview ] = useState(false);

    const [ editModal, setEditModal ] = useState(false);

    const imgPrefix = 'https://images.igdb.com/igdb/image/upload/t_screenshot_med/';
    const id = window.location.href.split('reviews/')[1];
    
    const fetchResults = (a) => {
        console.log('review serverurl: ', serverUrl)
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://api-v3.igdb.com/games';
        
        fetch(proxy + url, {
            method: 'POST',
            headers: {
                // 'user-key':'cc5441053548ed186c2e6a3add7af2f1', my key
                'user-hey':'5a82182a64789d3546faae4b10160803',
                'Accept':'application/json'
            },
            body:`
                where id=${id};
                fields artworks.*, storyline, summary, name, release_dates.human, genres.name, platforms.*, videos.*;
            `
        })
            .then(res => res.json())
            .then(data => {
                console.log('fetched: ', data)
                setResults(data);                
            })
            .catch(err => console.log(err));
    }

    const fetchReviews = (update) => {
        //fetch reviews if there are currently 0 reviews fetched or if just deleted/posted/edited a review
        if(reviews == 0 || update){
            //grab reviews from all users
            fetch(serverUrl + '/review/all/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': props.token // this sets the Authorization header for the fetch as the token prop
                }                                // the prop was originally from localstorage and then set as a useState in Main.js then passed into here as a prop
            }) 
            .then( (res) => res.json())
            .then((reviewData) => {
                setReviews(reviewData);
                console.log('reviewData: ', reviewData);
                console.log('reviews.length ' + reviews.length)
            })

            //grab the user's review if it exists
            fetch(serverUrl + '/review/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                }
            }) 
            .then( (res) => res.json())
            .then((userReviewData) => {
                setUserReview(userReviewData);
                console.log('userReviewData: ', userReviewData);
            })

        }
    }

    const handleSubmit = (e, method) => {
        e.preventDefault();
        console.log('handleSubmit: ', id, score, title, body)

        fetch(serverUrl + '/review/', {
            method: method, 
            body: JSON.stringify({
                review: {
                    gameid: id,
                    score: score,
                    title: title,
                    body: body
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        }) 
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setScore(10);
            setTitle('');
            setBody('');
            setWriteReview(false);
            setEditModal(false);
            fetchReviews(true);
        })
      }

      const deleteReview = (e) => {
        e.preventDefault();
        fetch(serverUrl + '/review/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        }) 
        .then((deleteData) => {
            console.log('deleteData: ', deleteData);
            fetchReviews(true);
        })
    }

    useEffect(() => {
        fetchResults();
        // fetchReviews();
      }, [])
    
    return(
        <div>
            {results.length > 0 && results ? 
                 <div>
                    <Container className='gamebox red-t'>
                        <Row className='text-center'>
                            <Col>
                                <p className='game-name'>{results[0].name}</p>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col xs='6'>
                                <img className='screenshot' alt='screenshot' src={results[0].artworks ? imgPrefix + results[0].artworks[0].image_id + '.jpg' : snespad}/>
                            </Col>
                            <Col xs='6'>
                                <Row className='game-description'>Release date: <p style={{marginLeft:'1em'}}>{results[0].release_dates[0].human}</p></Row>
                                <Row className='game-description'>
                                    Platforms: {
                                        results[0].platforms.map(platform =>{
                                            return(
                                                <p key={platform.id} style={{marginLeft:'1em'}}>{platform.abbreviation ? platform.abbreviation : platform.name ? platform.name : null}</p>
                                            )
                                        })
                                    }
                                </Row>
                                <Row className='game-description'>
                                    Genres: {
                                        results[0].genres.map(genre =>{ // this maps out every genre object inside of the first result
                                            return(
                                                <p key={genre.id} style={{marginLeft:'1em'}}>{genre.name ? genre.name : null}</p>
                                            ) // every genre name that is found inside of a genre will be displayed on the page if it exists
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className='game-description'>{results[0].storyline ? results[0].storyline : results[0].summary}</p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'2em'}} className='text-center'>
                            <Col>
                                {results[0].videos ? <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + results[0].videos[0].video_id } frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : null}
                            </Col>
                        </Row>
                        {props.token ?  // this prop originally comes from localstorage; it is stored in a useState in Main.js and then passed in here
                                        // if the user is logged in, display the review section, otherwise tell them they need to be logged in
                            <Row style={{marginTop:'2em'}} className='text-center'>
                                <Col>
                                    <Button onClick={(e) => {fetchReviews(); setShowReviews(!showReviews)}}>
                                        {showReviews ? 'Reviews [-]' : 'Reviews'}
                                    </Button>
                                </Col>

                            </Row>

                            : <Row style={{marginTop:'5vh'}} className='text-center'>
                                <Col>
                                    <h6>You must be logged in to see reviews.</h6>
                                </Col>
                            </Row>
                        }
                    </Container>
                    {writeReview ?
                    <div>
                        <Container className='wreview-box gamebox red-t'>
                            <Form onSubmit={e => {handleSubmit(e, 'POST')}}>
                                <FormGroup>
                                    <Label for="score">Score</Label>
                                    <Input onChange={e => setScore(e.target.value)} className='wreview-score' type="select" name="score">
                                        <option className='wreview-option'>10</option>
                                        <option className='wreview-option'>9</option>
                                        <option className='wreview-option'>8</option>
                                        <option className='wreview-option'>7</option>
                                        <option className='wreview-option'>6</option>
                                        <option className='wreview-option'>5</option>
                                        <option className='wreview-option'>4</option>
                                        <option className='wreview-option'>3</option>
                                        <option className='wreview-option'>2</option>
                                        <option className='wreview-option'>1</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="headline">Headline</Label>
                                    <Input onChange={e => setTitle(e.target.value)} type="headline" name="headline" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="review">Review</Label>
                                    <Input onChange={e => setBody(e.target.value)} type="textarea" name="text" />
                                </FormGroup>
                                <Button type='submit'>Submit</Button>
                                <Button onClick={() => setWriteReview(!writeReview)} style={{marginLeft:'20px'}}>Cancel</Button>
                            </Form>
                        </Container>
                        </div>
                    : null}
                     {showReviews && reviews.length >= 0 && !writeReview ? 
                        <Container className='box red-t'>
                            {!userReview ? 
                            <Row className='text-center' style={{marginBottom:'5vh'}}>
                                <Col>
                                    <Button onClick={() => {setWriteReview(!writeReview)}}>
                                        Write a Review
                                    </Button>
                                </Col>
                            </Row>
                            :
                            <Row className='review-box ureview-box red'>
                                <Col className='text-center review-header'>
                                    <Row>
                                        <Col className='text-center'>
                                            <p className='review-subtext red2'> YOUR REVIEW</p>
                                        </Col>
                                        <Col className='text-right'>
                                            <Button onClick={() => setEditModal(!editModal)} style={{marginRight:'1em'}}>Edit</Button>
                                            <Button style={{marginRight:'1em'}} onClick={e => deleteReview(e)}>Delete</Button>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <p className='review-name'>{userReview.firstname + ' ' + userReview.lastname[0]}.</p>
                                    </Row>
                                    <Row>
                                        <p className='review-subtext review-score'>Score:</p><p> {userReview.score + '/10'}</p>
                                    </Row>
                                    <Row className='text-center'>
                                        <p className='review-subtext review-headline'>Headline:</p><p>{`"${userReview.title}"`}</p>
                                    </Row>
                                    <Row>
                                        <p className='review-subtext review-review'>Review:</p><p>{userReview.body}</p>
                                    </Row>
                                </Col>
                            </Row>
                            }
                        {showReviews && reviews.length > 0 ? 
                            <div>
                                <Col className='text-center'>
                                    <p>Average Review Score: {(reviews.reduce((a,b) => a + b.score, 0) / reviews.length).toFixed(1)}/10</p>
                                </Col>
                                <br/>
                            {reviews.map(review => {
                                return (
                                <Row key={review.id}>
                                    <Col className='review-box text-center red'>
                                        <Row>
                                            <p className='review-name'>{review.firstname + ' ' + review.lastname[0]}.</p>
                                        </Row>
                                        <Row>
                                            <p className='review-subtext review-score'>Score:</p><p> {review.score + '/10'}</p>
                                        </Row>
                                        <Row>
                                            <p className='review-subtext review-headline'>Headline:</p><p>{`"${review.title}"`}</p>
                                        </Row>
                                        <Row>
                                            <p className='review-subtext review-review'>Review:</p><p>{review.body}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            )})}
                            </div>
                        : showReviews && reviews.length === 0 && !writeReview ? 
                            <Row className='text-center'>
                                <Col>
                                    <p>There are no reviews yet! Be the first!</p>
                                </Col>
                            </Row>
                        : null}
                    </Container> : null }
                    
                 </div>
            : null }
            <br/>
            <br/>
            <div>
                <Modal isOpen={editModal}>
                    <ModalHeader className='red'>Edit Review</ModalHeader>
                    <ModalBody className='red2'>
                        <Form>
                            <FormGroup>
                                <Label for="score">Score</Label>
                                <Input onChange={e => setScore(e.target.value)} className='wreview-score' type="select" name="score">
                                    <option className='wreview-option'>10</option>
                                    <option className='wreview-option'>9</option>
                                    <option className='wreview-option'>8</option>
                                    <option className='wreview-option'>7</option>
                                    <option className='wreview-option'>6</option>
                                    <option className='wreview-option'>5</option>
                                    <option className='wreview-option'>4</option>
                                    <option className='wreview-option'>3</option>
                                    <option className='wreview-option'>2</option>
                                    <option className='wreview-option'>1</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="headline">Headline</Label>
                                <Input onChange={e => setTitle(e.target.value)} type="headline" name="headline" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="review">Review</Label>
                                <Input onChange={e => setBody(e.target.value)} type="textarea" name="text" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className='red'>
                        <Button id='modalbtn' onClick={e => handleSubmit(e, 'PUT')}>Submit</Button>
                        <Button id='modalbtn' onClick={() => setEditModal(!editModal)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default Reviews;