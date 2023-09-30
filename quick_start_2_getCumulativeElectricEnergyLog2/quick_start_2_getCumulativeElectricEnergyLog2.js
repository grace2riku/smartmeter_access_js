const Wisunrb = require('node-wisunrb');

const wisunrb = new Wisunrb({
    path: 'COM6', // シリアルポートのパス
    id: '0123456789ABCDEF0123456789ABCDEF', // 電力スマートメーターの ID
    password: '0123456789AB' // 電力スマートメーターのパスワード
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