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




  function checkPlayer1(index) {
    //if a cell has a yellow
    if (cells[index].classList.contains('yellow')) {
      //than push that to player 1 array
      player1Choice.push(index)
      return true
    } return false
  }

  function checkPlayer2(index) {
    //if a cell has a red 
    if (cells[index].classList.contains('red')) {
      //then push that to player 2 array
      player2Choice.push(index)
      return true
    } return false
  }


  // function to start the game 😁
  function startGame(e){
    
    if (player === players[0]) {

      // index will need to be a number or else it is a string
      // choice needs to be an element in the grid
      // choose it based on the modulus 
      let choice = Number(e.target.id) % width + 36

      while (cells[choice].classList.contains('yellow') || (cells[choice].classList.contains('red'))) {
        choice = choice - width
      }
      
      cells[choice].classList.add('yellow', 'fall')  
      player1Choice = [choice]

      let index =  choice + 1

      while (index % width !== 0 && checkPlayer1(index)) {
        index++
          
      }

      index = choice - 1

      //Player 1 check across the cells left and right or right and left
      while ((index + 1) % width !== width - 1 && index % width !== width - 1 && checkPlayer1(index)) {    

        index--
      }
      //if player1 has 4 in a row across the cells then add 1 to their score & log it to the console with the win message
      if (player1Choice.length >= 4) {
        console.log('You won across the grid!!')
        playerOneScore++
        console.log(playerOneScore)
      }

      //CHECK THE DIAGONAL GRID 36 - 5// 
      player1Choice = [choice]

      index = choice + width - 1

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
        console.log('winner winner chicken dinner 36-5 diagonal win')
        playerOneScore++
      }

      player1Choice = [choice]

      // 3RD LOOP - DIAGONAL TOP LEFT TO BOTTOM RIGHT

      index = choice - width - 1
      
      while ((index + 1) % width !== 0 && index >= width && checkPlayer1(index)) {

        index -= width - 1

      }
      
      index = choice + width + 1

      while (index % width !== 0 && index <= width * height - 1 && checkPlayer1(index)) { 

        index += width + 1
      }

      if (player1Choice.length >= 4) {
        console.log('Top Left to Bottom Right winnnnner!!')
        playerOneScore++
        
      }
        
      player1Choice = [choice]
      
      
      //BOTTOM INDEX OF THE GRID TO THE TOP//
      index = choice - width

      while (index >= width && checkPlayer1(index)) {

        index = choice - width
      }

      index = choice + width

      while (index <= width * height - 1 && checkPlayer1(index)) {


        index = index + width 
        //If more than or equal to 4 then add 1 to the player 1 score and log it to the console
        if (player1Choice.length >= 4) {
          console.log('up up down down win')
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