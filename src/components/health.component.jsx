import React from 'react';
import './health.component.css'

function HealthBarComponent({health = 100, name, isEnemy}) {
    return(
        <section id={name + 'Health'} class="container">
        <h2>{name} Health</h2>
        <div class="healthbar_">
          <div class="healthbar__value" style={{width: `${health}%`, backgroundColor: `${isEnemy ? 'red' : 'blue'}`}}>Health : {health}%</div>
        </div>
      </section> 
    )
}

export default HealthBarComponent