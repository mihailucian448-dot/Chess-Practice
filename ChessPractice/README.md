# ChessPractice

Site minimalist de șah în limba română, cu joc împotriva Stockfish pe 3 niveluri.

## Tehnologii
- HTML5, CSS3, JavaScript (vanilla)
- chess.js — logica jocului
- chessboard.js — interfața tablei (drag & drop)
- Stockfish.js — motor de șah (Web Worker)

Toate librăriile sunt incluse local în folderul `vendor/`, iar piesele
de șah în `pieces/`. Nu este nevoie de internet pentru a rula aplicația.

## Cum se rulează
Stockfish rulează ca Web Worker, deci fișierele trebuie servite de un
server HTTP (nu deschise direct cu file://).

  cd ChessPractice
  python3 -m http.server 8000
  # apoi: http://localhost:8000

Sau cu Node:  npx serve ChessPractice

## Funcționalități
- 3 niveluri: Începător, Mediu, Avansat
- Alegerea culorii (albe / negre)
- Joc nou, anulare mutare, întoarcere tablă
- Istoricul mutărilor în notație algebrică
- Detectare șah, șah mat, pat, remize

## Structură
- index.html      — marcaj + design (minimalist rustic)
- app.js          — logică joc + comunicare cu Stockfish
- vendor/         — jQuery, chess.js, chessboard.js, stockfish.js, CSS
- pieces/         — piese SVG (set cburnett)
