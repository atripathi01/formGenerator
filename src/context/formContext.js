import { createContext, useEffect, useState } from 'react';

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [forms, setForms] = useState(
    JSON.parse(localStorage.getItem('forms')) || null
  );
  useEffect(() => {
    localStorage.setItem('forms', JSON.stringify(forms));
  }, [forms]);

  return (
    <FormContext.Provider value={{ forms, setForms }}>
      {children}
    </FormContext.Provider>
  );
};
