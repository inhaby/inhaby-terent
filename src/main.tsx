import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import RootRouter from './router/RootRouter.tsx';
import './index.css';
import { ThemeProvider } from './landing/context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RootRouter />
    </ThemeProvider>
  </StrictMode>,
);
