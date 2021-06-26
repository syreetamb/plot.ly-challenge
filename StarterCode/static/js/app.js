d3.json("samples.json").then(({names})=>{
    names.forEach(name => {
        d3.select('select').append('option').text(name)
    });
    renderData();
});

function optionChanged() {
  renderData();  
};

function renderData() {
    var sel = d3.select('select').node().value;
    d3.select(".panel-body").html("");
    d3.json('samples.json').then(({metadata,samples})=>{
        metadata = metadata.filter(obj=> obj.id == sel)[0]
        samples = samples.filter(obj=> obj.id == sel)[0]

        Object.entries(metadata).forEach(([key, val])=>{
            d3.select(".panel-body").append("h5").text(key + ": " + val)
        })
    })
}