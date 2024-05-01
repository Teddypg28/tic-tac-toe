import React from 'react';

import '../css/square.css'

function Square({value, onClick}) {

    return (
        <div className='square' onClick={onClick} style={{pointerEvents: value !== null && 'none'}}>{value}</div>
        );
}

export default Square;