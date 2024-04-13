import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import './index.css';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<AuthProvider><App /></AuthProvider>}>
      <Route path='' element={<Welcome />} />
      <Route path='my-projects' element={<Projects />} />
      <Route path='my-projects/:id' element={<ProjectProvider><Project /></ProjectProvider>} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='profile' element={<Profile />} />
      <Route path='login' element={<Login />} />
      <Route path='sign-up' element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
