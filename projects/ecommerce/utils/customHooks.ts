import { useEffect, useState } from "react";

export const useWindowSize = () => {
  // Definimos un estado para almacenar las dimensiones de la ventana
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  return windowSize;
};

function getStorageValue(key:string, defaultValue:string) {
  // getting stored value
  const saved = localStorage.getItem(key)||'';
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key:string, defaultValue:string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};