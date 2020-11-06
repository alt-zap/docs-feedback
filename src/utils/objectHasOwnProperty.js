function objectHasOwnProperty(object, propertyName) {
  return Object.prototype.hasOwnProperty.call(object, propertyName);
}

export default objectHasOwnProperty;
