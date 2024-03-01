import { useEffect, useState } from 'react'
import { Logout, getToken } from './api';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import DefaultPage from './DefaultPage';
import ResultVote from './componen/ResultVote';
import CandidatePage from './CandidatePage';
import Layout from './Layout';
import Vote from './componen/Vote';

function App() {
  const [token,setToken] = useState(getToken());
  const [isAdmin,setIsAdmin] = useState(localStorage.getItem('admin'));

  const handleLoginSuccces = (tokens) => {
   return setToken(tokens)
  }

  const handleIsAdmin = (value) => {
    return setIsAdmin(value)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin')
    return setIsAdmin(false);
  }

  const Logouts = async () => {
    const Log = await Logout()
    if(Log.status === 200){
      alert(Log.data.message)
      setToken(null)
      localStorage.removeItem('accesToken')
    }else{
      alert(Log.data.message)
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem('accesToken'));
  },[])
  return (
    <>
     <BrowserRouter>
        <Routes>
        {isAdmin ? <Route path='/admin' element={<CandidatePage onLogout={handleLogout}/>}/> : null}
        {token !== null ? <Route element={<Layout onLogout={Logouts}/>}>
          <Route path='/login' element={<Navigate to={"/vote"}/>}/>
          <Route path='/vote' element={<Vote/>}/>
          <Route path='/result' element={<ResultVote/>}/>
        </Route>
        : 
        <Route element={<DefaultPage/>}>
          <Route path='/login' element={<Login isAdmin={handleIsAdmin} onLoginSucces={handleLoginSuccces}/>}/>
          <Route path='/resultVote' element={<ResultVote/>}/>
        </Route>}

        <Route path='*' element={<Navigate to={'/login'}/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
