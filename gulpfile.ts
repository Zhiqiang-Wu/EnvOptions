// @author 吴志强
// @date 2021/9/28

const {parallel} = require('gulp');
const path = require('path');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const fsExtra = require('fs-extra');
const jsYaml = require('js-yaml');

const resetBaseDB = async (cb) => {
    const baseDBPath = path.join(__dirname, 'data', 'base.db3');
    let baseDB;
    const done = (message?: string) => {
        if (baseDB) {
            baseDB.close(() => {
                cb(message ? new Error(message) : null);
            });
        } else {
            cb(message ? new Error(message) : null);
        }
    };
    let success = await new Promise((resolve) => {
        baseDB = new sqlite3.Database(baseDBPath, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    if (!success) {
        done('连接baseDB失败');
        return;
    }
    success = await new Promise((resolve) => {
        baseDB.exec('DELETE FROM variable', (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    if (!success) {
        done('清空表数据失败');
        return;
    }
    success = await new Promise((resolve) => {
        baseDB.exec('UPDATE sqlite_sequence SET seq = 0 WHERE name = \'variable\'', (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
    if (!success) {
        done('重置seq失败');
        return;
    }

    done();
};

const resetSettingsDB = (cb) => {
    const settingsDBPath = path.join(__dirname, 'data', 'settings.json');
    const settingsDB = require(settingsDBPath);
    settingsDB.type = true;
    settingsDB.pageSize = 7;
    fs.writeFileSync(settingsDBPath, JSON.stringify(settingsDB, null, 2));
    cb();
};

const deleteDistElectron = (cb) => {
    fsExtra.removeSync(path.join(__dirname, 'dist_electron'));
    cb();
};

const writeReleaseNotes = (cb) => {
    const updateInfoPath = path.join(__dirname, 'dist_electron', 'latest.yml');
    const updateInfo = jsYaml.load(fs.readFileSync(updateInfoPath));
    let releaseNotes: any = ['更新内容1', '更新内容2', '更新内容3'];
    releaseNotes = releaseNotes.map((note) => ({
        version: updateInfo.version,
        note
    }));
    updateInfo.releaseNotes = releaseNotes;
    fs.writeFileSync(updateInfoPath, jsYaml.dump(updateInfo, {lineWidth: 500}));
    cb();
};

exports.resetDB = parallel(resetBaseDB, resetSettingsDB);
exports.deleteDistElectron = deleteDistElectron;
exports.writeReleaseNotes = writeReleaseNotes;
