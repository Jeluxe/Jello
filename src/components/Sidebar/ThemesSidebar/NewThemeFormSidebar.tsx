import { useRef, useState } from "react";
import { Button, Divider, Input } from "../..";
import { ACCEPTABLE_IMAGE_FILE_EXTENSIONS } from "../../../assets/global";
import { isThemeImage } from "../../../helpers";
import { ThemeActions, ThemeProps } from "../../../types/global";

const NewThemeFormSidebar = ({ themeList, setThemeList, setNewThemeForm }: { themeList: ThemeProps[] } & ThemeActions) => {
  const previewRef = useRef<any>(null);
  const [newTheme, setNewTheme] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e || !e.target || !e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!ACCEPTABLE_IMAGE_FILE_EXTENSIONS.some((ext) => file.name.endsWith(ext))) return;

    previewRef.current.src = URL.createObjectURL(file);
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

export default NewThemeFormSidebar