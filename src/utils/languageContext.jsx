/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import terms from "./terms.json";
export const LanguageContext = React.createContext();

export const LanguageProvider = (props) => {
  const [current, setCurrent] = useState("ar");

  const termReturner = (t) => {
    // return terms.current.t;
    if (current == "ar") {
      return terms.ar[t];
    } else if (current == "en") {
      return terms.en[t];
    }
  };

  const toggleLanguage = (l) => {
    setCurrent(l);
    console.log("language: ", l);
  };

  const currentReturner = () => {
    return current;
  };

  return (
    <LanguageContext.Provider
      value={{
        termReturner,
        toggleLanguage,
        currentReturner,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
