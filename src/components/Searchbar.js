import React, { useState } from 'react';
import {
    InputGroup,
    Input,
    InputGroupAddon,
    Button
} from 'reactstrap';
import SearchResults from './SearchResults';
import styles from '../styles.css'

const Searchbar = () => {

    const [ search, setSearch ] = useState('');
    const [ offset, setOffset ] = useState(0);
    const [ results, setResults ] = useState([]); 
    const [ error, setError ] = useState('')

    const limit = 48;


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
                if(data.length == 0){
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
        <div>
            <InputGroup className='search-bar justify-content-center'>
                <Input onKeyPress={e => {if(e.key === 'Enter') { handleSubmit(e) }}} className='col-4' onChange={(e) => setSearch(e.target.value)} />
                <InputGroupAddon addonType="append"><Button 
                    style={{backgroundColor: '#88304E'}} 
                    onClick={(e) => handleSubmit(e)}

                >Find game</Button></InputGroupAddon>
            </InputGroup>
            <br/>
            {
                error === 'minimum character length' ? <p className='text-center'>Please enter at least 3 characters.</p>
                : error === 'no results' ? <p className='text-center'>No results found.</p>
                : null
            }
            {
                results.length > 0 ? <SearchResults offset={ offset } results={ results } changeOffset={ changeOffset } limit={limit}/>
                : null
            }
        </div>
    )
}

export default Searchbar;