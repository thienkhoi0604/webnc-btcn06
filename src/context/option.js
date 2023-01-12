import React, { useState } from "react";
// import { initialState, AuthReducer } from "./reducer";

export const OptionsContext = React.createContext();

export function useOptionsState() {
  const context = React.useContext(OptionsContext);
  if (context === undefined) {
    throw new Error("useOptionsState must be used within a OptionsProvider");
  }

  return context;
}
const initialState = [
  {
    id_option: 0,
    id_slide: 0,
    value_option: "",
    vote: 0,
  },
];

export const OptionsProvider = ({ children }) => {
  const [dataOps, setDataOps] = useState(initialState);

  const setInitialValues = (array) => {
    setDataOps(array);
  };

  const updateOptions = (index) => (e) => {
    const newArray = dataOps.map((item, i) => {
      if (index === i) {
        return { ...item, value_option: e.target.value };
      } else {
        return item;
      }
    });
    setDataOps(newArray);
  };

  return (
    <OptionsContext.Provider
      value={{
        dataOptions: dataOps,
        setInitialValues: setInitialValues,
        onChange: updateOptions,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
