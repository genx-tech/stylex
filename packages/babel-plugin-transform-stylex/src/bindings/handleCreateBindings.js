/**
 * Copyright (c) Ladifire, Inc. And its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk');

const stylesUtils = require('../utils').styles;
const classNames = require('../utils').classNames;
const filterObject = require('../utils').filterObject;
const replaceUseCalls = require('../utils').replaceUseCalls;
const replaceDeclaration = require('../utils').replaceDeclaration;
const extractAllProperties = require('../utils').extractAllProperties;
const injectStyles = require('../utils').injectStyles;

const logger = require('../utils/logger');

module.exports = function handleCreateBindings(identifier, opts, path) {
  const callExpr = identifier.parentPath.parentPath;
  const objExpr = callExpr.get('arguments.0');

  let styles;
  let classes;

  try {
    styles = stylesUtils.getStyles(objExpr);    
    classes = classNames.getClasses(styles);    

    let usedProperties 

    if (opts.useAll) {
      usedProperties = extractAllProperties(classes);
    } else {
      usedProperties = replaceUseCalls(callExpr.parentPath, classes);
    }   

    logger.log({ styles, classes, usedProperties });

    styles = filterObject(styles, usedProperties);
    classes = filterObject(classes, usedProperties);
  } catch (e) {
    console.log(chalk.red(`\nAn error occur: ${e}`));
  }

  if (!classes) {
    return '';
  }

  replaceDeclaration(callExpr, classes);
  const cssString = stylesUtils.generateStyles(styles);

  // only inject this to js, if there's an option {inject: true}
  if (opts && opts.inject) {
    injectStyles(cssString, path);
  }

  // always return cssString to stream
  return cssString;
};
