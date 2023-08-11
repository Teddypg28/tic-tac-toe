import React from 'react';

function Square({value, onClick}) {

    return (
        <div style={styles.square} onClick={onClick}>{value}</div>
        );
    }
    
    const styles = {
        square: {
            width: 130,
            height: 130,
            fontSize: 40,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            pointerEvents: value != null  ? 'none' : null 
        }
    }

    export default Square;