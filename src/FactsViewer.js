import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SavedFacts from './SavedFacts';

function App() {
  const [language, setLanguage] = useState('en');
  const [fact, setFact] = useState('');
  const [mode, setMode] = useState('random');
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); 
  const [factBasket, setFactBasket] = useState([]);
  const [savedFacts, setSavedFacts] = useState(() => {
    return localStorage.getItem('savedFacts') ? JSON.parse(localStorage.getItem('savedFacts')) : [];
  });

  useEffect(() => {
    if (userInteracted) { 
      const fetchFact = async () => {
        const baseURL = `https://uselessfacts.jsph.pl/${mode}.json?language=${language}`;
        try {
          const response = await axios.get(baseURL);
          setFact(response.data.text);
          setFactBasket(prevBasket => [...prevBasket, response.data.text]);
        } catch (error) {
          console.error('Error fetching fact:', error);
        }
      };
      fetchFact();
    }
  }, [language, mode, fetchTrigger, userInteracted]);

  const handleUserInteraction = (newMode) => {
    setUserInteracted(true); 
    setMode(newMode);
    setFetchTrigger(f => !f);
  };

  const saveFactToSaved = () => {
    const newSavedFacts = [...savedFacts, ...factBasket];
    setSavedFacts(newSavedFacts);
    setFactBasket([]);
    localStorage.setItem('savedFacts', JSON.stringify(newSavedFacts));
  };

  return (
    <div className="App">
        <img src="teklifimgelsin_logo.png" alt="TeklifimGelsin Logo" className="logo" />
      <div className="controls">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="de">German</option>
        </select>
        <button onClick={() => handleUserInteraction('random')}>Random</button>
        <button onClick={() => handleUserInteraction('today')}>Fact of the Day</button>
        <button onClick={saveFactToSaved}>Save Facts from Basket</button>
      </div>
      <div className="fact">{fact || 'Choose Fact Type'}</div>
      <SavedFacts savedFacts={savedFacts} setSavedFacts={setSavedFacts} factBasket={factBasket} setFactBasket={setFactBasket} />
    </div>
  );
}

export default App;
