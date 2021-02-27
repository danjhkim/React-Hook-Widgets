import React, { useState } from 'react'
import Accordion from './components/Accordion'
import Dropdown from './components/Dropdown'
import Search from './components/Search'
import Translate from './components/Translate'
import Route from './components/Route'
import Header from './components/Header'

const items = [
    {
        title: 'What is React?',
        content: 'React is a frontend javascript framework'
    },
    {
        title: 'Why use React?',
        content: 'React is a favourite JS library among engineers'
    },
    {
        title: 'How do you use React?',
        content: 'You use react by creating components'
    }
]

const options = [
    {
        title: 'The Color Red',
        value: 'red'
    },
    {
        title: 'The Color Green',
        value: 'green'
    },
    {
        title: 'The color Blue',
        value: 'blue'
    }
]


const App = () => {
    const [selected, setSelected] = useState([]);

    return (
        <div className="ui container">
            <Header />
            <Route path='/'>
                <Accordion items={items} />
            </Route>
            <Route path='/list'>
                <Search />
            </Route>
            <Route path='/translate'>
                <Translate />
            </Route>
            <Route path='/dropdown'>
                <Dropdown
                    options={options}
                    title={'Select a Color'}
                    selected={selected}
                    onSelected={setSelected}
                />
            </Route>
        </div>

    );
}

export default App;