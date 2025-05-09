import { FC } from 'react';

import { Button } from '../Button/Button';

import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

interface VoiceButtonProps {
  handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
  handleVoiceReadingClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const VoiceButton: FC<VoiceButtonProps> = ({
  handleFocus,
  handleVoiceReadingClick,
  children,
  className = '',
}) => {
  return (
    <Button
      title="Увімкнути голосове читання сайту"
      aria-label="Увімкнути голосове читання"
      className={className}
      type="button"
      role="button"
      onClick={handleVoiceReadingClick}
      onFocus={handleFocus}
    >
      {children}
      <RecordVoiceOverIcon />
    </Button>
  );
};
