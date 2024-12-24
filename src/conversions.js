// src/conversions.js

// Helper functions used in multiple conversions
function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }
  
  function celsiusToKelvin(c) {
    return c + 273.15;
  }
  
  function kelvinToCelsius(k) {
    return k - 273.15;
  }
  
  function metersToFeet(m) {
    return m * 3.28084;
  }
  
  function feetToMeters(ft) {
    return ft * 0.3048;
  }
  
  // Simple currency placeholder (static rate, real apps should fetch live rates)
  const USD_TO_EUR = 0.9;
  
  // Example binary/decimal conversions
  function decimalToBinary(dec) {
    if (isNaN(dec)) return "";
    return Number(dec).toString(2);
  }
  
  function binaryToDecimal(bin) {
    if (!/^[01]+$/.test(bin)) return "";
    return parseInt(bin, 2);
  }
  
  // Simple date conversion placeholder (Julian to Gregorian is complex)
  function julianToGregorian(julianDay) {
    // This is a simplified placeholder.
    // Real conversion is more complex.
    const JD_UNIX_OFFSET = 2440587.5; 
    const unixTime = (julianDay - JD_UNIX_OFFSET) * 86400000;
    const date = new Date(unixTime);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  }
  
  export const conversionCategories = [
    {
      category: "Fraction and Decimal",
      conversions: [
        {
          name: "Fraction to Decimal",
          inputs: [
            { label: "Numerator", type: "number", key: "numerator" },
            { label: "Denominator", type: "number", key: "denominator" },
          ],
          convert: ({ numerator, denominator }) => {
            if (!denominator || denominator === 0) return { decimal: "" };
            return { decimal: (numerator / denominator).toFixed(4) };
          },
          outputs: [
            { label: "Decimal", key: "decimal" }
          ]
        },
        {
          name: "Decimal to Fraction",
          inputs: [
            { label: "Decimal", type: "number", step: "any", key: "decimalVal" }
          ],
          convert: ({ decimalVal }) => {
            if (!decimalVal || isNaN(decimalVal)) return { fraction: "" };
            const str = decimalVal.toString();
            if (!str.includes(".")) return { fraction: `${str}/1` };
  
            const decimalPlaces = str.split(".")[1].length;
            const denominator = Math.pow(10, decimalPlaces);
            const numerator = Math.round(Number(decimalVal) * denominator);
  
            const g = gcd(numerator, denominator);
            return { fraction: `${numerator/g}/${denominator/g}` };
          },
          outputs: [
            { label: "Fraction", key: "fraction" }
          ]
        }
      ]
    },
    {
      category: "Length/Distance",
      conversions: [
        {
          name: "Meters to Kilometers",
          inputs: [{ label: "Meters", type: "number", key: "meters" }],
          convert: ({ meters }) => {
            if (!meters) return { kilometers: "" };
            return { kilometers: (meters / 1000).toFixed(6) };
          },
          outputs: [{ label: "Kilometers", key: "kilometers" }]
        },
        {
          name: "Miles to Kilometers",
          inputs: [{ label: "Miles", type: "number", key: "miles" }],
          convert: ({ miles }) => {
            if (!miles) return { kilometers: "" };
            return { kilometers: (miles * 1.60934).toFixed(6) };
          },
          outputs: [{ label: "Kilometers", key: "kilometers" }]
        },
        {
          name: "Meters to Feet",
          inputs: [{ label: "Meters", type: "number", key: "m" }],
          convert: ({ m }) => {
            if (!m) return { feet: "" };
            return { feet: metersToFeet(m).toFixed(4) };
          },
          outputs: [{ label: "Feet", key: "feet" }]
        },
        {
          name: "Feet to Meters",
          inputs: [{ label: "Feet", type: "number", key: "ft" }],
          convert: ({ ft }) => {
            if (!ft) return { meters: "" };
            return { meters: feetToMeters(ft).toFixed(4) };
          },
          outputs: [{ label: "Meters", key: "meters" }]
        }
      ]
    },
    {
      category: "Weight/Mass",
      conversions: [
        {
          name: "Kilograms to Pounds",
          inputs: [{ label: "Kilograms", type: "number", key: "kg" }],
          convert: ({ kg }) => {
            if (!kg) return { pounds: "" };
            return { pounds: (kg * 2.20462).toFixed(4) };
          },
          outputs: [{ label: "Pounds", key: "pounds" }]
        },
        {
          name: "Pounds to Kilograms",
          inputs: [{ label: "Pounds", type: "number", key: "lb" }],
          convert: ({ lb }) => {
            if (!lb) return { kilograms: "" };
            return { kilograms: (lb * 0.453592).toFixed(4) };
          },
          outputs: [{ label: "Kilograms", key: "kilograms" }]
        }
      ]
    },
    {
      category: "Volume",
      conversions: [
        {
          name: "Liters to Milliliters",
          inputs: [{ label: "Liters", type: "number", key: "L" }],
          convert: ({ L }) => {
            if (!L) return { mL: "" };
            return { mL: (L * 1000).toFixed(2) };
          },
          outputs: [{ label: "Milliliters", key: "mL" }]
        },
        {
          name: "Gallons to Liters",
          inputs: [{ label: "Gallons", type: "number", key: "gal" }],
          convert: ({ gal }) => {
            if (!gal) return { liters: "" };
            return { liters: (gal * 3.78541).toFixed(4) };
          },
          outputs: [{ label: "Liters", key: "liters" }]
        }
      ]
    },
    {
      category: "Area",
      conversions: [
        {
          name: "Square Meters to Square Feet",
          inputs: [{ label: "Square Meters", type: "number", key: "sqm" }],
          convert: ({ sqm }) => {
            if (!sqm) return { sqft: "" };
            return { sqft: (sqm * 10.7639).toFixed(4) };
          },
          outputs: [{ label: "Square Feet", key: "sqft" }]
        }
      ]
    },
    {
      category: "Speed",
      conversions: [
        {
          name: "m/s to km/h",
          inputs: [{ label: "m/s", type: "number", key: "ms" }],
          convert: ({ ms }) => {
            if (!ms) return { kmh: "" };
            return { kmh: (ms * 3.6).toFixed(2) };
          },
          outputs: [{ label: "km/h", key: "kmh" }]
        },
        {
          name: "Miles per hour to m/s",
          inputs: [{ label: "mph", type: "number", key: "mph" }],
          convert: ({ mph }) => {
            if (!mph) return { ms: "" };
            return { ms: (mph * 0.44704).toFixed(4) };
          },
          outputs: [{ label: "m/s", key: "ms" }]
        }
      ]
    },
    {
      category: "Temperature",
      conversions: [
        {
          name: "Celsius to Fahrenheit",
          inputs: [{ label: "Celsius", type: "number", key: "celsius" }],
          convert: ({ celsius }) => {
            if (celsius === "" || celsius === undefined) return { fahrenheit: "" };
            return { fahrenheit: ((celsius * 9/5) + 32).toFixed(2) };
          },
          outputs: [{ label: "Fahrenheit", key: "fahrenheit" }]
        },
        {
          name: "Fahrenheit to Celsius",
          inputs: [{ label: "Fahrenheit", type: "number", key: "fahrenheit" }],
          convert: ({ fahrenheit }) => {
            if (fahrenheit === "" || fahrenheit === undefined) return { celsius: "" };
            return { celsius: ((fahrenheit - 32) * 5/9).toFixed(2) };
          },
          outputs: [{ label: "Celsius", key: "celsius" }]
        },
        {
          name: "Celsius to Kelvin",
          inputs: [{ label: "Celsius", type: "number", key: "c" }],
          convert: ({ c }) => {
            if (c === "" || c === undefined) return { kelvin: "" };
            return { kelvin: celsiusToKelvin(Number(c)).toFixed(2) };
          },
          outputs: [{ label: "Kelvin", key: "kelvin" }]
        },
        {
          name: "Kelvin to Celsius",
          inputs: [{ label: "Kelvin", type: "number", key: "k" }],
          convert: ({ k }) => {
            if (k === "" || k === undefined) return { celsius: "" };
            return { celsius: kelvinToCelsius(Number(k)).toFixed(2) };
          },
          outputs: [{ label: "Celsius", key: "celsius" }]
        }
      ]
    },
    {
      category: "Time",
      conversions: [
        {
          name: "Seconds to Minutes",
          inputs: [{ label: "Seconds", type: "number", key: "sec" }],
          convert: ({ sec }) => {
            if (!sec) return { minutes: "" };
            return { minutes: (sec / 60).toFixed(4) };
          },
          outputs: [{ label: "Minutes", key: "minutes" }]
        },
        {
          name: "Hours to Seconds",
          inputs: [{ label: "Hours", type: "number", key: "hrs" }],
          convert: ({ hrs }) => {
            if (!hrs) return { seconds: "" };
            return { seconds: (hrs * 3600).toFixed(0) };
          },
          outputs: [{ label: "Seconds", key: "seconds" }]
        }
      ]
    },
    {
      category: "Energy",
      conversions: [
        {
          name: "Joules to Calories (approx)",
          inputs: [{ label: "Joules", type: "number", key: "J" }],
          convert: ({ J }) => {
            if (!J) return { cal: "" };
            return { cal: (J / 4.184).toFixed(4) };
          },
          outputs: [{ label: "Calories", key: "cal" }]
        }
      ]
    },
    {
      category: "Pressure",
      conversions: [
        {
          name: "Pascals to psi",
          inputs: [{ label: "Pascals", type: "number", key: "Pa" }],
          convert: ({ Pa }) => {
            if (!Pa) return { psi: "" };
            return { psi: (Pa * 0.000145038).toFixed(6) };
          },
          outputs: [{ label: "psi", key: "psi" }]
        }
      ]
    },
    {
      category: "Power",
      conversions: [
        {
          name: "Watts to Horsepower",
          inputs: [{ label: "Watts", type: "number", key: "W" }],
          convert: ({ W }) => {
            if (!W) return { hp: "" };
            return { hp: (W / 745.7).toFixed(4) };
          },
          outputs: [{ label: "Horsepower", key: "hp" }]
        }
      ]
    },
    {
      category: "Angles",
      conversions: [
        {
          name: "Degrees to Radians",
          inputs: [{ label: "Degrees", type: "number", key: "deg" }],
          convert: ({ deg }) => {
            if (!deg) return { radians: "" };
            return { radians: ((deg * Math.PI) / 180).toFixed(6) };
          },
          outputs: [{ label: "Radians", key: "radians" }]
        }
      ]
    },
    {
      category: "Currency (Static Rate Example)",
      conversions: [
        {
          name: "USD to EUR (static rate)",
          inputs: [{ label: "USD", type: "number", key: "usd" }],
          convert: ({ usd }) => {
            if (!usd) return { eur: "" };
            return { eur: (usd * USD_TO_EUR).toFixed(2) };
          },
          outputs: [{ label: "EUR", key: "eur" }]
        }
      ]
    },
    {
      category: "Base Conversions",
      conversions: [
        {
          name: "Decimal to Binary",
          inputs: [{ label: "Decimal", type: "number", key: "dec" }],
          convert: ({ dec }) => {
            if (dec === "" || dec === undefined) return { binary: "" };
            return { binary: decimalToBinary(dec) };
          },
          outputs: [{ label: "Binary", key: "binary" }]
        },
        {
          name: "Binary to Decimal",
          inputs: [{ label: "Binary", type: "text", key: "bin" }],
          convert: ({ bin }) => {
            if (!bin) return { decimal: "" };
            return { decimal: binaryToDecimal(bin) };
          },
          outputs: [{ label: "Decimal", key: "decimal" }]
        }
      ]
    },
    {
      category: "Data Storage",
      conversions: [
        {
          name: "Bytes to Kilobytes",
          inputs: [{ label: "Bytes", type: "number", key: "bytes" }],
          convert: ({ bytes }) => {
            if (!bytes) return { kb: "" };
            return { kb: (bytes / 1024).toFixed(4) };
          },
          outputs: [{ label: "Kilobytes", key: "kb" }]
        }
      ]
    },
    {
      category: "Geographical Conversions (Example)",
      conversions: [
        {
          name: "Julian Date to Gregorian",
          inputs: [{ label: "Julian Day", type: "number", key: "jd" }],
          convert: ({ jd }) => {
            if (!jd) return { date: "" };
            return { date: julianToGregorian(Number(jd)) };
          },
          outputs: [{ label: "Gregorian Date (approx)", key: "date" }]
        }
      ]
    },
    {
      category: "Trigonometric Conversions",
      conversions: [
        {
          name: "Degrees to Radians (already above), Sin of angle",
          inputs: [{ label: "Degrees", type: "number", key: "deg" }],
          convert: ({ deg }) => {
            if (!deg && deg !== 0) return { sin: "" };
            const rad = (deg * Math.PI) / 180;
            return { sin: Math.sin(rad).toFixed(6) };
          },
          outputs: [{ label: "Sin(angle)", key: "sin" }]
        }
      ]
    },
    {
      category: "Miscellaneous",
      conversions: [
        {
          name: "RGB to HEX",
          inputs: [
            { label: "Red (0-255)", type: "number", key: "r" },
            { label: "Green (0-255)", type: "number", key: "g" },
            { label: "Blue (0-255)", type: "number", key: "b" }
          ],
          convert: ({ r, g, b }) => {
            if (r === "" || g === "" || b === "" || r === undefined || g === undefined || b === undefined) return { hex: "" };
            function toHex(val) {
              const h = Number(val).toString(16);
              return h.length === 1 ? "0" + h : h;
            }
            const R = toHex(r);
            const G = toHex(g);
            const B = toHex(b);
            return { hex: `#${R}${G}${B}` };
          },
          outputs: [{ label: "HEX", key: "hex" }]
        }
      ]
    }
  ];
  