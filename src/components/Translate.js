import React, { useState } from 'react'
import Convert from './Convert';
import Dropdown from './Dropdown'

const options = [
    {
        title: 'Arikaans',
        value: 'af'
    },
    {
        title: 'Arabic',
        value: 'ar'
    },
    {
        title: 'Hindi',
        value: 'hi'
    }
]


const Translate = () => {
    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState('');

    return (
        <div className="ui container">
            <div className="ui form">
                <div className="field">
                    <label htmlFor="">Enter Text to translate</label>
                    <input type="search" value={text} onChange={(e) => { setText(e.target.value) }} />
                </div>
            </div>
            <Dropdown
                selected={language}
                onSelected={setLanguage}
                options={options}
                title='Select a Language'
            />
            <br />
            <h3 className="ui header">Output</h3>
            <Convert language={language} text={text} />
        </div>
    );
}

export default Translate;