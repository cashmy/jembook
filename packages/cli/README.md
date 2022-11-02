# JEmBook

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

- It operates a little like a Jupyter notebook in that you can have many "cells".
- There are two types of cells: text and code.
- Click any text cell to edit it - it has a full markdown editor.
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!
- You can show any React component, string, number, or anything else by calling the `show ` function. This is a function built into this environment. Call show multiple times to show multiple values.
- Re-order or delete cells using the buttons on the top right.
- Add new cells by hovering on the divider between each cell.

All of your changes get saved to the file you opened JEmBook with. So if you ran `npx jembook serve test.js` , all of the text and code you write will be save to the `test.js` file.

### Example Code Cells 

<img src="https://github.com/cashmy/Images/blob/main/media/JEmBook_code_cells.png">