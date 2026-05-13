export function Countries({ searchTerm, countries, handleShowCountry }) {
    if (!searchTerm) {
        return null
    }
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
        return filteredCountries.map(c => <li key={c.name.common}>{c.name.common} <button onClick={() => handleShowCountry(c.name.common)}>Show</button></li>)
    } else if (filteredCountries.length === 1) {
        const c = filteredCountries[0]
        return <Country country={c} />
    } else {
        return null
    }
}

function Country({ country }) {
    return <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.entries(country.languages).map(([k, v]) => <li key={k}>{v}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
    </>
}