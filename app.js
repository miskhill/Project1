function init() {

  const grid = document.querySelector('.grid')

  const width = 6
  const height = 7
  const cellCount = width * height
  const cells = []

  const startingPosition = 0

  //function to create the grid
  function createGrid(startingPo) {
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





  createGrid(startingPosition)
}

window.addEventListener('DOMContentLoaded', init)