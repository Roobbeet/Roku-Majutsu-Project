import React from 'react'

function SpellBtnComponent({name, type, clickHandler, isSurrender}) {
    return (
        <button className={type + 'spellBtn'} onClick={
            () => clickHandler(name ? name : isSurrender)
        }>{name}</button>
    )
}

export default SpellBtnComponent;