import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
import '../styles.css';
import snespad from '../assets/no-image.png'

const serverUrl = 'http://localhost:3000'
// const serverUrl = 'https://pernproject.herokuapp.com'


const Reviews = (props) => {
    
    const [ results, setResults ] = useState([]); 
    const [ reviews , setReviews ] = useState([]);
    
    const [ showReviews, setShowReviews ] = useState(false)
    const [ writeReview, setWriteReview ] = useState(false)
    
    const [ score, setScore ] = useState(10);
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');

    const [ userReview, setUserReview ] = useState(false)

    const imgPrefix = 'https://images.igdb.com/igdb/image/upload/t_screenshot_med/';
    const id = window.location.href.split('reviews/')[1];
    
    const fetchResults = (a) => {
        console.log('review serverurl: ', serverUrl)
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

    const fetchReviews = (update) => {
        //fetch reviews if there are currently 0 reviews fetched or if just deleted/posted/edited a review
        if(reviews == 0 || update){
            //grab reviews from all users
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
                console.log('reviewData: ', reviewData);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(id, score, title, body)

        fetch(serverUrl + '/review/', {
            method: 'POST', 
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
            setScore();
            setTitle('');
            setBody('');
            setWriteReview(false);
            // setShowReviews(true);
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
                        {props.token ? 
                            <Row style={{marginTop:'5vh'}} className='text-center'>
                                <Col>
                                    <Button style={{backgroundColor: '#88304E'}} onClick={(e) => {fetchReviews(); setShowReviews(!showReviews)}}>
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
                        <Container className='wreview-box gamebox'>
                            <Form onSubmit={handleSubmit}>
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
                                <Button type='submit' style={{backgroundColor: '#88304E'}}>Submit</Button>
                            </Form>
                        </Container>
                        </div>
                    : null}
                     {showReviews && reviews.length ? 
                        <Container className='box'>
                            {!userReview ? 
                            <Row className='text-center' style={{marginBottom:'5vh'}}>
                                <Col>
                                    <Button style={{backgroundColor: '#88304E'}} onClick={(e) => {setWriteReview(!writeReview)}}>
                                        Write a Review
                                    </Button>
                                </Col>
                            </Row>
                            :
                            <Row className='review-box ureview-box'>
                                <Col className='text-center review-header'>
                                    <Row>
                                        <Col className='text-left'>
                                            <p className='review-subtext'> YOUR REVIEW</p>
                                        </Col>
                                        <Col className='text-right'>
                                            <Button style={{backgroundColor: '#88304E', marginRight:'20px'}}>Edit</Button>
                                            <Button style={{backgroundColor: '#88304E', marginRight:'20px'}} onClick={e => deleteReview(e)}>Delete</Button>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <p className='review-name'>{userReview.firstname + ' ' + userReview.lastname}</p>
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
                                    <p>Average score: {(reviews.reduce((a,b) => a + b.score, 0) / reviews.length).toFixed(2)}/10</p>
                                </Col>
                                <br/>
                            {reviews.map(review => {
                                return (
                                <Row className='review-box' key={review.id}>
                                    <Col className='text-center review-header'>
                                        <Row>
                                            <p className='review-name'>{review.firstname + ' ' + review.lastname}</p>
                                        </Row>
                                        <Row>
                                            <p className='review-subtext review-score'>Score:</p><p> {review.score + '/10'}</p>
                                        </Row>
                                        <Row className='text-center'>
                                            <p className='review-subtext review-headline'>Headline:</p><p>{`"${review.title}"`}</p>
                                        </Row>
                                        <Row>
                                            <p className='review-subtext review-review'>Review:</p><p>{review.body}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            )})}
                            </div>
                        : showReviews && reviews.length === 0 ? 
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
        </div>
    )
}

export default Reviews;