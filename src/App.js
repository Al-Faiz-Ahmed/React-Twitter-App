import React from 'react';
import './App.css';
import ReactRoutes from './config/routes';
import ContextProvider from './context/context';

const App = () => (
        <ContextProvider>
                <ReactRoutes />
        </ContextProvider>

)

export default App;
