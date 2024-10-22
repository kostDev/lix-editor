import {useEffect} from "react";
import {useHotkeysStore} from "../stores/HotkeysStore.ts";

const useHotkeys = () => {
  const closeFile = useHotkeysStore(s => s.closeFile);

  const handleKeyDown = (e: KeyboardEvent) => {
     // Зупиняємо стандартну дію

    if(e.metaKey && e.key === 'f') {
      e.preventDefault();
      closeFile();
    }

    if (e.ctrlKey && e.key === 's') {
      // Ctrl + S
      // console.log('Збереження файлу');
    }

    if (e.altKey && e.key === 'x') {
      // Alt + X
      // console.log('Активована функція X');
    }

    if (e.metaKey && e.key === 'p') {
      // Command + P на Mac або Ctrl + P на Windows
      // console.log('Пошук файлу');
    }

  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

export default useHotkeys;