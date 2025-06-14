import { FC, useEffect } from 'react';

type Props = {
  onKeyPress?: () => void;
};
export const CommandMenuKeydown: FC<Props> = ({ onKeyPress }) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'x' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onKeyPress?.();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onKeyPress]);

  return null;
};
