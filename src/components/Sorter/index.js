import React from 'react';

import Arrow from '../icons/Arrow';

import './Sorter.css';

const Sorter = props => {
    const className = 'sorter' + (props.sorted === 'up' ? ' sorter-up'
        : (props.sorted === 'down' ? ' sorter-down' : ''));
    return <div className={className} onClick={props.toggleSort} data-sorts={props.sorts}>
        <Arrow up/>
        <Arrow/>
    </div>;
};

export default Sorter;
