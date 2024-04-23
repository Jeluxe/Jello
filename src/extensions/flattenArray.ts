Array.prototype.flattenArray = function (this: object[]) {
  return this.reduce((acc: any[], val: [] | object) => {
    return acc.concat(Array.isArray(val) ? val.flattenArray() : val);
  }, []);
};