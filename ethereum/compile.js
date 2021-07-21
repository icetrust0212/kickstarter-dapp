const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath,{encoding:'utf8', flag:'r'});
const output = solc.compile(source, 1).contracts;
console.log('OUtput:', output);
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.toString().replace(':', '') + '.json'),
        output[contract]    
    );
}