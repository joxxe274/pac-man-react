import { useEffect } from 'react';

interface Props {
  callback: (key: string) => void;
  keys: string[];
}

export const useKeyDown = ({ callback, keys }: Props) => {
  const onKeyDown = (event: KeyboardEvent) => {
    const wasAnyKeyPressed = keys.some((key) => {
      console.log(event.key)
      return key === event.key;
    });
    if (wasAnyKeyPressed) {
      event.preventDefault();
      callback(event.key);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};