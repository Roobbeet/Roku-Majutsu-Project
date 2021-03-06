import React, { useContext, useEffect, useState } from 'react'

import logo from './logo.svg';
import './App.css';

function App() {
  //state
  const [monsterData, modifyMonster] = useState({
    name: 'monster 1', //these will be modified by db
    health: 100,
    level: 2
  });
  const [playerData, modifyPlayer] = useState({
    name: 'guest player',
    health: 100,
    level: 2,
  })
  const [battlelog, modifyLog] = useState([])
  const [spellStatus, modSpellStatus] = useState({
    specialAttackReady: true, //toggled
    battleLog: [],
    userSpell: '',
    spellChant: false,
    currentChant: '',
    chantChallenge: 'Example Chant',
  })

  //data
  const spellData = {
    fireSpell: {
      chant: 'Fire wraiths, blasting rage!',
      minDamage: 15,
      maxDamage: 18,
      time: 6000,
    },
    stoneStun: {
      chant: 'Stone spirits, come forth to our enemy!',
      realChange: 20,
      chance: 4, //change for calculation
      minDamage: 20,
      maxDamage: 30,
      time: 7000,
    },
    waterBender: {
      chant: 'Water refreshes me!',
      minDamage: 20,
      maxDamage: 30,
      time: 4000,
    },
    monsterDamage: {
      minDamage: 17,
      maxDamage: 19,
    }
  }

  function handleUserAction() {

  };

  function handleMonsterAction() {

  }

  //watch
  useEffect(() => {
    if (monsterData.health <= 0) {
      alert('you win')
      restartGame()
    }
  }, [monsterData])

  useEffect(() => {
    if (playerData.health <= 0) {
      alert('you lose')
      restartGame()
    }
  }, [playerData])

  function restartGame() {
    //fetch user data
    const defaultuserData = {
      name: 'guest player',
      health: 100,
      level: 2,
    }
    const defaultmonsterData = {
      name: 'monster 1',
      health: 100,
      level: 2
    }
    modifyPlayer(defaultuserData)
    modifyMonster(defaultmonsterData)
    modifyLog([])
    modSpellStatus({
      specialAttackReady: true,
      battleLog: [],
      userSpell: '',
      spellChant: false,
      currentChant: '',
      chantChallenge: 'Example Chant',
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
