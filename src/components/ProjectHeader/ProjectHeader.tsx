//external libraries
import { useNavigate, useParams } from 'react-router-dom';

// Project components and contexts
import { Button } from '..';

// Icons and images
import { ExitIcon, ThemeIcon } from '../../assets/icons';

// Types and styles
import { isThemeImage } from '../../helpers';
import { SidebarAction, ThemeProps } from '../../types/global';
import './ProjectHeader.css';
import { useProjectProvider, ProjectProviderData, ProjectProviderOperations } from '../../context/ProjectContext';

const ProjectHeader = ({ setSidebarData, isPreview, theme }: SidebarAction & { isPreview: boolean, theme: ThemeProps }) => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    activeItem,
    newContainer,
    setNewContainer
  }: ProjectProviderData & ProjectProviderOperations = useProjectProvider();

  const onClick = (fn: any) => {
    if (!isPreview) fn();
  }

  return (
    <div className="project-header">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ExitIcon className='button' size={24} onClick={() => onClick(() => navigate(-1))} />
        <div className='project-title'>project: {params.id}</div>
      </div>
      <div className='project-options'>
        {!activeItem && !newContainer && <Button title={"Add Container"} className={"project-option"} style={{ width: "auto" }} onClick={() => setNewContainer(true)} />}
        <div className='project-option button' style={isThemeImage(theme)} onClick={() => onClick(() => setSidebarData({ type: "themes", isOpen: true }))}>
          <ThemeIcon color='white' size={20} />
        </div>
      </div>
    </div>
  )
};

export default ProjectHeader;