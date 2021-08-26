function init() {

  //Elements

  const grid = document.querySelector('.grid')
  const yellow = document.querySelector('.yellow')
  const red = document.querySelector('.red')

  //Variables to build the grid
  const width = 6
  const height = 7
  const cellCount = width * height
  const cells = []
  //variables for player 1 & 2
  const players = ['player1', 'player2']
  let player = players[0]

  //empty array for each choice to build on as game progresses
  let player1Choice = []
  let player2Choice = []

  
  
  //Execution
  
  //function to create the grid
  function createGrid() {
    //for loop index  0 --> final cell 
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      //just text to see the index can remove later
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }

  //function to start the game
  function startGame(e){
    
  }




//Events
  grid.addEventListener('click', startGame)
  createGrid()
}

window.addEventListener('DOMContentLoaded', init)