import React from 'react';

import '../css/welcome.css'

function Welcome({ nameOne, nameTwo, setPlayerOne, setPlayerTwo, setNameOne, setNameTwo }) {

  const handleChange = (e) => {
      setNameOne(e.target.value)
    }
    
    const handleChangeTwo = (e) => {
      setNameTwo(e.target.value)
    }
    
    const handleSubmit = (e) => {
      if (!nameOne || !nameTwo) {
        alert('There must be two players.')
        e.preventDefault()
      } else {
        setPlayerOne(nameOne)
        setPlayerTwo(nameTwo)
        e.preventDefault()
      }
    }
    
    return (
      <div className='welcomeMainContainer'>
        <div className='welcomeContainer'>
          <img alt='tic tac toe header logo' className='welcomeLogo' src={require('../images/logo.png')} />
          <h1 className='header'>Welcome to Tic Tac Toe! Enter the Player Names Below.</h1>
          <p style={{textAlign: 'center'}}>Rules: 7 game series. First to win 4 games wins. Good luck!</p>
          <form className='formStyle' onSubmit={handleSubmit}> 
            <input value={nameOne} onChange={handleChange} placeholder="Player one's name (X)" className='input' type={'text'} />
            <input value={nameTwo} onChange={handleChangeTwo} placeholder="Player two's name (O)" className='input' type={'text'} />
            <button className='button'>Start Game</button>
          </form>
        </div>
    </div>
    )
  }

export default Welcome;