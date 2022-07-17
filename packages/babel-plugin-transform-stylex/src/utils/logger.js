const path = require('path');
const fs = require('fs');
const logs = [];

const outputPath = path.resolve(process.cwd(), 'error-stylex.log');

let enableLogging = false;

const init = (opts) => {
    if (opts.enableLogging) {
        enableLogging = true;
    }
}

const log = (obj) => {
    if (enableLogging) {
        logs.push(obj);
    }
}

const flush = () => {
    if (logs.length > 0) {
        fs.writeFileSync(outputPath, JSON.stringify(logs, null, 4));
    }
}

module.exports = {
    init,
    log,
    flush
};