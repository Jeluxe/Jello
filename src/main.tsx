// External libraries
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Components and contexts
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { SidebarProvider } from './context/SidebarContext';

// Pages and routes
import { About, Contact, Login, Profile, Project, Projects, Signup, Welcome } from './pages';
import ProtectedRoute from './routes/protectedRoute';

// Extensions and styles
import './extensions';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<AuthProvider><App /></AuthProvider>}>
      <Route index element={<Welcome />} />
      <Route path='my-projects' element={<ProtectedRoute><Projects /></ProtectedRoute>} />

      <Route path='my-projects/:id' element={
        <ProtectedRoute>
          <ProjectProvider>
            <SidebarProvider>
              <Project />
            </SidebarProvider>
          </ProjectProvider>
        </ProtectedRoute>
      } />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='login' element={<Login />} />
      <Route path='sign-up' element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
