import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme();
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);