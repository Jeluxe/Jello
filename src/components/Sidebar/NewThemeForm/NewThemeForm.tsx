// External libraries
import { useEffect, useRef, useState } from "react";

// Components and contexts
import { Button, Divider, Input } from "../..";
import { useSidebarProvider } from "../../../context/SidebarContext";

// Helpers and static data
import { ACCEPTABLE_IMAGE_FILE_EXTENSIONS } from "../../../assets/global";
import { isThemeImage } from "../../../helpers";

// Types and styles
import { ThemeActions, ThemeProps } from "../../../types/global";
import { BackIcon } from "../../../assets/icons";
import "./NewThemeForm.css"

const NewThemeForm = () => {
  const previewRef = useRef<HTMLImageElement>(null);
  const [newTheme, setNewTheme] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const {
    setThemeList,
    setNewThemeForm,
  }: ThemeActions = useSidebarProvider();


  const watchFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      setThemeList((prev: ThemeProps[]) => [{ name: customName || file?.name, background: URL.createObjectURL(file), image: true }, ...prev])
      onReturn();
    }
    else if (color) {
      setThemeList((prev: ThemeProps[]) => [{ name: customName || color, background: color }, ...prev])
    }

    if (file || color) {
      onReturn();
    }
  }

  const onReturn = () => {
    setNewThemeForm(false);
  }

  const removeImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    setNewTheme(false);
  }

  const watchColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomName(e.target.value)
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
      <img
        ref={previewRef}
        width={300}
        height={250}
        style={
          isThemeImage({ background: previewRef.current?.src ?? "" }) &&
          { display: newTheme ? "block" : "none" }
        }
      />
      {
        !newTheme ?
          <Input type="file" value="" onChange={watchFileChange} />
          : <Button title={"X"} onClick={removeImg} />
      }
      <div className="form-divider">
        <Divider color="black" />
        <span style={{ padding: "0 10px" }}>or</span>
        <Divider color="black" />
      </div>
      <Input type="color" value={color ?? ""} onChange={watchColorPicker} />
      custom name: <Input value={customName} onChange={changeName} />
      <Button title={"Add New Theme"} onClick={onSubmit} />
      <Button title={<BackIcon />} onClick={onReturn} />
    </div>
  )
}

export default NewThemeForm