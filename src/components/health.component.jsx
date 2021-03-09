import React from 'react';

function HealthBarComponent({health = 100, name, isEnemy}) {
    return(
        <section id={name + 'Health'} class="container">
        <h2>{name} Health</h2>
        <div class={"healthbar " + isEnemy ? 'enemy' : 'friendly'}>
          <div class="healthbar__value"></div>
        </div>
      </section> 
    )
}

export default HealthBarComponent