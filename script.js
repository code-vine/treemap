const movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

let movieData

const svg = d3.select("svg")
              .attr("width", 1000)
              .attr("height", 600);