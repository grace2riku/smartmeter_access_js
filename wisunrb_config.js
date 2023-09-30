const fs = require('fs');

exports.readConfig = function(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const config = {};

    lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
            config[key.trim()] = value.trim();
        }
    });

    return config;
};