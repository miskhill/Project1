function init() {

  const grid = document.querySelector('.grid')

  const width = 6
  const height = 7
  const cellCount = width * height
  const cells = []


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }





  createGrid()
}

window.addEventListener('DOMContentLoaded', init)