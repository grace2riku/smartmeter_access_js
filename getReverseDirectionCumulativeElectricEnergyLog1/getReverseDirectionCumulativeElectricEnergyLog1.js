const Wisunrb = require('node-wisunrb');

var config_file = require('../wisunrb_config');
// config.txtから設定を読み込む
const config = config_file.readConfig('../config.txt');

// Wisunrb オブジェクトを生成
const wisunrb = new Wisunrb({
    path: config.path,
    id: config.id,
    password: config.password
});

(async () => {
    // スマートメーターに接続
    await wisunrb.connect();

    const res = await wisunrb.getReverseDirectionCumulativeElectricEnergyLog1({ day: 0 });
    console.log(JSON.stringify(res, null, '  '));

    // スマートメーターを切断
    await wisunrb.disconnect();
})();

