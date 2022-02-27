import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Country = ({ name, population, region, capital, flag }) => {
  const { darkMode, darkModeElements } = useGlobalContext()
  return (
    <div className='country' style={darkModeElements}>
      <Link
        to={`/country/${name}`}
        className='country-link'
        style={darkModeElements}
      >
        <img src={flag} alt={`${name}-flag`} className='country-flag' />
        <div className='country-details'>
          <h2 className='country-name'>{name}</h2>
          <p>
            <span>Population:</span> {population}
          </p>
          <p>
            <span>Region:</span> {region}
          </p>
          <p>
            <span>Capital:</span> {capital}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Country
