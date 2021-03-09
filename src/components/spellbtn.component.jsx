import React from 'react'

function SpellBtnComponent({name, type, clickHandler}) {
    return (
        <button className={type + 'spellBtn'} onClick={() => clickHandler(name)}>{name}</button>
    )
}

export default SpellBtnComponent;