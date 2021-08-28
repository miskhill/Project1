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
  function startGame(e){
    
    if (player === players[0]) {

      // index will need to be a number or else it is a string
      // choice needs to be an element in the grid
      // choice is worked out by using the modulus of width and then adding 36 to ensure we are on the bottom row of the cells/grid so 
      // choice = grid number 41 = 6.8 + 36 = 42
      // choice = grid number 36 = 6 (remainder of 0) + 36 = index 0
      //choice = grid number 37 = 37/6 = 6.1 (remainder of 1) = 37
      //choice = grid number 38 = 38/6 = 6.3 (third position)
      let choice = Number(e.target.id) % width + 36

      while (cells[choice].classList.contains('yellow') || (cells[choice].classList.contains('red'))) {
        //the cell above must be chosen if there is already a 🟡 or 🔴 piece there
        choice = choice - width
      }
      
      //add a yellow piece as you are player 1 - reference my CSS property here to pick the new background
      cells[choice].classList.add('yellow', 'fall')  
      player1Choice = [choice]
      //
      let index = choice + 1
      //check across using the width and the player 1 index position as per the const checkPlayer
      while (index % width !== 0 && checkPlayer1(index)) {
        //keep checking
        index++  
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

      //check dimensions of the grid created - while the index is less than the dimension of the grid 
      while ((index + 1) % width !== 0 && index <= width * height - 1 && checkPlayer1(index)) {
      
        index += (width - 1)

      }

      index = choice - width + 1

      while (index % width !== width - 1 && index <= width * height - 1 && checkPlayer1(index)) { 
        
        index -= (width + 1)
      }
      
      while (choice > 5 && checkPlayer1(index)) {
        player1Choice = [choice]
      }

      if (player1Choice.length >= 4) {
        console.log('winner winner chicken dinner 36-5 diagonal win 🟡')
        playerOneScore++
      }

      player1Choice = [choice]

      //  Check the grid from 0 --> 41 top left to bottom right

      index = choice - width - 1
      
      while ((index + 1) % width !== 0 && index >= width && checkPlayer1(index)) {

        index -= width - 1

      }
      
      index = choice + width + 1

      while (index % width !== 0 && index <= width * height - 1 && checkPlayer1(index)) { 

        index += width + 1
      }
      //winning choice here 
      if (player1Choice.length >= 4) {
        console.log('Top Left to Bottom Right winnnnner!! 🟡')
        playerOneScore++
        
      }
        
      player1Choice = [choice]
      
      
      //BOTTOM INDEX OF THE GRID TO THE TOP//
      index = choice - width
      //loop through the grid
      while (index >= width && checkPlayer1(index)) {

        index = choice - width
      }

      index = choice + width

      while (index <= width * height - 1 && checkPlayer1(index)) {


        index = index + width 
        //If more than or equal to 4 then add 1 to the player 1 score and log it to the console
        if (player1Choice.length >= 4) {
          console.log('up up down down win 🟡')
          playerOneScore++
        }
      }
      // player1Choice = []
      // player = players[1]
     //else {
      
      //PLAYER 2 TIME! 

      // let choice2 = Number(e.target.id) % width + 36

      // while (cells[choice2].classList.contains('yellow') || (cells[choice2].classList.contains('red'))) {
      //   choice2 = choice2 - width
      // }
      
      // cells[choice2].classList.add('ysl', 'fall')  

      // player2Choice = [choice2]

      // let index =  choice2 + 1
    }
  }
  
  


  //Events
  grid.addEventListener('click', startGame)
  createGrid()
}
window.addEventListener('DOMContentLoaded', init) 