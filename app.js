function init() {

  //Elements

  const grid = document.querySelector('.grid')
  // const yellow = document.querySelector('.yellow')
  // const red = document.querySelector('.red')
  const resetBtn = document.querySelector('.reset')
  const p1Win = document.querySelector('.P1')
  const p2Win = document.querySelector('.P2')
  //const playerDisk = ['.yellow', '.red']
  const spanP1Score = document.querySelector('#P1Score')
  const spanP2Score = document.querySelector('#P2Score')
  //Variables to build the grid from lesson
  const width = 6
  const height = 7
  const cellCount = width * height
  const cells = []

  //variables for player 1 & 2
  //make an array for the player with both in it
  const players = ['player1', 'player2']
  //player 1 will start
  let player = players[0]

  //empty array for each turn to build on as game progresses
  let player1Choice = []
  let player2Choice = []
  //empty array for keeping track of the player score
  let playerOneScore = 0
  let playerTwoScore = 0
  
  //Execution
  
  //function to create the grid
  function createGrid() {
    //for loop i  0 --> final cell which is found by cellcount 
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      //cell.textContent = i
      //just text to see the i can remove later
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }

  //check which player is next
  const checkPlayer1 = i => cells[i].classList.contains('yellow') ? player1Choice.push(i) : false
  const checkPlayer2 = i => cells[i].classList.contains('red') ? player2Choice.push(i) : false

  // function for game start 😁
  //use event handler as argument - can't use a es6 function as it is not a short function
  function gameStart(e){
    
    if (player === players[0]) {

      // i will need to be a number or else it is a string
      // turn needs to be an element in the grid chosen with the id which was given in the createGrid function
      // turn is worked out by using the modulus of width and then adding 36 to ensure we are on the bottom row of the cells/grid so 
      // turn = grid number 41 = 6.8 + 36 = 42
      // turn = grid number 36 = 6 (remainder of 0) + 36 = i 0
      //turn = grid number 37 = 37/6 = 6.1 (remainder of 1) = 37
      //turn = grid number 38 = 38/6 = 6.3 (third position)
      let turn = Number(e.target.id) % width + 36 //without the modulus we get undefined and can only select one grid - this gives you the bottom row to start
      console.log('turn mod --->',cells[turn] % 6 )  //expected return NaN then the i

      while (cells[turn].classList.contains('yellow') || (cells[turn].classList.contains('red'))) {
        //the cell above must be chosen if there is already a 🟡 or 🔴 piece there and I can find this by subtracting the width
        turn = turn - width
        console.log('turn---->', turn) //console log to show that the turn is the correct i
      }
      
      //add a yellow piece as you are player 1 (rules of the game yellow goes first) - reference my CSS property here to pick the new background as the i is an id
      cells[turn].classList.add('yellow') 
      //changeHover() 
      player1Choice = [turn]
  
      let i = turn + 1
      //check across using the width and the player 1 i position as per the const checkPlayer
      while (i % width !== 0 && checkPlayer1(i)) {
        //keep checking until we get to zero on the grid then if no winner...
        i++  
        console.log('check the i--->', i)
      }
      //check & loop backwards
      i = turn - 1

      //Player 1 check across the cells left and right or right and left
      //while the i plus 1 (which is equal to the length in real terms)
      while ((i + 1) % width !== width - 1 && i % width !== width - 1 && checkPlayer1(i)) {    
        //keep checking backwards
        i--
      }
      //if player1 has 4 in a row across the cells then add 1 to their score & log it to the console with the win message
      if (player1Choice.length >= 4) {
        console.log('You won across the grid!! 🟡') 
        playerOneScore++
        console.log(playerOneScore) //this is just for my benefit while checking logic is working and can be removed later
        console.log('Show player1 turn',player1Choice) //just to check can be deleted later
        p1Win.innerHTML = 'Player 1 Wins!! 🟡'
        scorePlayer1()
        endTurns()

      }

      //CHECK THE DIAGONAL GRID 36 -> 5// 
      player1Choice = [turn]
      
      i = turn + width - 1

      //check dimensions of the grid created - while the i is in the dimension of the grid 
      //in this case we need to check more than rows [0-5,6-11 etc] so width * height rather than just width
      while ((i + 1) % width !== 0 && i <= width * height - 1 && checkPlayer1(i)) {
        //i + 5 will be the cell diagonally below the i chosen [16,21,26,31]
        i += (width - 1)

      }
      // - 7 on the player turn
      i = turn - width + 1
      //while these conditions are true keeping checking(size of grid and not 0 or 5)
      while (i % width !== width - 1 && i <= width * height - 1 && checkPlayer1(i)) { 
        //i = i - 7 right to left cells which will give the cell diagonally above in the grid [41,34,27,20]
        i -= (width + 1)
      }
      
      while (turn > 5 && checkPlayer1(i)) {
        player1Choice = [turn]
      }
      //winning line - console log this and add to the score array
      if (player1Choice.length >= 4) {
        console.log('winner winner chicken dinner 36-5 diagonal win 🟡')
        playerOneScore++
        p1Win.innerHTML = 'Player 1 Wins!! 🟡'
        scorePlayer1()
        endTurns()

      }

      player1Choice = [turn]

      //  Check the grid from 0 --> 41 top left to bottom right
      // Whatever the i turn is take 7 which brings you to the cell directly above diagonally from the i
      i = turn - width - 1
      //check we are past the top row and that it is a player used class of yellow - start from the
      while ((i + 1) % width !== 0 && i >= width && checkPlayer1(i)) {
        // i - 5 = diagonal cell above right on the grid - loop through this way [38,33,28,23]
        i -= width - 1

      }
      //Whatever the turn we add 7 and we can check the grid diagonally below right 
      i = turn + width + 1
      //While i is not equal to 0 and i is less than or equal to 41 and a player is in the cell
      while (i % width !== 0 && i <= width * height - 1 && checkPlayer1(i)) { 
        //check the 7th cell below [1,8,15,21]
        i += width + 1
      }
      //winning turn here 
      if (player1Choice.length >= 4) {
        console.log('Top Left to Bottom Right winnnnner!! 🟡')
        playerOneScore++
        p1Win.innerHTML = 'Player 1 Wins!! 🟡'
        scorePlayer1()
        endTurns()
        
      }
        
      player1Choice = [turn]
      
      //BOTTOM INDEX OF THE GRID TO THE TOP//
      
      //start with the turn and take 6
      i = turn - width
      //loop through the grid if there is a yellow class there and the i is more than or equal to 6 aka not the top row
      while (i >= width && checkPlayer1(i)) {
        //i - 6 should give the cell above the checkPlayer1 cell to loop/check [40,34,28,22]
        i = turn - width
      }
      //i to choose -> id on the grid + 6
      i = turn + width
      //while the i is less than or equal to 41 & there is a player1 yellow class in that slot
      while (i <= width * height - 1 && checkPlayer1(i)) {
        //i should + 6 and can check top row [4,10,16,22]
        i = i + width 
        //If more than or equal to 4 (in case of a big win!) then add 1 to the player 1 score and log it to the console
        if (player1Choice.length >= 4) {
          console.log('up up down down win 🟡')
          playerOneScore++
          console.log('player 1 score--->', playerOneScore)
          p1Win.innerHTML = 'Player 1 Wins!! 🟡'
          scorePlayer1()
          endTurns()
        }
      }
      player1Choice = []
      player = players[1]
      
    } else {
      //Player 2 logic - should be similar to player 1 🙏🏻
      let nextTurn = Number(e.target.id) % width + 36

      while (cells[nextTurn].classList.contains('yellow') || cells[nextTurn].classList.contains('red')) {
        nextTurn = nextTurn - width
      }
      cells[nextTurn].classList.add('red')

      player2Choice = [nextTurn]

      let i = nextTurn + 1

      while (i % width !== 0 && checkPlayer2(i)) {
        i++
      }

      i = nextTurn - 1

      while (i % width !== width - 1 && checkPlayer2(i)) {
        i--
      }
      if (player2Choice.length >= 4) {
        playerTwoScore++
        console.log('Player 2 wins across the board 🔴')
        console.log('Player 2 score', playerTwoScore)
        p2Win.innerHTML = 'Player 2 Wins!! 🔴'
        scorePlayer2()
        endTurns()
      }
      //diag //def missing a while statement here!
      player2Choice = [nextTurn]

      i = nextTurn + width - 1

      while (i % width !== 0 && i <= width * height - 1 && checkPlayer2(i)) {
        i -= (width + 1)

        if (player2Choice.length >= 4) {
          playerTwoScore++
          console.log('Player 2 wins diagonal 🔴')
          p2Win.innerHTML = 'Player 2 Wins!! 🔴'
          scorePlayer2()
          endTurns()
        }
      }

      player2Choice = [nextTurn]

      i = nextTurn - width - 1

      while ((i + 1) % width !== 0 && i >= width && checkPlayer2(i)) {
        i -= width - 1
      }

      i = nextTurn + width + 1

      while (i & width !== 0 && i <= width * height - 1 && checkPlayer2(i)) {
        i += width + 1
      }
      if (player2Choice.length >= 4) {
        playerTwoScore++
        console.log('Player 2 wins diagonal 🔴')
        p2Win.innerHTML = 'Player 2 Wins!! 🔴'
        scorePlayer2()
        endTurns()
      }

      player2Choice = [nextTurn]

      i = nextTurn - width

      while (i >= width && checkPlayer2(i)) {
        i = nextTurn - width
      }

      i = nextTurn + width

      while (i <= width * height - 1 && checkPlayer2(i)) {
        i = i + width
      }

      if (player2Choice.length >= 4) {
        playerTwoScore++
        console.log('Player 2 wins column 🔴')
        p2Win.innerHTML = 'Player 2 Wins!! 🔴'
        scorePlayer2()
        endTurns()
      }

      player2Choice = []
      player = players[0]
    }
    // Function that clears the game when a player wins
    function endTurns() {
      const circlesChoice = document.querySelectorAll('.grid div')
      circlesChoice.forEach(circleChosen => circleChosen.classList.remove('red', 'yellow'))
    }
  }
  //reset completely
  const reset = () => location.reload()

  // function changeHover() {
  //   //once disk fell - put the disk to place
  //   grid.addClass('red')
  // }
  
  // Function that increases player1 score
  function scorePlayer1() {
    playerOneScore =  playerOneScore 
    spanP1Score.innerHTML = playerOneScore
  }

  // Function that increases player2 score
  function scorePlayer2() {
    playerTwoScore = playerTwoScore 
    spanP2Score.innerHTML = playerTwoScore
  }

  //Events
  grid.addEventListener('click', gameStart)
  resetBtn.addEventListener('click', reset)
  createGrid()
}
window.addEventListener('DOMContentLoaded', init) 

