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
    health: 30,
    level: 2,
  })
  
  const [battlelog, modifyLog] = useState([])

  //status of the spell, generally
  const [spellStatus, modSpellStatus] = useState({
    specialAttackReady: true, //toggled
    battleLog: [],
    time: 0,
    userSpell: '',
    spellChant: false,
    currentChant: '',
    chantChallenge: 'No Spell Yet!',
  })
  //for current chant
  const [chantData, setChant] = useState({
    time: 0,
    userSpell: '',
    currentChant: '',
    chantChallenge: 'No Spell Yet!',
  })



  //data
  const spellData = [
    {
      chant: 'Fire wraiths, blasting rage!',
      name: 'Fire Spell',
      minDamage: 15,
      maxDamage: 18,
      time: 6000,
    },
    {
      chant: 'Stone spirits, come forth to our enemy!',
      name: 'Stone Stun',
      isSpecial: true,
      realChance: 20,
      chance: 4, //change for calculation
      minDamage: 20,
      maxDamage: 30,
      time: 7000,
    },
    {
      chant: 'Water refreshes me!',
      name: 'Water Bender',
      minDamage: 20,
      maxDamage: 30,
      time: 4000,
    },
  ]
  const monsterAttack = {
    minDamage: 17,
    maxDamage: 19,
  }
  const defaultuserData = {
    name: 'guest player',
    health: 200,
    level: 2,
  }
  const defaultmonsterData = {
    name: 'monster 1',
    health: 100,
    level: 2
  }

  function handleUserAction(name) { //onClick handler on spell button
    let choosenSpell = spellData.filter(spell => spell.name === name)[0] //get another way to get spell
    console.log(choosenSpell)
  };

  function handleMonsterAction() {

  };

  function timerDisplay() {
    var timer = spellStatus.time;
    var interval = setInterval(() => {
      if(spellStatus.time > 0) {
        modSpellStatus({
          ...spellStatus,
          time: spellStatus.time--
        })
      } else {
        return timer = 0;
      }
    }, 1000)
    setTimeout(() => {
      clearInterval(interval)
    }, 10000)
  }

  function defaultCondition() {
    modSpellStatus({
      specialAttackReady: true, //toggled
      userSpell: '',
      spellChant: false,
      currentChant: '',
      chantChallenge: 'No Spell Yet!',
    })
  }

  function saveProgress() {
    window.localStorage.setItem('Player', JSON.stringify(playerData))
  }

  function restartGame(isSurrender) {
    //fetch user data
    if (isSurrender) {
      if (window.confirm('You sure?')) {
        window.alert('Noob')
      }
    }
    modifyPlayer(defaultuserData)
    modifyMonster(defaultmonsterData)
    modifyLog([])
    defaultCondition()
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
              spellData.map((el) =>
                <SpellBtnComponent name={el.name} type={'offensive'} clickHandler={handleUserAction} key={el.name}></SpellBtnComponent>
              )
            }
          </section>
          <SpellBtnComponent name="Surrender" clickHandler={restartGame} isSurrender={true}></SpellBtnComponent>
          <SpellBtnComponent name="Save" clickHandler={saveProgress}></SpellBtnComponent>

        </div>
        </div>

      <div className="chant-container">
        <div>
          {
            spellStatus ?
            <h3>{spellStatus.chantChallenge}</h3> : null
          }
          {spellStatus.spellChant ? <h4>Time (sec): {spellStatus.time}</h4> : ''}
      </div>
      <div className="user-chant">
          <input></input>
          <h4>Press enter to submit chant</h4>
        </div>
      </div>
      <div>
        <h2>Battle Log</h2>
        <ul>
         {
           battlelog.length > 0 ? 
           battlelog.forEach(log => <li>{log}</li>) : null
         }
        </ul>
      </div>
    </div >
  );
}

export default App;
