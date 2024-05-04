// External libraries
import { useEffect, useRef, useState } from "react";

// Components 
import { Button, Divider, Input } from "../..";

// Helpers and static data
import { ACCEPTABLE_IMAGE_FILE_EXTENSIONS } from "../../../assets/global";
import { isThemeImage } from "../../../helpers";

// Types and styles
import { ThemeActions, ThemeProps } from "../../../types/global";
import "./NewThemeForm.css"

const NewThemeForm = ({ themeList, setThemeList, setNewThemeForm }: { themeList: ThemeProps[] } & ThemeActions) => {
  const previewRef = useRef<HTMLImageElement>(null);
  const [newTheme, setNewTheme] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e || !e.target || !e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!ACCEPTABLE_IMAGE_FILE_EXTENSIONS.some((ext) => file.name.endsWith(ext))) return;

    const newUrl = URL.createObjectURL(file);

    if (previewRef.current) {
      previewRef.current.src = newUrl;
    }

    setFile(file);
    setNewTheme(true);
  }

  const onSubmit = () => {
    if (file) {
      setThemeList((prev: ThemeProps[]) => [{ name: file?.name, background: URL.createObjectURL(file), image: true }, ...prev])
    }

    onReturn();
  }

  const onReturn = () => {
    setNewThemeForm(false);
  }

  const removeImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    setNewTheme(false);
  }

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current.src);
      }
    };
  }, []);

  return (
    <div className="sidebar-new-theme-form">
      <img ref={previewRef} width={300} height={250} style={isThemeImage({ name: file?.name ?? `Theme${themeList.length}`, background: previewRef.current?.src }) && { display: newTheme ? "block" : "none" }} />
      {
        !newTheme ?
          <Input type="file" value="" onChange={onChange} accept=".jpg, .jpeg, .png" /> :
          <>
            <Button title={"X"} onClick={removeImg} />
            <Button title={"Add New Theme"} onClick={onSubmit} />
          </>
      }
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Divider color="black" /><span style={{ padding: "0 10px" }}>or</span><Divider color="black" /></div>
      <Button title={"<-"} onClick={onReturn} />
    </div>
  )
}

export default NewThemeForm