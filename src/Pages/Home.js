import React from 'react'
import { BiSearchAlt2, BiChevronDown } from 'react-icons/bi'
import { useGlobalContext } from '../context'
import Country from '../Components/Country'
import Loading from '../Components/Loading'

const Home = () => {
  const {
    allCountries,
    hasRegionalFilter,
    regionalFilters,
    selectRegionalFilter,
    visibleCountries,
    loadMoreCountries,
    loadFilteredCountries,
    searchText,
    searchForCountries,
    isLoading,
    darkMode,
    darkModeMain,
    darkModeElements,
  } = useGlobalContext()

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className='home' style={darkModeMain}>
      <div className='home-content'>
        <div className='filter-section'>
          <div className='search-bar' style={darkModeElements}>
            <BiSearchAlt2 size={25} style={{ color: 'hsl(0, 0%, 52%)' }} />
            <input
              type='text'
              className='search-input-bar'
              placeholder='Search for a country...'
              value={searchText}
              onChange={searchForCountries}
              style={darkModeElements}
            />
          </div>

          <div className='filter-container'>
            <div className='filter-type' style={darkModeElements}>
              <p>Filter by Region</p>
              <button
                className='filter-dropdown-btn'
                onClick={selectRegionalFilter}
              >
                <BiChevronDown size={20} style={darkModeElements} />
              </button>
            </div>

            {hasRegionalFilter ? (
              <div className='filters' style={darkModeElements}>
                {regionalFilters.map((filter, index) => {
                  return (
                    <button
                      className='filter-btn'
                      key={index}
                      onClick={loadFilteredCountries}
                      style={darkModeElements}
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className='countries-container'>
          {allCountries.slice(0, visibleCountries).map((country, index) => {
            return <Country key={index} {...country} />
          })}
        </div>

        {visibleCountries < allCountries.length ? (
          <button
            className='load-btn'
            onClick={loadMoreCountries}
            style={darkModeElements}
          >
            Load More
          </button>
        ) : (
          ''
        )}
      </div>
    </main>
  )
}

export default Home
