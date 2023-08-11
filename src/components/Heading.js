import React from 'react';

function Heading({header}) {
    
    return (
        <div style={styles.container}>
            {header}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 40,
        top: 105
    }
}

export default Heading;