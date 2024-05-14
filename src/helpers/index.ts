import { ThemeImageProps } from "../types/global";

export const arrayToObject = (array: string[]) => {
  return array.reduce((obj: { [key: string]: string }, item: string) => {
    obj[item.toLowerCase()] = '';
    return obj;
  }, {});
}

export const separateClasses = (...args: any[]): string => {
  const flattenedArgs = args.flattenArray();
  return flattenedArgs.join(" ");
};

const ImageBackgroundStyle = (img: string) => ({
  background: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
});

export const isThemeImage = (theme: ThemeImageProps, themePreview?: ThemeImageProps | null) => {
  const availableTheme = themePreview ?? theme;

  if (!availableTheme) return;

  const { background, isImage } = availableTheme;
  return isImage ? ImageBackgroundStyle(background) : { background }
}

export const renameKey = <T extends Record<string, any>>(obj: T, oldKey: string, newKey: string) => {
  const updatedEntries = Object.entries(obj).map(([key, value]) =>
    (key === oldKey) ? [newKey, value] : [key, value]
  )

  return Object.fromEntries(updatedEntries) as T;
}