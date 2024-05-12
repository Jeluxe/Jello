import { useState } from "react";

import { Input, Button } from ".."
import { isThemeImage } from "../../helpers";

import { ErrorProps, ThemeProps, } from "../../types/global";
import './NewProjectForm.css'
import { ThemeProviderData, useThemeProvider } from "../../context/ThemeContext";

interface ProjectCardProps {
  name: string,
  theme: ThemeProps
}

interface NewProjectFormProps {
  projectList: ProjectCardProps[],
  setProjectList: React.Dispatch<React.SetStateAction<ProjectCardProps[]>>,
  setIsNewProjectFormOpen: React.Dispatch<boolean>,
  setIsModalOpen: React.Dispatch<boolean>,
}

const NewProjectForm = ({ projectList, setProjectList, setIsNewProjectFormOpen, setIsModalOpen }: NewProjectFormProps) => {
  const [name, setName] = useState<string>("")
  const [error, setError] = useState<ErrorProps>({ error: false, message: null })

  const { themePreview }: Pick<ThemeProviderData, "themePreview"> = useThemeProvider();

  const onClick = () => {
    if (!name.trim()) {
      setError({ error: true, message: "Error: Please input valid name!" })
      return;
    }

    if (!themePreview) {
      setError({ error: true, message: "Error: No theme was selected!" })
      return;
    }

    if (projectList.find(({ name: pName }: { name: string }) => pName === name)) {
      setError({ error: true, message: "Error: Name already exists!" })
      return;
    }

    setProjectList((prev: ProjectCardProps[]) => [...prev, { name, theme: themePreview }])
    setIsNewProjectFormOpen(false);
  }

  const onChange = (value: string, setter: React.Dispatch<string>) => {
    setter(value)
    resetError()
  }

  const resetError = () => {
    setError({ error: false, message: null })
  }

  return (
    <div className="new-project-form">
      <div className="form-wrapper" style={{ position: "relative" }}>
        <div className="form-field-wrapper">
          <span>name: </span>
          <Input
            value={name}
            onChange={(e) => onChange(e.target.value, setName)}
            style={{ borderColor: "black", width: "100%" }}
          />
        </div>
        <div className="form-field-wrapper">
          <span>theme: </span>
          <div className="form-theme-field" onClick={() => setIsModalOpen(true)}>
            <div className="form-theme-display" style={themePreview && isThemeImage(themePreview) || { background: "lightblue" }}></div>
            <span>{themePreview?.name || "lightblue"}</span>
          </div>
        </div>
        <Button title="submit" onClick={onClick} style={{ marginTop: "10px" }} />
        {error.error ? <span style={{ color: "red" }}>{error.message}</span> : null}
      </div>
    </div>
  )
};

export default NewProjectForm;