import { ThemeProps } from "../types/global";

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

type ThemeImageProps = Omit<ThemeProps, "name">

export const isThemeImage = (theme: ThemeImageProps, themePreview?: ThemeImageProps | null) => {
  const availableTheme = themePreview ?? theme;

  if (!availableTheme) return;

  const { background, isImage } = availableTheme;
  return isImage ? ImageBackgroundStyle(background) : { background }
}