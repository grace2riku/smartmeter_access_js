const Wisunrb = require('node-wisunrb');

const fs = require('fs');

// ファイルを読み込む関数
function readConfig(filePath) {
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
}

// config.txtから設定を読み込む
const config = readConfig('../config.txt');

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