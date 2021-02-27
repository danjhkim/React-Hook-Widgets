import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios'

const Convert = ({ language, text }) => {
    const [results, setResults] = useState(null);
    const [debouncedWord, setDebouncedWord] = useState(text);

    const translateFetch = async () => {
        const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
            params: {
                key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
                source: 'en',
                // format: 'json',
                target: language.value,
                q: text
            },
        });

        if (response.status !== 200) {
            throw new Error('Error, fetching the data');
        }
        const { data } = response
        setResults(data.data.translations[0].translatedText)
        //its important to read the object and get the string value here. Why? cuz if u do it while rendering. if the object is null
        // its gonna error out.
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedWord(text)
        }, 1000)

        return () => {
            clearTimeout(timerId);
        };
    }, [text, language]);

    useEffect(() => {
        if (debouncedWord) {
            translateFetch().catch(err => {
                console.log(err);
            })
        }
    }, [debouncedWord, language]);


    return (
        <div>
            <h1 className="ui header">{results}</h1>
        </div>
    );
}

export default Convert;