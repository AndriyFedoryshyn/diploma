import { type FC } from 'react';

import { Button } from '../Button/Button';

import VisibilityIcon from '@mui/icons-material/Visibility';

interface VisibleButtonProps {
  handleRestoreTheme: () => void;
  handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
  className?: string;
}

export const VisibleButton: FC<VisibleButtonProps> = ({
  handleFocus,
  handleRestoreTheme,
  className = '',
}) => {
  return (
    <Button
      onFocus={handleFocus}
      onClick={handleRestoreTheme}
      tabIndex={0}
      className={className}
      aria-label="Toggle site visibility"
    >
      Звичайна версія сайту <VisibilityIcon />
    </Button>
  );
};
