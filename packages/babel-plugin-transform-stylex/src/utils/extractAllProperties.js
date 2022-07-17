// some parts of this file is reference from: https://github.com/johanholmerin/style9
// thanks to: @johanholmerin

const flattenClasses = require('./classNames').flattenClasses;

function extractAllProperties(classes) {
  const flatClasses = flattenClasses(classes);
  return Object.keys(flatClasses);
}

module.exports = extractAllProperties;
