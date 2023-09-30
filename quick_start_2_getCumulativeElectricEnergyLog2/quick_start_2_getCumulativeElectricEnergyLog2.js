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

    while (true) {
        try {
            // 積算電力量計測値履歴2を取得
            const res = await wisunrb.getCumulativeElectricEnergyLog2();
            console.log(JSON.stringify(res, null, '  '));
        } catch (error) {
            console.error(error);
        }

        // 30 分待つ
        await wisunrb.wait(1800000);
    }
})();