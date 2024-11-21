import React from "react";

export default function useLocalStorage<T>(key: string, initialValue?: T): [T | undefined, (value: T) => void] {
  const [storedValue, setStoredValue] = React.useState<T | undefined>(initialValue);

  React.useEffect(() => {
	const item = window.localStorage.getItem(key);
	if (item) {
	  setStoredValue(JSON.parse(item));
	}
  }, [key]);

  const setValue = (value: T) => {
	setStoredValue(value);
	window.localStorage.setItem(key, JSON.stringify(value));
  }

  return [storedValue, setValue];
};