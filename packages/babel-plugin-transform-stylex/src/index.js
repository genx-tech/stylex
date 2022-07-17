const handleBindings = require('./bindings');
const logger = require('./utils/logger');

const NAME = '@genx/stylex';

module.exports = function plugin({inject = true}) {
  let root;

  return {
    name: NAME,
    visitor: {
      Program(path) {
        root = path;
      },
      ImportDefaultSpecifier(path, state) {
        if (path.parent.source.value !== NAME) {return;}

        logger.init(state.opts);
        logger.log({
          options: state.opts
        });

        const importName = path.node.local.name;
        const bindings = path.scope.bindings[importName].referencePaths;

        // inject the result to metadata
        state.file.metadata.stylex = handleBindings(bindings, state.opts, root)
          // Remove duplicates
          .filter((e, i, a) => a.indexOf(e) === i)
          .join('');

        logger.flush();
      }
    }
  };
};
