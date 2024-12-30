import { useState } from 'react';

import Board from './components/Board';
import Welcome from './components/Welcome';

function App() {

  const [playerOne, setPlayerOne] = useState('')

  const [nameOne, setNameOne] = useState('')

  return ( 
    <>   
      { !playerOne ? 
      <Welcome 
      nameOne={nameOne}
      setNameOne={setNameOne} 
      setPlayerOne={setPlayerOne}
      /> 
      : <Board playerOne={playerOne} /> }
    </>
  )
}

export default App;
