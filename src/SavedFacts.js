import React from 'react';

function SavedFacts({ savedFacts, setSavedFacts, factBasket, setFactBasket }) {
  const removeFactFromSaved = (index) => {
    const newSavedFacts = [...savedFacts.slice(0, index), ...savedFacts.slice(index + 1)];
    setSavedFacts(newSavedFacts);
    localStorage.setItem('savedFacts', JSON.stringify(newSavedFacts));
  };

  const removeFactFromBasket = (index) => {
    const newFactBasket = [...factBasket.slice(0, index), ...factBasket.slice(index + 1)];
    setFactBasket(newFactBasket);
  };

  return (
    <div className="savedFactsContainer">
      <h2>Fact Basket</h2>
      <div className="factBasket">
        {factBasket.map((fact, index) => (
          <div key={index} className="factItem">
            {fact}
            <div>
            <button onClick={() => removeFactFromBasket(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <h2>Saved Facts</h2>
      <div className="savedFacts">
        {savedFacts.map((fact, index) => (
          <div key={index} className="factItem">
            {fact}
            <button onClick={() => removeFactFromSaved(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedFacts;
