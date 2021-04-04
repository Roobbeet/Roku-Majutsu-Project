import React from 'react';
import './health.component.css'

function HealthBarComponent({health = 100, name, isEnemy}) {
  const color = {
    enemy: '#880017',
    friendly: '#00a876'
  }
    return(
        <section id={name + 'Health'} className="container">
        <h2>{name} Health : {health}</h2>
        <div className="healthbar_">
          <div className="healthbar__value" style={{
            width: `${health}%`,
            backgroundColor: `${isEnemy ? color.enemy : color.friendly}`,
            }}>{health}</div>
        </div>
      </section> 
    )
}

export default HealthBarComponent