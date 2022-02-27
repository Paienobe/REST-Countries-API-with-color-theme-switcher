import React, { useEffect, useState } from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useGlobalContext } from '../context'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Components/Loading'

const CountryWithInfo = () => {
  const {
    darkModeElements,
    darkModeMain,
    isLoading,
    allCountries,
    setIsLoading,
  } = useGlobalContext()

  const countryName = useParams().name
  const [singleCountry, setSingleCountry] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const requestedCountry = allCountries.filter((country) => {
      return country.name.toLowerCase() === countryName.toLowerCase()
    })

    setSingleCountry(requestedCountry)
    setIsLoading(false)
  }, [countryName])

  if (isLoading) {
    return <Loading />
  }

  return (
    <article className='detailed-country' style={darkModeMain}>
      <Link to='/' className='back-link'>
        <button className='back-btn load-btn' style={darkModeElements}>
          <FaLongArrowAltLeft
            size={25}
            style={{ margin: '0 1rem 0 0', darkModeElements }}
          />
          Back
        </button>
      </Link>

      {singleCountry.length > 0 ? (
        <div className='full-details'>
          <img
            src={singleCountry[0].flag}
            alt={'name'}
            className='flag detailed-page-flag'
          />
          <div className='information'>
            <div className='info-text'>
              <div className='main-info'>
                <h2>{singleCountry[0].name}</h2>
                <p>
                  <span>Native Name: </span> {singleCountry[0].nativeName}
                </p>
                <p>
                  <span>Population: </span> {singleCountry[0].population}
                </p>
                <p>
                  <span>Region: </span> {singleCountry[0].region}
                </p>
                <p>
                  <span>Sub Region: </span> {singleCountry[0].subregion}
                </p>
                <p>
                  <span>Capital: </span> {singleCountry[0].capital}
                </p>
              </div>

              <div className='side-info'>
                <p>
                  <span>Top Level Domain: </span>
                  {singleCountry[0].topLevelDomain}
                </p>
                <p>
                  <span>Currencies: </span>{' '}
                  {singleCountry[0].currencies[0].name}
                </p>
                <p>
                  <span>Languages: </span>
                  {singleCountry[0].languages.map((language, index) =>
                    language.name.concat(
                      `${
                        index !== singleCountry[0].languages.length - 1
                          ? ', '
                          : ' '
                      }`
                    )
                  )}
                </p>
              </div>
            </div>

            <div className='borders'>
              <h3>Border Countries:</h3>
              {singleCountry[0].borders ? (
                <div className='button-container'>
                  {singleCountry[0].borders.map((border, index) => {
                    const borderCountryNames = allCountries.filter(
                      (country) => country.alpha3Code === border
                    )
                    return (
                      <Link to={`/country/${borderCountryNames[0].name}`}>
                        <button
                          className='border-btn'
                          key={index}
                          style={darkModeElements}
                        >
                          {borderCountryNames[0].name}
                        </button>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                'NO BORDERS'
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </article>
  )
}

export default CountryWithInfo
