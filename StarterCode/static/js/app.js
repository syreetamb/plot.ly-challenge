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
        sampleValues = samples.filter(obj=> obj.id == sel).map(row => row.sample_values)[0].slice(0,10)
        otuIds = samples.filter(obj=> obj.otu_ids == sel)[0].slice(0,10)
        otuLabels = samples.filter(obj=> obj.otu_labels == sel)[0].slice(0,10)

        Object.entries(metadata).forEach(([key, val])=>{
            d3.select(".panel-body").append("h5").text(key + ": " + val)
        })


        var trace1 = {

            x: sampleValues,
            y: otuIds,
            type: 'bar', 
            text: otuLabels,
            orientation: 'h'
    
        }
    
        var data = [trace1]
    
        var layout = {
            title: "Top 10 OTUs Found On Each Individual" 
        }
    
        Plotly.newPlot("bar", data, layout)

        var trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: otuIds,
              size: sampleValues
            }
          };
          
        var data = [trace2];
          
        var layout2 = {
            title: 'Top 10 OTUs Found On Each Individual',
            showlegend: false,
        
        };
          
        Plotly.newPlot("bubble", data, layout2);

    })
};

