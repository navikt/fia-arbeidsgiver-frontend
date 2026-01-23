import React from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): {
  storedValue: T | undefined;
  setValue: (value: T) => void;
  clearValue: () => void;
} {
  const [storedValue, setStoredValue] = React.useState<T | undefined>(
    initialValue,
  );

  React.useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key]);

  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const clearValue = () => window.localStorage.removeItem(key);

  return { storedValue, setValue, clearValue };
}
