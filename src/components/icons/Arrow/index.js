import React from 'react';
import './Arrow.css';

const Arrow = props => {
    const path = props.up ?
        "M0 50 45 0 90 50Z"
        : "M0 0 45 50 90 0Z";
    return <svg viewBox="0 0 90 50" xmlns="http://www.w3.org/2000/svg" className="icons icons-arrow">
        <path d={path}/>
    </svg>;
};

export default Arrow;