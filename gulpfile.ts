// @author 吴志强
// @date 2021/9/28

const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const jsYaml = require('js-yaml');

const deleteDistElectron = (cb) => {
    fsExtra.removeSync(path.join(__dirname, 'dist_electron'));
    cb();
};

const writeReleaseNotes = (cb) => {
    const updateInfoPath = path.join(__dirname, 'dist_electron', 'latest.yml');
    const updateInfo = jsYaml.load(fs.readFileSync(updateInfoPath));
    let releaseNotes: any = ['增加筛选功能'];
    releaseNotes = releaseNotes.map((note) => ({
        version: updateInfo.version,
        note
    }));
    updateInfo.releaseNotes = releaseNotes;
    fs.writeFileSync(updateInfoPath, jsYaml.dump(updateInfo, {lineWidth: 500}));
    cb();
};

exports.deleteDistElectron = deleteDistElectron;
exports.writeReleaseNotes = writeReleaseNotes;
