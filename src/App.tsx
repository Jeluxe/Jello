import { Outlet } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import { useAuthProvider } from './context/AuthContext';

function App() {
  const { loading } = useAuthProvider();

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className='app'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
