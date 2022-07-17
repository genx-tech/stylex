const isPropertyCall = require('./isPropertyCall');
const expandProperty = require('./expandProperty');
const resolvePathValue = require('./resolvePathValue');
const styles = require('./styles');
const classNames = require('./classNames');
const filterObject = require('./filterObject');
const replaceUseCalls = require('./replaceUseCalls');
const replaceDeclaration = require('./replaceDeclaration');
const extractAllProperties = require('./extractAllProperties');
const injectStyles = require('./injectStyles');

module.exports = {
  isPropertyCall,
  expandProperty,
  resolvePathValue,
  styles,
  classNames,
  filterObject,
  replaceUseCalls,
  replaceDeclaration,
  extractAllProperties,
  injectStyles
};
