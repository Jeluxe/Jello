import { Outlet, useMatch } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import { useAuthProvider } from './context/AuthContext';

function App() {
  const match = useMatch("/my-projects/:id")
  const { loading } = useAuthProvider();

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className='app'>
      {!match && <Navbar />}
      <Outlet />
    </div>
  )
}

export default App
