import React, {useState, useEffect} from "react";
import Dog from "./Dog";

function App() {
  const [dogs, setDogs] = useState([]);
  const [goodFilter, changeGood] = useState(false);
  const [currentDog, changeDog] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/pups')
      .then((r) => r.json())
      .then((theDogs) => {
        setDogs(theDogs);
        changeDog(theDogs[0]);
      });
  }, []);

  const dogList = dogs.filter((dog) => {
    return goodFilter ? dog.isGoodDog : true;
  })
    .map((dog) => (
      <span
        key={dog.id}
        onClick={() => changeDog(dog)}
      >
        {dog.name}
      </span>
    ));

  function handleGoodBad(updatedDog) {
    const updatedList = dogs.map((dog) => {
      return dog.id === updatedDog.id ? updatedDog : dog;
    });
    setDogs(updatedList);
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={() => changeGood(!goodFilter)} id="good-dog-filter">
          Filter good dogs: {goodFilter ? 'ON': 'OFF'}
        </button>
      </div>
      <div id="dog-bar">{dogList}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {
            currentDog ?
              <Dog dog={currentDog} onGoodBad={handleGoodBad} />
              :
              null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
