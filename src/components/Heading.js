import React from 'react';

import '../css/heading.css'

function Heading({header}) {
    
    return (
        <div className='headingContainer'>
            {header}
        </div>
    );
}

export default Heading;