import React, { useRef, useState } from 'react';

import '../board.css'

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
            <div className='gameContainer'>
                <div className='scoreboard'>
                    <p>Scoreboard: First to 4 Wins!</p>
                    <h1 className='scoreboardHeader'>{playerOne}: {playerOneWins.current} {playerOneWins.current === 1 ? 'Win' : 'Wins'} </h1>
                    <h1 className='scoreboardHeader'>{playerTwo}: {playerTwoWins.current} {playerTwoWins.current === 1 ? 'Win' : 'Wins'} </h1>
                </div>
                <Heading header={header} playerOne={playerOne} />  
                <div className='boardContainer' style={{pointerEvents: winner || tie ? 'none' : null}}> 
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
                <div className='buttonContainer'>
                    <button className='newGameButton' style={{pointerEvents: isSeriesOver.current ? 'none' : null}} onClick={refreshGame}>Next Game</button>
                    <button className='homeScreenButton' onClick={goToHomeScreen}>Go to Home Screen</button>
                </div>
            </div>
        </>
    )
}


export default Board;