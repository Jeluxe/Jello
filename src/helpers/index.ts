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