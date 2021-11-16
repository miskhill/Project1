
# Project 1 - Connect 4 game!

  

## Overview

  

This was my first solo project on the General Assembly Software Engineering Immersive course (Week 4).

  

## Project Brief


  

## Approach

I used Trello to organise my time and added in all functionality that I would expect to have to implement. As the project moved on I added further functionality or removed areas that I realised I no longer needed. I split the areas into HTML, CSS and JavaScript. Sections were moved to completed when the code was completed.
  

![Trello Planning](https://github.com/miskhill/Project1/blob/main/Screenshots/Trello%20ongoing.png)

  

![Game image](https://github.com/miskhill/Project1/blob/main/Screenshots/Connect%204%20ongoing.png)

  
  
  

## Technologies Used

  

1. HTML5

2. CSS

3. JavaScript

4. Trello

  

## Deployment

  

The game is deployed on GitHub Pages and it can be found here https://miskhill.github.io/Project1/

  

## Features:

  

- Connect 4 original style.

- Timeout functions utilised for game end situations.

- CSS transitions for a more engaging browser experience.

- Updated score.

- Auto colour change each game.

  

## Game Architecture and Challenges

  
  

Connect 4 is a game where players attempt to make a line of four pieces in a 7 x 6 grid. Players can drop their pieces into columns, so that their piece rests in the lowest available space in that column.

  

The winner is the first to create a line of four in any direction, including diagonally. If the board is filled before a line of 4 can be made, the game is declared a draw.

  

**Grid creation:**

  

- JavaScript grid utilised to create the grid size rather than just multiple div's built into the HTML.

  

![create grid code](https://github.com/miskhill/Project1/blob/main/Screenshots/gridcreate.png)

  

**Checking the board for a winning move after every turn:**

  

- Utilising while loops to check the areas on the grid there might be player moves.

  
  

**Checking diagonally across the board:**

  

- Index of 36 -5 must be checked throughout.

- Index of 0 - 41 must also be checked for winning moves!

  

![Win check code](https://github.com/miskhill/Project1/blob/main/Screenshots/win%20code.png)

## Wins

  

- Solid planning, time management and implementation.

- JavaScript logic implemented well.

- Code well commented and structured.

- I liked the overall style created with CSS.

----------
  
## Challenges

  

- Keeping many lines of logic consistent over two players.

- Changing colour pieces per player.

----------

## Key Learns

- Planning and organisation was key to completing this within the time frame and moving forward I would use wire-framing as well especially when I move into React and more components.

- Passing in functionality rather than making large complex functions which was tempting sometimes! 
- I refactored some of my code as the project time frame was closing in. It was a good learning experience as I liked reducing the amount of code and making it more readable.

----------

## Future improvements

  

- CPU intelligent moves.

- Difficulty levels of the game.

- Option to change your own colour.

- Game rule page.

----------

  

## [](https://miskhill.github.io/Project1/#author)Author

  

Gary Smith
