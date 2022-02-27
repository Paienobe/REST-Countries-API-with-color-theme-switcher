import React from 'react'
import { FiMoon } from 'react-icons/fi'
import { BsFillMoonFill } from 'react-icons/bs'
import { useGlobalContext } from '../context'

const Navbar = () => {
  const { darkMode, toggleDarkMode, darkModeElements } = useGlobalContext()
  return (
    <nav className='navbar' style={darkModeElements}>
      <h3>Where in the world?</h3>
      <button
        className='dark-mode-btn'
        onClick={toggleDarkMode}
        style={darkModeElements}
      >
        <FiMoon size={20} style={darkModeElements} />
        <p>Dark Mode</p>
      </button>
    </nav>
  )
}

export default Navbar
