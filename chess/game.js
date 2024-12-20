var board,
    game = new Chess(); // ゲームの初期化

// 駒のドラッグ開始時の処理
var onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true || piece.search(/^b/) !== -1) {
        return false; // 黒の駒は動かせない
    }
};

// CPUの動き
var cpuMove = function () {
    var possibleMoves = game.moves();
    if (possibleMoves.length === 0) return; // ゲームオーバー

    var randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());
};

// 駒を置いた後の処理
var onDrop = function (source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // 昇格
    });

    if (move === null) return; // 無効な動き

    window.setTimeout(cpuMove, 250); // CPUの動き
};

// ボードの更新
var onSnapEnd = function () {
    board.position(game.fen());
};

// ボードの設定
var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

board = new ChessBoard('board', cfg); // チェスボードの初期化