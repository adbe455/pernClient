import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
  } from 'reactstrap';
import { Link } from 'react-router-dom'
import '../styles.css';
import snespad from '../assets/no-image.png'

const SearchResults = (props) => {
  return (
    <div className='container'>
          <div className='container text-center'>
            {props.offset == 0 ? null : <Button onClick={(e) => props.changeOffset(e, 'down')}>Previous</Button>}
            {props.results.length < props.limit ? null : <Button style={{margin: '1em'}} onClick={(e) => props.changeOffset(e, 'up')}>Next</Button>}
            <p>Displaying results {props.offset + 1} - {props.offset + props.results.length}</p>
          </div>
        <div className='row'>
            {props.results.map(result => {
                return (
                    <div className='col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 text-center mt-5 align-items-stretch' key={result.id}>
                      <Link to={'/reviews/' + result.id} className="search-result">
                        <Card>
                            <CardImg src={
                                result.cover ? result.cover.url : snespad
                                } alt="Card image cap" />
                            <CardBody className='red justify-content-center'>
                                <CardTitle>{result.name}</CardTitle>
                                {/* <CardSubtitle>Release date: {result.first_release_date}</CardSubtitle> */}
                                {/* <CardText>{result.storyline ? result.storyline : result.summary ? result.summary : null}</CardText> */}
                                {/* <Button style={{backgroundColor: '#E23E57'}}>Reviews</Button> */}
                            </CardBody>
                        </Card>
                      </Link>
                    </div>
          )})}
          <div className='container text-center' style={{marginTop:'1em'}}>
            {props.offset == 0 ? null : <Button onClick={(e) => props.changeOffset(e, 'down')}>Previous</Button>}
            {props.results.length < props.limit ? null : <Button style={{margin: '1em'}} onClick={(e) => props.changeOffset(e, 'up')}>Next</Button>}
            <p>Displaying results {props.offset + 1} - {props.offset + props.results.length}</p>
          </div>
        </div>
    </div>
  )
}

export default SearchResults;