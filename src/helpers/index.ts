export const arrayToObject = (array: string[]) => {
  return array.reduce((obj: { [key: string]: string }, item: string) => {
    obj[item] = '';
    return obj;
  }, {});
}