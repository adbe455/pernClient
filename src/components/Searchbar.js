import React, { useState } from 'react';
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

const Searchbar = () => {

    const [ search, setSearch ] = useState('');
    const [ offset, setOffset ] = useState(0);
    const [ results, setResults ] = useState([]); 
    const [ error, setError ] = useState('')

    const limit = 48;


    const fetchResults = (a) => {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://api-v3.igdb.com/games';

        fetch(proxy + url, {
            method: 'POST',
            headers: {
                'user-key':'cc5441053548ed186c2e6a3add7af2f1',
                'Accept':'application/json'
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