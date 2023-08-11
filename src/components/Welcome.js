import React from 'react';

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
      <div style={styles.mainContainer} >
      <div style={styles.container}>
        <img alt='tic tac toe header logo' style={styles.logo} src={require('../logo.png')} />
        <h1 style={styles.header}>Welcome to Tic Tac Toe! Enter the Player Names Below.</h1>
        <p style={{textAlign: 'center'}}>Rules: 7 game series. First to win 4 games wins. Good luck!</p>
        <form style={styles.formStyle} onSubmit={handleSubmit}> 
          <input value={nameOne} onChange={handleChange} placeholder="Player one's name (X)" style={styles.input} type={'text'} />
          <input value={nameTwo} onChange={handleChangeTwo} placeholder="Player two's name (O)" style={styles.input} type={'text'} />
          <button style={styles.button}>Start Game</button>
        </form>
      </div>
    </div>
    )
  }
  
  const styles = {
      formStyle: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        margin: 'auto',
        marginTop: 50,
      },
      mainContainer: {
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage: "url('https://www.shutterstock.com/shutterstock/videos/1062255727/thumb/1.jpg?ip=x480')"
      },
      container: {
        position: 'relative',
        top: 150,
        color: 'white',
        overflow: 'auto'
      },
      input: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        padding: 35,
        fontSize: 20,
        fontWeight: 'bold',
        boxSizing: 'border-box',
        marginBottom: 15,
        border: 'none'
      },
      header: {
        textAlign: 'center',
        fontSize: 35
      },
      button: {
        width: '100%',
        height: 100,
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: 10,
        fontSize: 16
      },
      logo: {
        height: 100,
        width: 100,
        display: 'block',
        margin: 'auto',
        marginBottom: 40
      }
    }

export default Welcome;