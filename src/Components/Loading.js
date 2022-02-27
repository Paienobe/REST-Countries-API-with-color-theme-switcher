import React from 'react'
import loadingGif from '../Assets/loading-gif.gif'
import { useGlobalContext } from '../context'

const Loading = () => {
  const { darkMode, darkModeMain } = useGlobalContext()
  return (
    <div className='loading' style={darkModeMain}>
      <img src={loadingGif} alt='loading-image' />
    </div>
  )
}

export default Loading
