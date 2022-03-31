import React from "react";

function Dog({dog, onGoodBad}) {
  function handleGoodBad() {
    fetch(`http://localhost:3001/pups/${dog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isGoodDog: !dog.isGoodDog})
    })
      .then((r) => r.json())
      .then((updatedDog) => {
        onGoodBad(updatedDog);
      });
  }

  return (
    <>
    <img src={dog.image} alt={dog.name} />
    <h2>{dog.name}</h2>
    <button onClick={handleGoodBad}>
      {dog.isGoodDog ? 'Bad Dog!' : 'Good Dog!'}
    </button>
    </>
  )
}

export default Dog;