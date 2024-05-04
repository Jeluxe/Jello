import { Button } from '..';
import './ProjectPreview.css';

interface ProjectPreviewProps {
  onSave: () => void
  onRevert: () => void
}

const ProjectPreview = ({ onSave, onRevert }: ProjectPreviewProps) => {
  return (
    <div className='project-preview'>
      <div className='project-preview-wrapper'>
        <Button title="save" onClick={onSave} />
        <Button title="revert" onClick={onRevert} />
      </div>
    </div>
  )
};

export default ProjectPreview;