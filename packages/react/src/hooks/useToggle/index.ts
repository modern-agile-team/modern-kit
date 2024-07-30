import { useCallback, useState } from 'react';

export function useToggle(defaultValue = false) {
  const [boolean, setBoolean] = useState(defaultValue);

  const toggle = useCallback(() => {
    setBoolean((prevBoolean) => !prevBoolean);
  }, []);

  return [boolean, toggle] as const;
}
