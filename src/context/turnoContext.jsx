import React, { createContext, useState } from 'react';

export const TurnoContext = createContext();

export const TurnoProvider = ({ children }) => {
  const [turnoData, setTurnoData] = useState({
    turno: {
      Fecha: '',
      Horario: '',
      CodEstado: 1,
      CodTipAtencion: 1,
    },
    MedPersonal: {
      CodMedPersonal: 0,
      Nombre: '',
      Apellido:''
    },
    paciente: {
      Nombre: '',
      Apellido: '',
      Documento: '',
      Domicilio: '',
      Telefono: '',
      Mail: '',
      FechaNacimiento: '',
      Sexo: '',
      Edad: '',
      ObraSocial: ''
    }
  });

  const [horarios, setHorarios] = useState({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: []
  });

  const actualizarHorarios = (fecha, horario) => {
    const dia = new Date(fecha).toLocaleString('es-ES', { weekday: 'long' }).toLowerCase();
    setHorarios((prevHorarios) => ({
      ...prevHorarios,
      [dia]: prevHorarios[dia].filter((h) => h !== horario)
    }));
  };

  return (
    <TurnoContext.Provider value={{ turnoData, setTurnoData, horarios, setHorarios, actualizarHorarios }}>
      {children}
    </TurnoContext.Provider>
  );
};
