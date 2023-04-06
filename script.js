const movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

let width = 1000;
let height = 600;
const svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height);

d3.json(movieDataUrl)
  .then((data)=>{

    let hierarchy = d3.hierarchy(data, (node)=>{
        return node.children;
    }).sum((node =>{
        return node.value;
    })).sort((node1,node2)=>{
        return node2.value - node1.value;
    })

    let treeMap = d3.treemap().size([width,height]);
    treeMap(hierarchy);

  })
  .catch((error) => console.log(error));