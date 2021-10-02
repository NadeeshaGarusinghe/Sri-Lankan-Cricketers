import React, { useEffect, useState } from "react";
import Cricketer from './cricketer';
import './App.css';

function App() {

  const [cricketers, setCricketers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCricketers();
  }, []);

  const getCricketers = async () => {
    const response = await fetch(`http://localhost:9200/srilankancricketers/_search`);
    const data = await response.json();
    setCricketers(data.hits.hits);
    console.log(data.hits.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="cricketers">
        {cricketers.map(cricketer => (
          <Cricketer
            key={cricketer._source.සම්පූර්ණ_නම}
            full_name={cricketer._source.සම්පූර්ණ_නම}
            image={cricketer._source.ඡායා_රූප}
            birth={cricketer._source.උපන්_ගම_සහ_වර්ෂය}
            age={cricketer._source.වයස} school={cricketer._source.පාසල}
            batting_style={cricketer._source.පිතිකරන_විලාසය}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
