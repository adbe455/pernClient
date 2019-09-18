import React, { useState } from 'react';
import {
    InputGroup,
    Input,
    InputGroupAddon,
    Button
} from 'reactstrap';

const Searchbar = () => {

    const [search, setSearch] = useState('');
    const [offset, setOffset] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);


    let handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://api-v3.igdb.com/games', {
            method: 'POST',
            headers: {
                'user-key':'cc5441053548ed186c2e6a3add7af2f1',
                'Accept':'application/json'
            },
            body: JSON.stringify(`
                search ${search};
                offset ${offset};
                fields name, first_release_date, genres, cover.*;
                where themes != 42;
                limit 50;
            `)
        })
        .then(res => res.json())
        // .then(data => setResults(data))
        .catch(err => console.log(err));
    }


    return(
        <InputGroup className='search-bar justify-content-center'>
            <Input className='col-4' onChange={(e) => setSearch(e.target.value)} />
            <InputGroupAddon addonType="append"><Button onClick={(e) => handleSubmit(e)}>Find game</Button></InputGroupAddon>
        </InputGroup>
    )
}

export default Searchbar;