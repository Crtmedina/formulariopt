import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import formData from '../../form.data';
import Swal from 'sweetalert2';

const Formulario = () => {
  const [formDataValues, setFormDataValues] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDataValues({ ...formDataValues, [name]: value });
  };

  const handleSubmit = () => {
    // Validar si hay campos vacíos
    const emptyFields = formData.filter(field => field.isRequired && !formDataValues[field.name]);
    if (emptyFields.length > 0) {
      // Mostrar mensaje de alerta si hay campos vacíos
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: `Por favor complete los siguientes campos: ${emptyFields.map(field => field.label).join(', ')}`,
      });
    } else if (!validateName(formDataValues.nombres)) {
      // Mostrar mensaje de alerta si el nombre no es válido
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Por favor ingrese un nombre válido',
      });
    } else if (!validateName(formDataValues.apellidos)) {
      // Mostrar mensaje de alerta si el apellido no es válido
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Por favor ingrese un apellido válido',
      });
    } else if (!validateEmail(formDataValues.email)) {
      // Mostrar mensaje de alerta si el correo electrónico no es válido
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Por favor ingrese un correo electrónico válido',
      });
    } else {
      // Mostrar los datos ingresados en la consola
      console.log('Datos ingresados:', formDataValues);
      // Actualizar el mensaje de confirmación
      setConfirmationMessage('Datos ingresados correctamente');
      // Almacenar los datos ingresados en el estado
      setSubmittedData(formDataValues);
      // Mostrar mensaje de confirmación
      Swal.fire({
        icon: 'success',
        title: '¡Bien hecho!',
        text: 'Datos ingresados correctamente, ve a la consola para poder visualizarlos!',
      });
    }
  };

  // Función para validar nombres y apellidos
  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  // Función para validar correo electrónico
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <Box sx={{ 
        maxWidth: '500px',
        width: '50%', 
        margin: 'auto', 
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
    }}>
      <h1>Formulario de contacto</h1>
      <p>Escríbenos en breve y nos pondremos en contacto contigo</p>
      {formData.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          name={field.name}
          disabled={field.disabled}
          required={field.isRequired}
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleInputChange}
        />
      ))}
      <Button sx={{ marginTop: '20px' }} variant="contained" color="primary" onClick={handleSubmit}>
        Confirmar
      </Button>
      <p>{confirmationMessage}</p>
      {/* Mostrar datos ingresados */}
      {submittedData && (
        <Box sx={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
          <Typography variant="h5">Datos ingresados:</Typography>
          <Typography variant="body1">Nombres: {submittedData.nombres}</Typography>
          <Typography variant="body1">Apellidos: {submittedData.apellidos}</Typography>
          <Typography variant="body1">Email: {submittedData.email}</Typography>
          <Typography variant="body1">Descripción: {submittedData.descripcion}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Formulario;
