// Components and contexts
import { Button } from '..';
import { ThemeProviderOperations, useThemeProvider } from '../../context/ThemeContext';

// Styles
import './ProjectPreview.css';

const ProjectPreview = () => {
  const { saveTheme, closePreview }: ThemeProviderOperations = useThemeProvider();

  return (
    <div className='project-preview'>
      <div className='project-preview-wrapper'>
        <Button title="save" onClick={saveTheme} />
        <Button title="revert" onClick={closePreview} />
      </div>
    </div>
  )
};

export default ProjectPreview;