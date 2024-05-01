import { useNavigate, useParams } from 'react-router-dom';

// Project components and contexts
import { Dots } from '..';

// Icons and images
import { ExitIcon, ThemeIcon } from '../../assets/icons';
import monica from '../assets/monic.jpg';

// Types and styles
import { ImageBackgroundStyle } from '../../helpers';
import './ProjectHeader.css';

interface ProjectHeaderProps {
}

const ProjectHeader = ({ }: ProjectHeaderProps) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="project-header">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ExitIcon className='button' size={24} onClick={() => navigate(-1)} />
        <div className='project-title'>project: {params.id}</div>
      </div>
      <div className='project-options'>
        <div className='project-option button' style={ImageBackgroundStyle(monica)}>
          <ThemeIcon color='white' size={20} />
        </div>
        <Dots className={["button", "project-option"]} vertical color="black" />
      </div>
    </div>
  )
};

export default ProjectHeader;