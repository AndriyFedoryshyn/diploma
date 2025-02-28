import { styled } from '@mui/system';

import { blue, grey } from '@mui/material/colors';

export const PopupBody = styled('div')(
  ({ theme }) => `
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: 1rem;
    width: max-content;
    padding: 12px 8px;
    margin-block-start: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-weight: 500;
    font-size: 0.875rem;
    z-index: 1;
  `
);

export const Button = styled('button')(
  ({ theme }) => `
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[500]};
    box-shadow: 0 2px 4px ${
      theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.5)'
        : 'rgba(0, 127, 255, 0.5)'
    }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &:active {
      background-color: ${blue[700]};
      box-shadow: none;
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === 'dark' ? blue[300] : blue[200]
      };
      outline: none;
    }
  
    &.disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
  
      &:hover {
        background-color: ${blue[500]};
      }
    }
  `
);
