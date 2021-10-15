// @author 吴志强
// @date 2021/9/28

const path = require('path');
const fsExtra = require('fs-extra');

const deleteDistElectron = (cb) => {
    fsExtra.removeSync(path.join(__dirname, 'dist_electron'));
    cb();
};

const writeReleaseNotes = (cb) => {
    const jsYaml = require('js-yaml');
    const csvParser = require('csv-parser');

    const updateInfoPath = path.join(__dirname, 'dist_electron', 'latest.yml');
    const updateInfo = jsYaml.load(fsExtra.readFileSync(updateInfoPath));

    const releaseNotesPath = path.join(__dirname, 'releaseNotes', `${updateInfo.version}.csv`);
    const releaseNotes: Array<{version: string; note: string}> = [];

    fsExtra.createReadStream(releaseNotesPath)
        .pipe(csvParser(['version', 'note']))
        .on('data', (data) => {
            releaseNotes.push(data);
        })
        .on('end', () => {
            updateInfo.releaseNotes = releaseNotes;
            fsExtra.writeFileSync(updateInfoPath, jsYaml.dump(updateInfo, {lineWidth: 500}));
            cb();
        });
};

exports.deleteDistElectron = deleteDistElectron;
exports.writeReleaseNotes = writeReleaseNotes;
