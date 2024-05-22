import React from 'react';
import Formulario from './components/Formulario';
import './App.css'; // Importa el archivo de estilos CSS

const App = () => {
  return (
    <div style={{ 
      textAlign: 'center',
      
     }}
    > {/* Agrega la clase CSS aquí */}
      <h1 style={{ color: 'white' }}>PRUEBA TECNICA REACT CON MATERIAL-UI</h1>
      <Formulario />
    </div>
  );
};

export default App;