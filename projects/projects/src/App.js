import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainRoutes from './routes/Routes';
import { MenuProvider } from './shared/MenuContext'; // Importez MenuProvider
import { TransportProvider } from './shared/TransportContext'; // Importez TransportProvider

function App() {
  return (
    <MenuProvider>
      <TransportProvider> {/* Enveloppez votre application avec TransportProvider */}
        <MainRoutes />
      </TransportProvider>
    </MenuProvider>
  );
}

export default App;
