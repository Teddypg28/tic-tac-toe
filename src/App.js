import { useState } from 'react';

import Board from './components/Board';
import Welcome from './components/Welcome';

function App() {

  const [playerOne, setPlayerOne] = useState('')
  const [playerTwo, setPlayerTwo] = useState('')

  const [nameOne, setNameOne] = useState('')
  const [nameTwo, setNameTwo] = useState('')

  return ( 
    <>   
      { !playerOne || !playerTwo ? 
      <Welcome 
      nameOne={nameOne}
      nameTwo={nameTwo}
      setNameOne={setNameOne} 
      setNameTwo={setNameTwo} 
      setPlayerOne={setPlayerOne}
      setPlayerTwo={setPlayerTwo}
      /> 
      : <Board playerOne={playerOne} playerTwo={playerTwo} /> }
    </>
  )
}

export default App;
