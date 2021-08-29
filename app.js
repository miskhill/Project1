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
  //make an array for the player with both in it
  const players = ['player1', 'player2']
  //player 1 will start
  let player = players[0]

  //empty array for each choice to build on as game progresses
  let player1Choice = []
  let player2Choice = []
  //empty array for keeping track of the player score
  let playerOneScore = 0
  let playerTwoScore = 0
  
  //Execution
  
  //function to create the grid
  function createGrid() {
    //for loop index  0 --> final cell which is found by cellcount 
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      //just text to see the index can remove later
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }




  function checkPlayer1(index) {
    //if an indexed cell has a yellow - found by checking the classlist value
    if (cells[index].classList.contains('yellow')) {
      //than push that to player 1 array so we know it is taken and cannot be re-assigned 🟡
      //will just throw an undefined
      player1Choice.push(index)
      return true
    } return false
  }

  function checkPlayer2(index) {
    //if a cell has a red 
    if (cells[index].classList.contains('red')) {
      //then push that to player 2 array so we know it has been taken and cannot be re-assigned 🔴
      player2Choice.push(index)
      return true
    } return false
  }


  // function to start the game 😁
  //use event handler
  function startGame(e){
    
    if (player === players[0]) {

      // index will need to be a number or else it is a string
      // choice needs to be an element in the grid chosen with the id which was given in the createGrid function
      // choice is worked out by using the modulus of width and then adding 36 to ensure we are on the bottom row of the cells/grid so 
      // choice = grid number 41 = 6.8 + 36 = 42
      // choice = grid number 36 = 6 (remainder of 0) + 36 = index 0
      //choice = grid number 37 = 37/6 = 6.1 (remainder of 1) = 37
      //choice = grid number 38 = 38/6 = 6.3 (third position)
      let choice = Number(e.target.id) % width + 36 //without the modulus we get undefined and can only select one grid - this gives you the bottom row to start
      console.log('choice mod --->',cells[choice] % 6 )  //expected return NaN then the index

      while (cells[choice].classList.contains('yellow') || (cells[choice].classList.contains('red'))) {
        //the cell above must be chosen if there is already a 🟡 or 🔴 piece there and I can find this by subtracting the width
        choice = choice - width
        console.log('choice---->', choice) //console log to show that the choice is the correct index
      }
      
      //add a yellow piece as you are player 1 (rules of the game yellow goes first) - reference my CSS property here to pick the new background as the index is an id
      cells[choice].classList.add('yellow')  
      player1Choice = [choice]
  
      let index = choice + 1
      //check across using the width and the player 1 index position as per the const checkPlayer
      while (index % width !== 0 && checkPlayer1(index)) {
        //keep checking until we get to zero on the grid then if no winner...
        index++  
        console.log('check the index--->', index)
      }
      //check & loop backwards
      index = choice - 1

      //Player 1 check across the cells left and right or right and left
      //while the index plus 1 (which is equal to the length in real terms)
      while ((index + 1) % width !== width - 1 && index % width !== width - 1 && checkPlayer1(index)) {    
        //keep checking backwards
        index--
      }
      //if player1 has 4 in a row across the cells then add 1 to their score & log it to the console with the win message
      if (player1Choice.length >= 4) {
        console.log('You won across the grid!! 🟡') 
        playerOneScore++
        console.log(playerOneScore) //this is just for my benefit while checking logic is working and can be removed later
        console.log('Show player1 choice',player1Choice) //just to check can be deleted later
      }

      //CHECK THE DIAGONAL GRID 36 -> 5// 
      player1Choice = [choice]
      
      index = choice + width - 1

      //check dimensions of the grid created - while the index is in the dimension of the grid 
      //in this case we need to check more than rows [0-5,6-11 etc] so width * height rather than just width
      while ((index + 1) % width !== 0 && index <= width * height - 1 && checkPlayer1(index)) {
        //index + 5 will be the cell diagonally below the index chosen [16,21,26,31]
        index += (width - 1)

      }
      // - 7 on the player choice
      index = choice - width + 1
      //while these conditions are true keeping checking(size of grid and not 0 or 5)
      while (index % width !== width - 1 && index <= width * height - 1 && checkPlayer1(index)) { 
        //index = index - 7 right to left cells which will give the cell diagonally above in the grid [41,34,27,20]
        index -= (width + 1)
      }
      
      while (choice > 5 && checkPlayer1(index)) {
        player1Choice = [choice]
      }
      //winning line - console log this and add to the score array
      if (player1Choice.length >= 4) {
        console.log('winner winner chicken dinner 36-5 diagonal win 🟡')
        playerOneScore++
      }

      player1Choice = [choice]

      //  Check the grid from 0 --> 41 top left to bottom right
      // Whatever the index choice is take 7 which brings you to the cell directly above diagonally from the index
      index = choice - width - 1
      //check we are past the top row and that it is a player used class of yellow - start from the
      while ((index + 1) % width !== 0 && index >= width && checkPlayer1(index)) {
        // index - 5 = diagonal cell above right on the grid - loop through this way [38,33,28,23]
        index -= width - 1

      }
      //Whatever the choice we add 7 and we can check the grid diagonally below right 
      index = choice + width + 1
      //While index is not equal to 0 and index is less than or equal to 41
      while (index % width !== 0 && index <= width * height - 1 && checkPlayer1(index)) { 
        //check the 7th cell below [1,8,15,21]
        index += width + 1
      }
      //winning choice here 
      if (player1Choice.length >= 4) {
        console.log('Top Left to Bottom Right winnnnner!! 🟡')
        playerOneScore++
        
      }
        
      player1Choice = [choice]
      
      
      //BOTTOM INDEX OF THE GRID TO THE TOP//
      
      //start with the choice and take 6
      index = choice - width
      //loop through the grid if there is a yellow class there and the index is more than or equal to 6 aka not the top row
      while (index >= width && checkPlayer1(index)) {
        //index - 6 should give the cell above the checkPlayer1 cell to loop/check [40,34,28,22]
        index = choice - width
      }
      //index to choose -> id on the grid + 6
      index = choice + width
      //while the index is less than or equal to 41 & there is a player1 yellow class in that slot
      while (index <= width * height - 1 && checkPlayer1(index)) {
        //index should + 6 and can check top row [4,10,16,22]
        index = index + width 
        //If more than or equal to 4 (in case of a big win!) then add 1 to the player 1 score and log it to the console
        if (player1Choice.length >= 4) {
          console.log('up up down down win 🟡')
          playerOneScore++
          console.log('player 1 score--->', playerOneScore)
        }
      }
      player1Choice = []
      player = players[1]
      
    } else {

      let nextChoice = Number(e.target.id) % width + 36

      while (cells[nextChoice].classList.contains('yellow')|| cells[nextChoice].classList.contains('red')) {
        nextChoice = nextChoice - width
      }
      cells[nextChoice].classList.add('red')

      player2Choice = [nextChoice]

      let index = nextChoice + 1

      while (index % width !== 0 && checkPlayer2(index)) {
        index++
      }

      index = nextChoice - 1

      while (index % width !== width - 1 && checkPlayer2(index)) {
        index--
      }
      if (player2Choice.length >= 4) {
        playerTwoScore++
        console.log('Player 2 wins across the board')
      }

      player2Choice = [nextChoice]


      index = nextChoice + width - 1

      while (index % width !==0 && index <= width * height - 1 && checkPlayer2(index)) {
        index -= (width + 1)

        if (player2Choice.length >= 4) {
          playerTwoScore++
          console.log('Player 2 wins diagonal')
        }
      }
    }
  }
  

  //Events
  grid.addEventListener('click', startGame)
  createGrid()
}
window.addEventListener('DOMContentLoaded', init) 