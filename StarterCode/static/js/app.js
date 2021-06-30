d3.json("samples.json").then(({ names }) => {
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
    d3.json('samples.json').then(({ metadata, samples }) => {
        metadata = metadata.filter(obj => obj.id == sel)[0]
        samples = samples.filter(obj => obj.id == sel)[0]

        Object.entries(metadata).forEach(([key, val]) => {
            d3.select(".panel-body").append("h5").text(key + ": " + val)
        });

        var trace1 = {
            x: samples.sample_values.slice(0, 10).reverse(),
            y: samples.otu_ids.slice(0, 10).reverse().map(id => "OTU " + id),
            type: 'bar',
            text: samples.otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        }

        var data = [trace1]

        var layout = {
            title: "Top 10 OTUs Found On Each Individual"
        }

        Plotly.newPlot("bar", data, layout)

        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: 'markers',
            marker: {
                color: samples.otu_ids, 
                size: samples.sample_values
            }
        };

        var data = [trace2];

        var layout2 = {
            title: 'Top 10 OTUs Found On Each Individual',
            showlegend: false,

        };

        Plotly.newPlot("bubble", data, layout2);


        
        var data = [
            {
                domain: { x: [0,1], y: [0,1] },
                value: metadata.wfreq,
                title: { text: "Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge:{axis:{range:[0,9]}, bar:{color: 'red'}}
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot("gauge", data, layout);
                
    })
};

