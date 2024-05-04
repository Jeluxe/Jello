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

export const isThemeImage = (theme: any, themePreview?: any) => {
  const { image, background } = themePreview ?? theme

  return image ? ImageBackgroundStyle(background) : { background }
}