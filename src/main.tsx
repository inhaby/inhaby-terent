import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import RootRouter from './router/RootRouter.tsx';
import './index.css';
import { ThemeProvider } from './landing/context/ThemeContext';
import { GoogleMapsProvider } from './components/googleMaps/GoogleMapsProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleMapsProvider>
      <ThemeProvider>
        <RootRouter />
      </ThemeProvider>
    </GoogleMapsProvider>
  </StrictMode>,
);
