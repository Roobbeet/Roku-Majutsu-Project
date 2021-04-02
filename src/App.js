import React, { useContext, useEffect, useState } from 'react'

import SpellBtnComponent from './components/spellbtn.component'

import HealthBarComponent from './components/health.component'


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
    chantChallenge: 'No Spell Yet!',
  })

  let spellTypes = [ //for spell mapping
    'fireSpell',
    'stoneStun',
    'waterBender',
  ]

  //data
  const spellData = {
    fireSpell: {
      chant: 'Fire wraiths, blasting rage!',
      name: 'Fire Spell',
      minDamage: 15,
      maxDamage: 18,
      time: 6000,
    },
    stoneStun: {
      chant: 'Stone spirits, come forth to our enemy!',
      name: 'Stone Stun',
      realChance: 20,
      chance: 4, //change for calculation
      minDamage: 20,
      maxDamage: 30,
      time: 7000,
    },
    waterBender: {
      chant: 'Water refreshes me!',
      name: 'Water Bender',
      minDamage: 20,
      maxDamage: 30,
      time: 4000,
    },
    monsterDamage: {
      minDamage: 17,
      maxDamage: 19,
    }
  }

  function handleUserAction(name) { //onClick handler on spell button
    console.log(name)
  };

  function handleMonsterAction() {

  };

  function defaultCondition() {
    modSpellStatus({
      specialAttackReady: true, //toggled
      battleLog: [],
      userSpell: '',
      spellChant: false,
      currentChant: '',
      chantChallenge: 'No Spell Yet!',
    })
  }

  /* Questions 
  1. where the datas will be stored?
  2. how to detect user and monster data changes like levels etc. ?
  3. where to calculate user level?
  
  */

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
  }, [playerData]);

  useEffect(() => {
    //get monster data


    //get player data (levels etc.)


  }, []) //init conditions

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
      <header>
        <h1>Magic Typing Game by <a href="https://github.com/Roobbeet" target="_blank">Roobbeet</a></h1>
      </header>

      <div id="app">
        <div className="healths">
          <div className="friendly">
            {playerData ? 
            <HealthBarComponent health={playerData.health} name={playerData.name} isEnemy={false}></HealthBarComponent> : null
          }
          </div>
          <div className="enemy">
            {
            monsterData ?
            <HealthBarComponent health={monsterData.health} name={monsterData.name} isEnemy={true}></HealthBarComponent> : null
            }
          </div>
        </div>

        <div className="spell_controller-container">
          <section id="controls">
            {/* loop button for enabled spells and surrender */}
            {
              spellTypes.map((el) =>
                <SpellBtnComponent name={spellData[el].name} type={'offensive'} clickHandler={handleUserAction} key={el}></SpellBtnComponent>
              )
            }
          </section>
        </div>
        </div>

      <div class="chant-container">
        <div>
          {
            spellStatus ?
            <h4>{spellStatus.chantChallenge}</h4> : null
          }
          <h2></h2> 
          {/* timer */}
          <h3></h3>
      </div>
      <div class="user-chant">
          <input></input>
          <h4>Press enter to submit chant</h4>
        </div>
    </div>
    </div >
  );
}

export default App;
