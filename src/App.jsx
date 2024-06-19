import { Routes, Route } from 'react-router-dom';
import ClinicaSePrice from "./pages/home.jsx";
import NavbarComponent from "./components/navBar.jsx";
import FooterComponent from "./components/footer.jsx";
import TurnoComponent from './pages/solicitud-turno.jsx';
import LoginComponent from './pages/login.jsx';
import ConfirmacionTurno from './pages/confirmaTurno.jsx';
import AcreditacionPaciente from './pages/acreditacionPaciente.jsx';
import AdministracionInsumos from './pages/insumos.jsx';
import RegistroSimple from './pages/registroPaciente.jsx';
import HistoriaClinica from './pages/historiaClinica.jsx';
import { AuthProvider } from "./context/authContext.jsx";
import ProtectedAdmin from './ProtectedAdmin.jsx';
import ProtectedMedicoP from './ProtectedMedicoP.jsx';
import HorariosAtencion from './pages/agendaDoc.jsx';
import AgendaPacientes from './pages/agendaPacientes.jsx';
import { TurnoProvider } from './context/turnoContext.jsx';
import RegistroUsuario from './pages/registroUsuario.jsx'

function App() {
  return (
    <>
      <AuthProvider>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<ClinicaSePrice />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route 
            path='/turno' 
            element={
              <TurnoProvider>
                <TurnoComponent />
              </TurnoProvider>
            } 
          />
          <Route 
            path='/confirmacion' element={
              <TurnoProvider>
                <ConfirmacionTurno />
              </TurnoProvider>
            }/>
          <Route path='/registro' element={
            <TurnoProvider>
              <RegistroSimple />
            </TurnoProvider>} />
          <Route path='/HorariosAtencion' element={<HorariosAtencion />} />
          <Route element={<ProtectedMedicoP />}>
          <Route path='/AgendaPacientes' element={<AgendaPacientes />} />
            <Route path='/insumos' element={<AdministracionInsumos />} />
            <Route path='/historia' element={<HistoriaClinica />} />
          </Route>
          <Route element={<ProtectedAdmin />}>
            <Route path='/acreditacion' element={<AcreditacionPaciente />} />
            <Route path='/registroUsuario' element={<RegistroUsuario />} />
          </Route>
        </Routes>
        <FooterComponent />
      </AuthProvider>
    </>
  );
}

export default App;
