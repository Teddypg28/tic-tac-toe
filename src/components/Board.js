import React, { useRef, useState } from 'react';

import Heading from './Heading';
import Square from './Square';

function Board({playerOne, playerTwo}) {

    // Initial State and Ref Values

    const [values, setValues] = useState(Array(9).fill(null))
    const [currentTurn, setCurrentTurn] = useState(playerOne)
    const [lastTurn, setLastTurn] = useState()

    const isSeriesOver = useRef(false)
    const playerOneWins = useRef(0)
    const playerTwoWins = useRef(0)

    // Handle Square Click

    const handleClick = (pos) => {
        const arr = values.slice()
        arr[pos] = currentTurn === playerOne ? 'X' : 'O'
        setValues(arr)
        setLastTurn(currentTurn)
        currentTurn === playerOne ? setCurrentTurn(playerTwo) : setCurrentTurn(playerOne)
    }

    // Check for winner or tie

    const winningPossibilities = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]
    
    const checkForWinner = () => {
        
        for (let i = 0; i<winningPossibilities.length; i++ ) {
            const [a, b, c] = winningPossibilities[i]
            if (values[a] === values[b] && values[a] === values[c] && values[a] != null) {
                return values[a]
            } 
        }
        }

    const checkForTie = () => {
        return values.every(value => value !== null)
    }

    let winner = checkForWinner()
    const tie = checkForTie()
    let header

    if (winner) {
            header = `${lastTurn} wins!`
            lastTurn === playerOne ? playerOneWins.current++ : playerTwoWins.current++
            if (playerOneWins.current === 4) {
                header = `${playerOne} Wins the Series!`
                isSeriesOver.current = true
            } else if (playerTwoWins.current === 4) {
                header = `${playerTwo} Wins the Series!`
                isSeriesOver.current = true
            }
        } else {
            header = currentTurn === playerOne ? `${currentTurn}'s Turn (X)` : `${currentTurn}'s Turn (O)`
        }
        if (tie && !winner) {
            header = 'Tie Game!'
        }
        
    // Button Events

    const refreshGame = () => {
            if (winner || tie) { setValues(Array(9).fill(null)); setCurrentTurn(playerOne) } else { alert('Game is not over yet.') }
        }
    
    const goToHomeScreen = () => {
            window.location.reload()
        }
            
    return (
        <>
            <div style={styles.gameContainer}>
                <div style={styles.scoreboard}>
                    <p>Scoreboard: First to 4 Wins!</p>
                    <h1 style={styles.scoreboardHeader}>{playerOne}: {playerOneWins.current} {playerOneWins.current === 1 ? 'Win' : 'Wins'} </h1>
                    <h1 style={styles.scoreboardHeader}>{playerTwo}: {playerTwoWins.current} {playerTwoWins.current === 1 ? 'Win' : 'Wins'} </h1>
                </div>
                <Heading header={header} playerOne={playerOne} />  
                <div style={styles.boardContainer}> 
                    <div>
                        <Square value={values[0]} onClick={() => handleClick(0)}  />
                        <Square value={values[1]} onClick={() => handleClick(1)} />
                        <Square value={values[2]} onClick={() => handleClick(2)} />
                    </div>
                    <div>
                        <Square value={values[3]} onClick={() => handleClick(3)} />
                        <Square value={values[4]} onClick={() => handleClick(4)} />
                        <Square value={values[5]} onClick={() => handleClick (5)} />
                    </div>
                    <div>
                        <Square value={values[6]} onClick={() => handleClick(6)} />
                        <Square value={values[7]} onClick={() => handleClick(7)} />
                        <Square value={values[8]} onClick={() => handleClick(8)} />
                    </div>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.newGameButton} onClick={refreshGame}>Next Game</button>
                    <button style={styles.homeScreenButton} onClick={goToHomeScreen}>Go to Home Screen</button>
                </div>
            </div>
        </>
    )
}


