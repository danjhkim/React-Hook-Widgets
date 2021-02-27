import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({ options, title, selected, onSelected }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        return () => {
            document.body.removeEventListener('click', onBodyClick);
        };
    }, []);


    const renderedOptions = options.map(
        (item) => {
            if (item.value === selected.value) {
                return (
                    <div key={item.value} className="item disabled" onClick={() => {
                        onSelected(item)
                    }}>
                        {item.title} *Selected*
                    </div>
                )
            } else {
                return (
                    <div key={item.value} className="item" onClick={() => {
                        onSelected(item)
                    }}>
                        {item.title}
                    </div>
                )
            }
        }
    )

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{title}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.title}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;