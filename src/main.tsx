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
import './extensions/toCapitalize';
import './index.css';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import ProtectedRoute from './routes/protectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<AuthProvider><App /></AuthProvider>}>
      <Route path='' element={<Welcome />} />
      <Route path='my-projects' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path='my-projects/:id' element={<ProjectProvider><Project /></ProjectProvider>} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='login' element={<Login />} />
      <Route path='sign-up' element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
