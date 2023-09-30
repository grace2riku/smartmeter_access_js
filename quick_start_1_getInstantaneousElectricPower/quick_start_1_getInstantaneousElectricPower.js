// node-wisunrb をロードし、`Wisunrb` コンストラクタオブジェクトを取得
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

    // 瞬時電力計測値を取得して結果を出力
    const power = await wisunrb.getInstantaneousElectricPower();
    console.log('- 瞬時電力計測値: ' + power + ' W');

    // スマートメーターを切断
    await wisunrb.disconnect();
})();