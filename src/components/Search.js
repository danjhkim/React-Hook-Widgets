import React, { useEffect, useState } from 'react'
import axios from "axios";
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const Search = () => {
    const [searchWord, setSearchWord] = useState('programming');
    const [results, setResults] = useState([]);
    const [debouncedWord, setDebouncedWord] = useState(searchWord);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedWord(searchWord)
        }, 1000)

        return () => {
            clearTimeout(timerId);
        };
    }, [searchWord]);

    useEffect(() => {
        if (debouncedWord) {
            Fetching().catch(err => {
                console.log(err);
            })
        }
    }, [debouncedWord]);


    const Fetching = async () => {

        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                list: 'search',
                origin: '*',
                format: 'json',
                srsearch: debouncedWord,
            },
        });

        if (response.status !== 200) {
            throw new Error('Error, fetching the data');
        }
        setResults(response.data.query.search);
    }

    const renderedResults = results.map(item => {
        return (
            <div className="item" key={item.pageid}>
                <div className="right floated content">
                    <a
                        href={`https://en.wikipedia.org?curid=${item.pageid}`}
                        className="ui button"
                        target="_blank">
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {item.title}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.snippet) }}></div>
                </div>
            </div>
        )


    });

    return (
        <div className="container ui">
            <div className="ui form">
                <div className="field">
                    <label htmlFor="seek">Enter Search Term</label>
                    <input id="seek" type="search" onChange={(e) => setSearchWord(e.target.value)} value={searchWord} />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}

export default Search;


// axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${searchWord}`)
