import React from 'react';

import '../css/welcome.css'

function Welcome({ nameOne, setPlayerOne, setNameOne }) {

  const handleChange = (e) => {
      setNameOne(e.target.value)
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!nameOne) {
        alert('Please enter your name')
      } else {
        setPlayerOne(nameOne)
      }
    }
    
    return (
      <div className='welcomeMainContainer'>
        <div className='welcomeContainer'>
          <img alt='tic tac toe header logo' draggable="false" className='welcomeLogo' src={require('../images/logo.png')} />
          <h1 className='header'>Welcome to Tic Tac Toe!</h1>
          <p style={{textAlign: 'center', fontWeight: 'normal', color: 'black'}}>Rules: 7 game series. First to win 4 games wins. Good luck trying to beat Robo!</p>
          <form className='formStyle' onSubmit={handleSubmit}> 
            <input value={nameOne} onChange={handleChange} placeholder="Enter your name to begin" className='input' type={'text'} />
            <button className='button'>Start Game</button>
          </form>
        </div>
    </div>
    )
  }

export default Welcome;