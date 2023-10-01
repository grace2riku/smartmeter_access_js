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

    const currents = await wisunrb.getInstantaneousCurrent();
    console.log('- 瞬時電流計測値:');
    console.log('  - R相: ' + currents.rPhase + ' A');
    console.log('  - T相: ' + currents.tPhase + ' A');
        
    // スマートメーターを切断
    await wisunrb.disconnect();
})();