const styles = {
    gameContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHYAqQMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQMCBAUH/8QALRAAAgECBAUEAgEFAAAAAAAAAAECAxESEyFRBBQxUmFBQpGhMlOiBRUiQ5L/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QAIxEAAwACAwACAQUAAAAAAAAAAAECAxMRElFSYUEEMTNDU//aAAwDAQACEQMRAD8A+OI2iaNpn0ssyKxaKRIplIluxaS0WWizniysWN2OvGzpgzpps44PodFOWwjs9HCztpvodVKRwwkXjOxG7PZ/T2kd6noQqyMZhOpMmrO3Jl5RiozlqMrORzTkXmzx89E5shJlJshNlFR5OVmZMlJ6GmTbD2OC2ZbJyNSMSZOqOejDYXExXOdsQEza6k0bTuaWBFEbTJI3FlexSWXgUi9SEXoUiw9jqijoiy0JdDlUtSsJE3R3YqOyE9S0ZnHGRVTVtCLZ6OPLwdeNmJTuiOZ5MuenUXkvWY1KZCchSmSnIomcOXJyKTJTY3InJlVR52ShSlYnJhNk5PQ3Y47Y2ybYNmWxXRFibMgxEXQg0aTMDQUzG7mkYuaTuPyMmVTKKWxBM2mbktNF4vcrGRzRlqUUlsI2dUWdMZmlM5lI2pE2zrjIdGMTmQUhueqF5HeU3KZOUjLkTlIdMheQ02SbCUjDdx1RyXQNmG9BNmWw9jmqgYmJsTFbJiATETbAaC4gHTAaGnYzcLh7BKXNqRJMaZuR0yykbUiKY1IVstNF1MeJkVIeJkyystiDGRxBiMNsKuRi5iUtRYgom7G5dTFwbMNjckaobZlsTYrg7EmMQXEbkVgIBCgGAAMAYXEBg8mgEMwTSZq5O47gGT4KXHiJJjuAdUUxCxGLhcAexpsLmbivqEV0NsyO5m5uRGwYhiZgBcAABhAAGAAFcAZbL66ASGVVKT6IMp7G1MPDJDKZUu1msmXazamHh+ER3KqhPtHy8/SDBqoZTXhG4F+WqWvgfwPlanbL4NqYel+HOFzo5Wr+uXwHK1PWEvgGph134c4jo5afaw5ea9rDqYHF+HOI6Mifax5EtjamDq/DmA6Ml7BlPY2lg6s59Q1L4PAYDaX6Dg57O4y+FBZA0fZuAUnszaqNPodypU9hqENjo2ItOKvTiVaXabz5tfj06HbGFPtNYaaf4oGxFpxV8jiVab9htVpv2anbHLT/ABiaUqewry/RecT/ADZwqvV9Kf0UVet+r6O5VaaVrG48RBdIoTa/DojEvzZxR4iutMr6Kw43jI/jTX/J1ri4r2o3Hjor2oR5a8OuIhf2s5V/U+O6YP4onLjuMl+VL+J3/wBwXZH4E+PT9iF2X4VfVr+ZnmS4niH1p/RN16175X0eo+Mi/avgxLiIXf8AiMsleHNWOP8AQ8uVWq/9f0ZdWf6z05Vqb9pNzpv0HWRnLeJfM811Z9hjNn0wHpN09dEYeXsNsOesb+R5zqPtMOTfoejJQv0MSUPRB7kHjfp5+osMtjvcY7Cwx8G7E3jY3JizGgAQtyZdVoy678gAGL2Zl8Qxcy/IwFYOzDmZeRc1JbgADd64/cOblsx83LyAGBsr0OblsHNvZgBjbL9Dm2/Ri5qQAY2yvQ5qXrcFxLe4AY3evQ5h+R5z8gBjdmGZIaqNgAUzcs1iYXADBP/Z')",
        color: 'white',
        backgroundSize: 'cover'
    },
    boardContainer: {
        display: 'flex',
        marginTop: 25,
        marginBottom: 25,
        pointerEvents: winner || tie ? 'none' : null
    },
    buttonContainer: {
        display: 'flex', 
        position: 'relative', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column'
    },
    newGameButton: {
        height: 60,
        width: 270,
        borderRadius: 10,
        border: 'none',
        marginBottom: 10,
        fontWeight: 'bold',
        pointerEvents: isSeriesOver.current ? 'none' : null
    }, 
    homeScreenButton: {
        fontWeight: 'bold',
        height: 60,
        width: 270,
        borderRadius: 10,
        border: 'none',
        color: 'purple'
    },
    scoreboard: {
        position: 'absolute',
        left: 10,
        top: 10,
        border: '2px solid lightblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreboardHeader: {
        margin: 0,
        marginTop: 10,
        marginBottom: 20
    },
    historyContainer: {
        position: 'absolute', 
        top: 150,
        right: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}


export default Board;