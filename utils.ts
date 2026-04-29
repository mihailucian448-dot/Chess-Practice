import { useEffect, useMemo, useState } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";

type Props = {
  position: string;
  onPieceDrop?: (sourceSquare: string, targetSquare: string, piece: string) => boolean;
  boardOrientation?: "white" | "black";
  allowDragging?: boolean;
};

const customDarkSquareStyle: Record<string, string> = { backgroundColor: "hsl(22 35% 28%)" };
const customLightSquareStyle: Record<string, string> = { backgroundColor: "hsl(36 38% 78%)" };
const customBoardStyle: Record<string, string | number> = {
  borderRadius: "2px",
  boxShadow:
    "0 0 0 1px hsl(var(--wood) / 0.6), 0 0 0 8px hsl(var(--mahogany-900)), 0 0 0 9px hsl(var(--wood) / 0.5), 0 30px 80px -20px hsl(0 0% 0% / 0.8)",
};

// Visual indicators
const dotStyle: Record<string, string> = {
  background:
    "radial-gradient(circle, hsl(var(--ember) / 0.55) 22%, transparent 24%)",
  borderRadius: "50%",
};
const captureStyle: Record<string, string> = {
  background:
    "radial-gradient(circle, transparent 56%, hsl(var(--ember) / 0.55) 58%, hsl(var(--ember) / 0.55) 64%, transparent 66%)",
  borderRadius: "50%",
};
const selectedStyle: Record<string, string> = {
  background: "hsl(var(--ember) / 0.35)",
  boxShadow: "inset 0 0 0 2px hsl(var(--ember) / 0.7)",
};

export const ChessBoard = ({
  position,
  onPieceDrop,
  boardOrientation = "white",
  allowDragging = true,
}: Props) => {
  const [selected, setSelected] = useState<Square | null>(null);

  // Reset selection whenever the board position changes externally
  useEffect(() => {
    setSelected(null);
  }, [position]);

  const game = useMemo(() => {
    try {
      return new Chess(position);
    } catch {
      return new Chess();
    }
  }, [position]);

  const squareStyles = useMemo(() => {
    if (!selected) return {};
    const styles: Record<string, Record<string, string>> = {
      [selected]: selectedStyle,
    };
    let moves: { to: string; captured?: string }[] = [];
    try {
      moves = game.moves({ square: selected, verbose: true }) as {
        to: string;
        captured?: string;
      }[];
    } catch {
      moves = [];
    }
    for (const m of moves) {
      styles[m.to] = m.captured ? captureStyle : dotStyle;
    }
    return styles;
  }, [selected, game]);

  const tryMove = (from: Square, to: Square): boolean => {
    if (!onPieceDrop) return false;
    // Quick legality check before forwarding
    let legal = false;
    try {
      const moves = game.moves({ square: from, verbose: true }) as { to: string }[];
      legal = moves.some((m) => m.to === to);
    } catch {
      legal = false;
    }
    if (!legal) return false;
    return onPieceDrop(from, to, "");
  };

  const handleSquareClick = (square: string) => {
    if (!allowDragging) return;
    const sq = square as Square;

    if (selected) {
      if (sq === selected) {
        setSelected(null);
        return;
      }
      const moved = tryMove(selected, sq);
      if (moved) {
        setSelected(null);
        return;
      }
      // Not a legal target — maybe selecting a different own piece
      const piece = game.get(sq);
      if (piece && piece.color === game.turn()) {
        setSelected(sq);
      } else {
        setSelected(null);
      }
      return;
    }

    const piece = game.get(sq);
    if (piece && piece.color === game.turn()) {
      setSelected(sq);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto p-3">
      <Chessboard
        position={position}
        boardOrientation={boardOrientation}
        arePiecesDraggable={allowDragging}
        animationDuration={250}
        customDarkSquareStyle={customDarkSquareStyle}
        customLightSquareStyle={customLightSquareStyle}
        customBoardStyle={customBoardStyle}
        customSquareStyles={squareStyles}
        onSquareClick={handleSquareClick}
        onPieceDragBegin={(_piece, sourceSquare) =>
          setSelected(sourceSquare as Square)
        }
        onPieceDrop={(sourceSquare, targetSquare, piece) => {
          setSelected(null);
          if (!targetSquare || !onPieceDrop) return false;
          return onPieceDrop(sourceSquare, targetSquare, piece);
        }}
      />
    </div>
  );
};
