import { useEffect, useState } from "react";
import { getAllCountries } from "./services/countries";
import { Countries } from "./components/Countries";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAllCountries().then(resp => {
      setCountries(resp)
    })
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <p>
        find countries{" "}
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
        ></input>
      </p>
      <Countries searchTerm={searchTerm} countries={countries} />
    </>
  );
}

export default App;
