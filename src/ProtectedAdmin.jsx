import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/authContext"

function ProtectedAdmin() {
  const {user, isAuthenticated,loading} = useAuth()  
  if(loading)return<h1>cargando...</h1>
  if (!loading && !isAuthenticated) {
    console.log("rompio el primero")
    return <Navigate to='/login' replace />;
  }  
  if( user.role !== 'Administrativo'){
    console.log("rompio el segundo")
    return <Navigate to='/login' replace />;
  }
  console.log("paso")
  return <Outlet/>
}

export default ProtectedAdmin