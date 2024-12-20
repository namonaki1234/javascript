var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    // 駒の画像をロード
    this.load.image('king', 'assets/king.png');
    this.load.image('queen', 'assets/queen.png');
    // 他の駒も同様にロード
}

function create() {
    // 将棋盤を描画
    drawBoard(this);
}

function update() {
    // ゲームの更新処理
}

function drawBoard(scene) {
    // 将棋盤を描画するロジック
}

function drawBoard(scene) {
    const tileSize = 60; // マスのサイズ
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            scene.add.rectangle(i * tileSize, j * tileSize, tileSize, tileSize, 0xFFFFFF).setOrigin(0);
            // 交互に色を変える
            if ((i + j) % 2 === 0) {
                scene.add.rectangle(i * tileSize, j * tileSize, tileSize, tileSize, 0xAAAAAA).setOrigin(0);
            }
        }
    }
}

function create() {
    drawBoard(this);
    // 駒を配置
    this.king = this.add.sprite(4 * 60, 0 * 60, 'king').setOrigin(0.5);
    this.queen = this.add.sprite(3 * 60, 0 * 60, 'queen').setOrigin(0.5);
    // 他の駒も同様に配置
}

function update() {
    // 駒をクリックしたときの処理
    this.input.on('pointerdown', function (pointer) {
        // クリックした位置を取得
        const x = Math.floor(pointer.x / 60);
        const y = Math.floor(pointer.y / 60);
        // 駒を移動させるロジック
        movePiece(this.king, x, y);
    }, this);
}

function movePiece(piece, x, y) {
    // 駒の移動処理
    piece.x = x * 60;
    piece.y = y * 60;
}

function canMove(piece, targetX, targetY) {
    // 駒の種類に応じた移動ルールを実装
    // 例: 王の移動ルール
    if (piece.texture.key === 'king') {
        return Math.abs(piece.x / 60 - targetX) <= 1 && Math.abs(piece.y / 60 - targetY) <= 1;
    }
    // 他の駒のルールも同様に実装
    return false;
}
