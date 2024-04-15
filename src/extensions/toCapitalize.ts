String.prototype.toCapitalize = function () {
  return this.split(" ").map(val => val.charAt(0).toUpperCase() + val.slice(1)).join(" ");
};