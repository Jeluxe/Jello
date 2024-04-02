export const arrayToObject = (array: string[]) => {
  return array.reduce((obj: { [key: string]: string }, item: string) => {
    obj[item] = '';
    return obj;
  }, {});
}

export const separateClasses = (...args: any[]): string => {
  const flattenArray = (arr: any[]): any[] => {
    return arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? flattenArray(val) : val);
    }, []);
  };

  const flattenedArgs = flattenArray(args);
  return flattenedArgs.join(" ");
};