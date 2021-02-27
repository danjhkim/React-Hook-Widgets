import React, { useState } from 'react'
import axios from 'axios'

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);


    const onTitleClick = (index) => {
        setActiveIndex(index)
    }


    const list = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : ''

        return (
            <React.Fragment key={item.title} >
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    {item.content}
                </div>
            </React.Fragment >
        )
    })

    return (
        <>
            <div className="ui styled accordion">{list}</div>
        </>

    );
}

export default Accordion;