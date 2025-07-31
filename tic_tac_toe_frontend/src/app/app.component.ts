import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeBoardComponent } from './tic-tac-toe-board.component';

type GameStatus = 'running' | 'win' | 'draw';

interface GameState {
  board: string[];
  currentPlayer: 'X' | 'O';
  status: GameStatus;
  winner: 'X' | 'O' | null;
  winningLine: number[] | null;
  moveCount: number;
}

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TicTacToeBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tic Tac Toe';
  game: GameState = this.newGameState();

  // PUBLIC_INTERFACE
  onCellClicked(idx: number) {
    if (this.game.status !== 'running') return;
    if (this.game.board[idx]) return;

    this.game.board[idx] = this.game.currentPlayer;
    this.game.moveCount += 1;
    const check = this.checkWinner(this.game.board);

    if (check) {
      this.game.status = 'win';
      this.game.winner = this.game.currentPlayer;
      this.game.winningLine = check;
      return;
    }
    if (this.game.moveCount === 9) {
      this.game.status = 'draw';
      this.game.winner = null;
      this.game.winningLine = null;
      return;
    }
    this.game.currentPlayer = this.game.currentPlayer === 'X' ? 'O' : 'X';
  }

  // PUBLIC_INTERFACE
  resetGame() {
    this.game = this.newGameState();
  }

  newGameState(): GameState {
    return {
      board: Array(9).fill(''),
      currentPlayer: 'X',
      status: 'running',
      winner: null,
      winningLine: null,
      moveCount: 0
    };
  }

  checkWinner(board: string[]): number[] | null {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6] // diags
    ];
    for (const combo of wins) {
      const [a,b,c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return combo;
      }
    }
    return null;
  }
}
