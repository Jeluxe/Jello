// Components and contexts
import { Button } from '..';
import { SidebarProviderOperations, useSidebarProvider } from '../../context/SidebarContext';

// Styles
import './ProjectPreview.css';

const ProjectPreview = () => {
  const { onSave, closePreview }: SidebarProviderOperations = useSidebarProvider();

  return (
    <div className='project-preview'>
      <div className='project-preview-wrapper'>
        <Button title="save" onClick={onSave} />
        <Button title="revert" onClick={closePreview} />
      </div>
    </div>
  )
};

export default ProjectPreview;