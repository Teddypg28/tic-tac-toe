import React, { useEffect, useRef, useState } from 'react';

import '../css/board.css'

import Heading from './Heading';
import Square from './Square';

function Board({playerOne, playerTwo="Robo"}) {

    const [currentBoard, setCurrentBoard] = useState(Array(9).fill(null))
    const [currentTurn, setCurrentTurn] = useState(playerOne)
    const [lastTurn, setLastTurn] = useState()

    const isSeriesOver = useRef(false)
    const playerOneWins = useRef(0)
    const playerTwoWins = useRef(0)

    const getTerminalValue = (board) => {
        let score = null
        const winningScores = {
            X: 1,
            O: -1
        }
        const winningPossibilities = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]
        for (let i = 0; i<winningPossibilities.length; i++ ) {
            const [a, b, c] = winningPossibilities[i]
            if (board[a] === board[b] && board[a] === board[c] && board[a] != null) {
                score = winningScores[board[a]]
                break
            }
        }
        if (score === null && board.every(square => square !== null)) score = 0
        return score
    }

    const minimax = (board, isMaximizing) => {

        // see if board is in terminal state
        const result = getTerminalValue(board)
        if (result !== null) {
            return result
        }
        
        // x's turn to maximize
        if (isMaximizing) {
            let best = -Infinity
            board.forEach((square, index) => {
                if (!square) {
                    board[index] = 'X'
                    best = Math.max(best, minimax(board, false))
                    board[index] = null
                }
            })
            return best
        } 

        // o's turn to minimize
        let best = Infinity
        board.forEach((square, index) => {
            if (!square) {
                board[index] = 'O'
                best = Math.min(best, minimax(board, true))
                board[index] = null
            }
        })
        return best
    }

    const reachesTerminalState = (index) => {
        const currentBoardCopy = [...currentBoard]
        currentBoardCopy[index] = '0'
        const terminalValue = getTerminalValue(currentBoardCopy)
        if (terminalValue !== null) {
            return true
        }
        return false
    }

    const bestMove = () => {
        let bestValue = Infinity
        let bestSquare
        const currentBoardCopy = [...currentBoard]
        currentBoardCopy.forEach((square, index) => {
            if (!square) {
                currentBoardCopy[index] = 'O'
                const score = minimax(currentBoardCopy, true)
                currentBoardCopy[index] = null
                if (score < bestValue) {
                    bestValue = score
                    bestSquare = index
                } else if (score === bestValue) {
                    currentBoardCopy[index] = 'O'
                    if (getTerminalValue(currentBoardCopy) === -1) {
                        bestSquare = index
                    }
                    currentBoardCopy[index] = null
                }
            }
        })
        handleClick(bestSquare)
    }

    useEffect(() => {
        if (currentTurn === playerTwo) {
            bestMove()
        }
    }, [currentTurn, playerTwo, bestMove])

    // Handle Square Click

    const handleClick = (pos) => {
        const arr = currentBoard.slice()
        arr[pos] = currentTurn === playerOne ? 'X' : 'O'
        setCurrentBoard(arr)
        setLastTurn(currentTurn)
        currentTurn === playerOne ? setCurrentTurn(playerTwo) : setCurrentTurn(playerOne)
    }

    let winner
    const tie = currentBoard.every(square => square !== null)
    const winningPossibilities = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]
    for (let i = 0; i<winningPossibilities.length; i++ ) {
        const [a, b, c] = winningPossibilities[i]
        if (currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c] && currentBoard[a] != null) {
            winner = lastTurn
        }
    }

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
    
    // gameplay button actions
    const refreshGame = () => {
        if (winner || tie) { setCurrentBoard(Array(9).fill(null)); setCurrentTurn(playerOne) } else { alert('Game is not over yet.') }
    }
    
    const goToHomeScreen = () => window.location.reload()
            
    return (
        <>
            <div className='gameContainer'>
                <div className='scoreboard'>
                    <p style={{fontWeight: 'bold'}}>Scoreboard: First to 4 Wins!</p>
                    <h1 className='scoreboardHeader'>{playerOne}: {playerOneWins.current} {playerOneWins.current === 1 ? 'Win' : 'Wins'} </h1>
                    <h1 className='scoreboardHeader'>{playerTwo}: {playerTwoWins.current} {playerTwoWins.current === 1 ? 'Win' : 'Wins'} </h1>
                </div>
                <Heading header={header} playerOne={playerOne} />  
                <div className='boardContainer' style={{pointerEvents: winner || tie ? 'none' : null}}> 
                    <div>
                        <Square value={currentBoard[0]} onClick={() => handleClick(0)}  />
                        <Square value={currentBoard[1]} onClick={() => handleClick(1)} />
                        <Square value={currentBoard[2]} onClick={() => handleClick(2)} />
                    </div>
                    <div>
                        <Square value={currentBoard[3]} onClick={() => handleClick(3)} />
                        <Square value={currentBoard[4]} onClick={() => handleClick(4)} />
                        <Square value={currentBoard[5]} onClick={() => handleClick (5)} />
                    </div>
                    <div>
                        <Square value={currentBoard[6]} onClick={() => handleClick(6)} />
                        <Square value={currentBoard[7]} onClick={() => handleClick(7)} />
                        <Square value={currentBoard[8]} onClick={() => handleClick(8)} />
                    </div>
                </div>
                <div className='buttonContainer'>
                    <button className='newGameButton' style={{pointerEvents: isSeriesOver.current ? 'none' : null, opacity: isSeriesOver.current ? '10%' : '100%'}} onClick={refreshGame}>Next Game</button>
                    <button className='homeScreenButton' onClick={goToHomeScreen}>Exit Series</button>
                </div>
            </div>
        </>
    )
}


export default Board;