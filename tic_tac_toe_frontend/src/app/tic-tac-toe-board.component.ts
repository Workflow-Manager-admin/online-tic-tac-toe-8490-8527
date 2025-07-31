import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TicTacToeBoardComponent {
  @Input() board: string[] = [];
  @Input() isGameOver: boolean = false;
  @Input() winningLine: number[] | null = null;
  @Output() cellClicked = new EventEmitter<number>();

  // PUBLIC_INTERFACE
  onCellClick(i: number) {
    if (!this.isGameOver && !this.board[i]) {
      this.cellClicked.emit(i);
    }
  }

  isWinningCell(idx: number): boolean {
    return this.winningLine?.includes(idx) ?? false;
  }
}
