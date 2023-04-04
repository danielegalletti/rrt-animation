# Rapidly-exploring random tree with javascript
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This small project aims to show the evolution of the algorithm of the Rapidly-exploring random tree.
Rapidly-exploring random tree algorithm is used to plan the motion of mobile robots. It uses random sampling of points on configuration space ($C$ space). It is very useful especially in $C$ spaces with high dimensionality, when normal sampling methods, like roadmaps and cell decompositions, are not efficient.

## How to use
Open the file `index.html` in your browser. You can change the speed of the simulation by clicking on the button in the top right corner. From the javascript code, you can change the color of the points and edges and add more stopping conditions of the algorithm.
The value of the 'delta' defines the distance between two points in the tree. Tuning this value will change the 'resolution' of the tree. 
To start the simulation just click on the canvas. The canvas size is adjusted on the window size. To refresh the canvas, reload the page.

## Example

An example of the simulation is shown below.
![Example](example.gif)

## References
- [Rapidly-exploring random tree](https://en.wikipedia.org/wiki/Rapidly-exploring_random_tree)

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Daniele Galletti - in/danielegalletti/ - galletti.dan@gmail.com
