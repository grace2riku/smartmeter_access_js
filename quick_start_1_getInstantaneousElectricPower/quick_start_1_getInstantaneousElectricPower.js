// node-wisunrb をロードし、`Wisunrb` コンストラクタオブジェクトを取得
const Wisunrb = require('node-wisunrb');

// Wisunrb オブジェクトを生成
const wisunrb = new Wisunrb({
    path: 'COM6', // シリアルポートのパス
    id: '0123456789ABCDEF0123456789ABCDEF', // 電力スマートメーターの ID
    password: '0123456789AB' // 電力スマートメーターのパスワード
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