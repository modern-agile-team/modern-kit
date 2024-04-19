import { useCallback, useState } from 'react';

export const useToggle = (defaultValue = false) => {
  const [boolean, setBoolean] = useState(defaultValue);

  const toggle = useCallback(() => {
    setBoolean((prevBoolean) => !prevBoolean);
  }, []);

  return [boolean, toggle] as const;
};
