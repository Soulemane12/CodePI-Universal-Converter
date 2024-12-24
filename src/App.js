// src/App.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Tooltip } from 'react-tooltip';
import './App.css';
import { conversionCategories } from './conversions';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [results, setResults] = useState({});

  const resultAnimProps = useSpring({
    opacity: Object.keys(results).length > 0 ? 1 : 0,
    transform: Object.keys(results).length > 0 ? 'translateY(0px)' : 'translateY(-20px)',
    config: { tension: 170, friction: 20 },
  });

  const handleCategoryChange = (e) => {
    const cat = conversionCategories.find(c => c.category === e.target.value);
    setSelectedCategory(cat || null);
    setSelectedConversion(null);
    setInputValues({});
    setResults({});
  };

  const handleConversionChange = (e) => {
    const conv = selectedCategory.conversions.find(conv => conv.name === e.target.value);
    setSelectedConversion(conv || null);
    setInputValues({});
    setResults({});
  };

  const handleInputChange = (key, value) => {
    const newValues = { ...inputValues, [key]: value };
    setInputValues(newValues);
    if (selectedConversion && selectedConversion.convert) {
      const res = selectedConversion.convert(newValues);
      setResults(res);
    }
  };

  return (
    <div className="App">
      <h1>CodePI Universal Converter</h1>

      <section className="converter-section">
        {/* Category Selection */}
        <div className="converter-box">
          <h2>Select Category</h2>
          <select
            className="custom-select" // Changed to shared class
            onChange={handleCategoryChange}
            value={selectedCategory?.category || ''}
          >
            <option value="">-- Choose a Category --</option>
            {conversionCategories.map((cat) => (
              <option key={cat.category} value={cat.category}>{cat.category}</option>
            ))}
          </select>
        </div>

        {/* Conversion Selection */}
        {selectedCategory && (
          <div className="converter-box">
            <h2>Select Conversion</h2>
            <select
              className="custom-select" // Added shared class
              onChange={handleConversionChange}
              value={selectedConversion?.name || ''}
            >
              <option value="">-- Choose a Conversion --</option>
              {selectedCategory.conversions.map(conv => (
                <option key={conv.name} value={conv.name}>{conv.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Input Fields */}
        {selectedConversion && (
          <div className="converter-box">
            <h2>Inputs</h2>
            <div className="input-row multiple-inputs">
              {selectedConversion.inputs.map((inp) => (
                <div key={inp.key} className="input-group">
                  <label>{inp.label}</label>
                  <input
                    type={inp.type}
                    step={inp.step || '1'}
                    value={inputValues[inp.key] || ''}
                    onChange={(e) => handleInputChange(inp.key, e.target.value)}
                    placeholder={inp.label}
                  />
                </div>
              ))}
            </div>

            {/* Results Display */}
            <animated.div style={resultAnimProps} className="result-display">
              {selectedConversion.outputs.map((out) => (
                <p key={out.key}>
                  {out.label}: {results[out.key] !== undefined ? results[out.key] : ''}
                </p>
              ))}
            </animated.div>
          </div>
        )}
      </section>

      {/* General Tooltip */}
      <p className="explanation" data-tooltip-id="generalTip">
        Need help understanding conversions?
      </p>
      <Tooltip id="generalTip" place="bottom" className="custom-tooltip">
        <p>Select a category and a conversion.</p>
        <p>Enter values and see automatic results.</p>
      </Tooltip>

      <section className="real-life-examples">
        <h2>Real-Life Examples:</h2>
        <ul>
          <li><strong>Distance:</strong> Convert your running distance from miles to kilometers.</li>
          <li><strong>Temperature:</strong> Check weather forecasts in Celsius and Fahrenheit.</li>
          <li><strong>Fractions:</strong> Convert fractions to decimals for recipes.</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
