// External libraries
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Components and Providers
import App from '../App';
import AuthProvider from '../context/AuthContext';
import ProjectProvider from '../context/ProjectContext';
import ThemeProvider from '../context/ThemeContext';

// Pages and routes
import { About, Contact, Login, Profile, Project, Projects, Signup, Welcome } from '../pages';
import ProtectedRoute from '../routes/protectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<AuthProvider><App /></AuthProvider>}>
      <Route index element={< Welcome />} />
      < Route path='my-projects' element={
        < ProtectedRoute >
          <ThemeProvider>
            <Projects />
          </ThemeProvider>
        </ProtectedRoute >
      } />
      < Route path='my-projects/:id' element={
        < ProtectedRoute >
          <ProjectProvider>
            <ThemeProvider>
              <Project />
            </ThemeProvider>
          </ProjectProvider>
        </ProtectedRoute>
      } />
      < Route path='contact' element={< Contact />} />
      < Route path='about' element={< About />} />
      < Route path='profile' element={< ProtectedRoute > <Profile /></ProtectedRoute >} />
      < Route path='login' element={< Login />} />
      < Route path='sign-up' element={< Signup />} />
    </Route>
  )
);

export default router;