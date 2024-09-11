export const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export function calculateWinner(board) {
    const lines = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['3', '6', '9'],
      ['1', '5', '9'],
      ['3', '5', '7'],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: lines[i] }
      }
    }
    return { winner: null, line: null }
  }