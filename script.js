const movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

let colors = {Action:"orange", Drama:"lightpink", Adventure:"lightgreen",
              Family:"CadetBlue",Animation:"Chocolate",Comedy:"Gold",
              Biography:"Grey"}

const width = 1000;
const height = 600;
const svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height);

const tooltip = d3.select("#tooltip");

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
    let movies = hierarchy.leaves();
    let tile = svg.selectAll('g')
       .data(movies)
       .enter()
       .append('g')
       
    
    tile.append('rect')
       .attr('class','tile')
       .attr('fill', (m)=>{
        return colors[m.data.category]
       })
       .attr("transform", (m) => {
        return `translate(${m['x0']}, ${m['y0']})`;
       })
       .attr("width", (m) => {
        return m['x1']- m['x0'];
       })
       .attr("height", (m) => {
        return m['y1']- m['y0'];
       })
       .attr("data-name",(m)=>m.data.name)
       .attr("data-category", (m)=>m.data.category)
       .attr("data-value",(m)=>m.data.value)
       .style("outline", "1px solid white")
    
    tile.append('text')
        .text((m) =>{
            return m.data.name;
        })
        .attr("x",(m) => {
            return m['x0'] + 5})
        .attr('y',(m) => {
            return m['y0'] + 15;
        })
        .style("font-size", 10)
        .style("word-break", "break-all")

    tile.on('mouseover', (event, data)=>{
        tooltip.style('opacity', 0.75);
        tooltip.html(
            `${data.data.name} ${data.data.category} $${data.value}`
        )
        .attr('data-value', data.value)
        .style('left', event.pageX + 15 + 'px')
        .style('top', event.pageY + 'px')
        .style('color', colors[data.data.category]);
    }).on('mouseout', (event,data)=>{
        tooltip.style('opacity', 0.0);
    });
    
    let legend = d3.select('#legend')
    .append("g")
    .selectAll('rect')
    .data(Object.keys(colors))
    .enter();

    legend.append('rect')
    .attr('class', 'legend-item')
    .attr('x', (c)=>    5 )
    .attr('y', (c,i)=>  i * 15 +10 )
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', d => colors[d])

    legend.append('text')
    .attr('x', (c)=>    25 )
    .attr('y', (c,i)=>  i * 15 +23 )
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', d => colors[d])
    .text((m)=> m)

        
  })
  .catch((error) => console.log(error));