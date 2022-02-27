import React, { useContext, useEffect, useState } from 'react'

const allCountriesUrl = 'https://restcountries.com/v2/all'
const countriesByNameUrl = 'https://restcountries.com/v2/name/'
const countriesByRegion = 'https://restcountries.com/v3.1/region/'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [hasRegionalFilter, setHasRegionalFilter] = useState(false)
  const [allCountries, setAllCountries] = useState([])
  const [visibleCountries, setVisibleCountries] = useState(8)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const regionalFilters = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

  const selectRegionalFilter = () => {
    setHasRegionalFilter(!hasRegionalFilter)
  }

  const fetchAllCountries = async (url) => {
    setIsLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    setAllCountries(data)
    setIsLoading(false)
  }

  const fetchCountriesByRegion = async (url) => {
    setIsLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const requiredData = data.map((item) => {
      return {
        name: item.name.common,
        population: item.population,
        region: item.region,
        capital: item.capital ? item.capital[0] : ['Unknown'],
        flag: item.flags.png,
      }
    })

    setAllCountries(requiredData)
    setHasRegionalFilter(false)
    setIsLoading(false)
  }

  const loadMoreCountries = () => {
    let currentlyDisplayedCountries = visibleCountries
    setVisibleCountries(currentlyDisplayedCountries + 8)
  }

  const loadFilteredCountries = (e) => {
    const selectedRegion = e.target.innerText
    fetchCountriesByRegion(`${countriesByRegion}${selectedRegion}`)
  }

  const searchForCountries = async (e) => {
    let inputedValue = e.target.value
    setSearchText(inputedValue)
    if (inputedValue.length < 1) {
      fetchAllCountries(allCountriesUrl)
    } else {
      const response = await fetch(`${countriesByNameUrl}${inputedValue}`)
      const data = await response.json()
      setAllCountries(data)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const darkModeMain = darkMode
    ? { background: 'hsl(207, 26%, 17%)', color: 'hsl(0, 0%, 100%)' }
    : {}

  const darkModeElements = darkMode
    ? { background: 'hsl(209, 23%, 22%)', color: 'hsl(0, 0%, 100%)' }
    : {}

  useEffect(() => {
    fetchAllCountries(allCountriesUrl)
  }, [])

  return (
    <AppContext.Provider
      value={{
        allCountries,
        hasRegionalFilter,
        visibleCountries,
        regionalFilters,
        searchText,
        isLoading,
        darkMode,
        darkModeMain,
        darkModeElements,
        countriesByNameUrl,
        setIsLoading,
        setSearchText,
        selectRegionalFilter,
        loadMoreCountries,
        loadFilteredCountries,
        searchForCountries,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
