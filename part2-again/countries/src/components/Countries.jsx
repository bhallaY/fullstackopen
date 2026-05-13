import { useEffect, useState } from "react";
import { getWeatherIconUrl, getWeatherInfo } from "../services/weather";

export function Countries({ searchTerm, countries, handleShowCountry }) {
    if (!searchTerm) {
        return null
    }
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
        return <ul>{filteredCountries.map(c => <li key={c.name.common}>{c.name.common} <button onClick={() => handleShowCountry(c.name.common)}>Show</button></li>)}</ul>
    } else if (filteredCountries.length === 1) {
        const c = filteredCountries[0]
        return <Country country={c} />
    } else {
        return null
    }
}

function Country({ country }) {
    const [weatherInformation, setWeatherInformation] = useState(null)

    useEffect(() => {
        let ignore = false

        getWeatherInfo(country.capital[0], country.cca2).then(resp => {
            if (!ignore) {
                setWeatherInformation(resp)
            }
        })

        return () => {
            ignore = true
        }
    }, [country.capital, country.cca2]);


    return <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.entries(country.languages).map(([k, v]) => <li key={k}>{v}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        {weatherInformation !== null ? <Weather weatherInfo={weatherInformation} cityName={country.capital[0]} /> : null}
    </>
}

function convertKelvin(temp, unit = 'f') {
    if (unit === 'f') {
        return ((temp * 9) / 5) - 459.67
    }
}

function Weather({ weatherInfo, cityName }) {
    if (!weatherInfo) {
        return null
    }
    return (
        <>
            <h2>Weather in {cityName}</h2>
            <p>Temperature {convertKelvin(weatherInfo.main.temp).toFixed(2)}° Fahrenheit</p>
            <img src={getWeatherIconUrl(weatherInfo.weather[0].icon)} alt={weatherInfo.weather[0].description} />
            <p>Wind {weatherInfo.wind.speed} m/s</p>
        </>
    )
}
