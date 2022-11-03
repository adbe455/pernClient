import React, { useState, useEffect } from 'react';
import {
    Container,
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
    Row,
    Col
} from 'reactstrap';
import SearchResults from './SearchResults';
import '../styles.css';

const Searchbar = (props) => {

    const [ search, setSearch ] = useState('');
    const [ offset, setOffset ] = useState(0);
    const [ results, setResults ] = useState([]); 
    const [ error, setError ] = useState('')

    const limit = 48;

    // const fetchIgdbToken = () => {
    //     const url = 'https://id.twitch.tv/oauth2/token?client_id=dwdaqgesynudsgg0n63ypgb0or2bjl&client_secret=wxa2j8q42apb0lw3w8ir5z79upls8e&grant_type=client_credentials';
    //     fetch(url, {
    //         method: 'POST',
    //         headers: { 'Accept':'*/*' },
    //         body: ''
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         localStorage.setItem('igdb', data);
    //         console.log(localStorage.getItem('idgb'));
    //     })
    //     .catch(err => console.log(err));
    // }

    // useEffect(() => {
    //     console.log('Checking for IGDB token');
    //     if(!localStorage.getItem('igdb').access_token) {
    //         fetchIgdbToken();
    //         console.log('Attempting to retrieve IGDB token');
    //     }
    // }, []);

    const fetchResults = (a) => {
        const proxy = 'https://corsanywhereapp.herokuapp.com/';
        const url = 'https://api.igdb.com/v4/games/';
        console.log('Bearer ' + props.igdbToken);

        fetch(proxy + url, {
            method: 'POST',
            headers: {
                'Client-ID': 'dwdaqgesynudsgg0n63ypgb0or2bjl',
                'Authorization': 'Bearer ' + props.igdbToken,
            },
            body:`
                search "${search}";
                offset ${a};
                limit ${limit};
                fields name, first_release_date, cover.*, storyline, summary;
                where themes != 42;
            `
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setResults(data)
                if(data.length === 0){
                    setError('no results')
                }
            })
            .catch(err => console.log(err));
    }

    const handleSubmit = (event) => {
        if(search.length > 3){
            event.preventDefault();
            setOffset(0);
            fetchResults(0);
            setError('')
        } else {
            setError('minimum character length');
        }
    };

    const changeOffset = (e, num) => {
        e.preventDefault();
        if(num === 'up' && results.length === limit) {
            fetchResults(offset + limit);
            setOffset(offset + limit)
        }
        if(num === 'down' && offset >= limit) {
            fetchResults(offset - limit);
            setOffset(offset - limit);
        } 
    }

    return(
        <Container>
            <Row className='search-bar mx-auto'>
                <Col>
                    <InputGroup>
                        <Input onKeyPress={e => {if(e.key === 'Enter') { handleSubmit(e) }}} onChange={(e) => setSearch(e.target.value)} />
                        <InputGroupAddon addonType="append"><Button onClick={(e) => handleSubmit(e)}>Find game</Button></InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    {
                        error === 'minimum character length' ? <p className='text-center'>Please enter at least 3 characters.</p>
                        : error === 'no results' ? <p className='text-center'>No results found.</p>
                        : null
                    }
                    {
                        results.length > 0 ? <SearchResults offset={ offset } results={ results } changeOffset={ changeOffset } limit={limit}/>
                        : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Searchbar;