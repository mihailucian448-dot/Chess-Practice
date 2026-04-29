/* ChessPractice — vanilla JS chess app vs Stockfish */
(function () {
  const game = new Chess();
  let board = null;
  let playerColor = 'w';
  let level = 'easy'; // easy | medium | hard
  let stockfish = null;
  let thinking = false;

  const levelDepth = { easy: 2, medium: 6, hard: 12 };
  const levelLabel = { easy: 'Începător', medium: 'Mediu', hard: 'Avansat' };
  // Stockfish "Skill Level" 0..20
  const levelSkill = { easy: 1, medium: 8, hard: 20 };

  const $status = document.getElementById('status');
  const $moves = document.getElementById('moves');
  const $turnBadge = document.getElementById('turnBadge');
  const $opponentLabel = document.getElementById('opponentLabel');

  /* ----------- Stockfish (web worker, CDN) ----------- */
  function initEngine() {
    if (stockfish) { try { stockfish.terminate(); } catch (e) {} }
    try {
      stockfish = new Worker('./vendor/stockfish.js');
    } catch (e) {
      console.error('Nu s-a putut încărca Stockfish', e);
      return;
    }
    stockfish.onmessage = (e) => {
      const line = typeof e.data === 'string' ? e.data : '';
      if (line.startsWith('bestmove')) {
        const parts = line.split(' ');
        const best = parts[1];
        if (best && best !== '(none)') {
          const from = best.substring(0, 2);
          const to = best.substring(2, 4);
          const promo = best.length > 4 ? best.substring(4, 5) : undefined;
          const move = game.move({ from, to, promotion: promo || 'q' });
          if (move) {
            board.position(game.fen());
            updateUI();
          }
        }
        thinking = false;
      }
    };
    stockfish.postMessage('uci');
    stockfish.postMessage('setoption name Skill Level value ' + levelSkill[level]);
    stockfish.postMessage('ucinewgame');
  }

  function askEngine() {
    if (game.game_over()) return;
    if (!stockfish) { initEngine(); if (!stockfish) return; }
    thinking = true;
    updateUI();
    stockfish.postMessage('position fen ' + game.fen());
    const depth = levelDepth[level];
    // small movetime cap so easy level feels snappy and weaker
    const movetime = level === 'easy' ? 200 : level === 'medium' ? 600 : 1500;
    stockfish.postMessage(`go depth ${depth} movetime ${movetime}`);
  }

  /* ----------- Board callbacks ----------- */
  function onDragStart(source, piece) {
    if (game.game_over() || thinking) return false;
    if (game.turn() !== playerColor) return false;
    if ((playerColor === 'w' && piece.search(/^b/) !== -1) ||
        (playerColor === 'b' && piece.search(/^w/) !== -1)) return false;
  }

  function onDrop(source, target) {
    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';
    updateUI();
    window.setTimeout(askEngine, 150);
  }

  function onSnapEnd() { board.position(game.fen()); }

  /* ----------- UI updates ----------- */
  function updateUI() {
    // moves history
    const history = game.history();
    if (history.length === 0) {
      $moves.innerHTML = '<span class="empty">Nicio mutare încă.</span>';
    } else {
      let html = '';
      for (let i = 0; i < history.length; i += 2) {
        const n = i / 2 + 1;
        html += `<span class="num">${n}.</span><span class="move">${history[i]}</span>`;
        if (history[i + 1]) html += `<span class="move">${history[i + 1]}</span>`;
      }
      $moves.innerHTML = html;
      $moves.scrollTop = $moves.scrollHeight;
    }

    // status
    let status = '';
    const turn = game.turn() === 'w' ? 'Albele' : 'Negrele';
    if (game.in_checkmate()) {
      status = `Șah mat — ${turn} au pierdut.`;
      $turnBadge.textContent = 'Sfârșit';
    } else if (game.in_stalemate()) {
      status = 'Pat — remiză.'; $turnBadge.textContent = 'Remiză';
    } else if (game.in_threefold_repetition()) {
      status = 'Repetiție triplă — remiză.'; $turnBadge.textContent = 'Remiză';
    } else if (game.insufficient_material()) {
      status = 'Material insuficient — remiză.'; $turnBadge.textContent = 'Remiză';
    } else if (game.in_draw()) {
      status = 'Remiză.'; $turnBadge.textContent = 'Remiză';
    } else {
      const yourTurn = game.turn() === playerColor;
      status = yourTurn
        ? (game.in_check() ? 'Ești în șah — apără-te.' : 'Rândul tău.')
        : (thinking ? 'Stockfish gândește…' : 'Rândul lui Stockfish.');
      $turnBadge.textContent = yourTurn ? 'Rândul tău' : 'Stockfish';
    }
    $status.textContent = status;
    $opponentLabel.textContent = 'Stockfish — ' + levelLabel[level];
  }

  /* ----------- Setup ----------- */
  function buildBoard() {
    board = Chessboard('board', {
      position: 'start',
      draggable: true,
      orientation: playerColor === 'w' ? 'white' : 'black',
      pieceTheme: './pieces/{piece}.svg',
      onDragStart, onDrop, onSnapEnd,
    });
    window.addEventListener('resize', () => board.resize());
  }

  function newGame() {
    game.reset();
    initEngine();
    board.orientation(playerColor === 'w' ? 'white' : 'black');
    board.start();
    updateUI();
    if (game.turn() !== playerColor) setTimeout(askEngine, 300);
  }

  /* ----------- Wire controls ----------- */
  document.querySelectorAll('.level-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      level = btn.dataset.level;
      stockfish && stockfish.postMessage('setoption name Skill Level value ' + levelSkill[level]);
      updateUI();
    });
  });

  document.getElementById('newGame').addEventListener('click', newGame);
  document.getElementById('flip').addEventListener('click', () => board.flip());
  document.getElementById('undo').addEventListener('click', () => {
    if (thinking) return;
    // undo player + engine move
    game.undo(); game.undo();
    board.position(game.fen());
    updateUI();
  });
  document.getElementById('playWhite').addEventListener('click', () => {
    playerColor = 'w'; newGame();
  });
  document.getElementById('playBlack').addEventListener('click', () => {
    playerColor = 'b'; newGame();
  });

  /* ----------- Init ----------- */
  buildBoard();
  initEngine();
  updateUI();
})();
