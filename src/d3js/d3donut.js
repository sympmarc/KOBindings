/* Draw an interactive donut on the page with the d3 library
 / Example: <div data-bind="d3Donut: { dataset: StatusesCounts, filter: $root.FilterStatus, filterName: 'Status', labelName: 'label', valueName: 'value', width: 200, height: 100, innerRadius: 25, outerRadius: 0 } "></div>
 / dataset: array of objects [{ label: "xxx", value: 12345}]
 / labelName: attribute in the array for the segment labels
 / valueName: attribute in the array for the segment values
 / filterName: selected label will be passed back to this observable
 / [other d3js options] Currently uses:
 / width, height, innerRadius, outerRadius
 */
ko.bindingHandlers.d3Donut = {

    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

        var params = valueAccessor();
        var dataset = params.dataset();

        var el = $(element);

        var dataValues = dataset.map(function (d) {
            return d[params.valueName];
        });
        var dataLabels = dataset.map(function (d) {
            return d[params.labelName];
        });

        var w = params.width,
            h = params.height,
            r = Math.min(w, h) / 2,        // arc radius
            dur = 750,                     // duration, in milliseconds
            color = d3.scale.category10(),
            donut = d3.layout.pie().sort(null),
            arc = d3.svg.arc().innerRadius(r - params.innerRadius).outerRadius(r - params.outerRadius);

        var svg = d3.select(el[0]).append("svg:svg")
            .attr("width", w).attr("height", h);

        var arc_grp = svg.append("svg:g")
            .attr("class", "arcGrp")
            .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

        var label_group = svg.append("svg:g")
            .attr("class", "lblGroup")
            .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

        // GROUP FOR CENTER TEXT
        var center_group = svg.append("svg:g")
            .attr("class", "ctrGroup")
            .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

        // CENTER LABEL
        var pieLabel = center_group.append("svg:text")
            .attr("dy", ".35em").attr("class", "chartLabel")
            .attr("text-anchor", "middle")
            .text(params.filterName)
            .on("click", function (d, i) {
                arcs.each(function (d) {
                    this.style.strokeWidth = .5
                }); // Clear
                params.filter(undefined);
            });

        // DRAW ARC PATHS
        var arcs = arc_grp.selectAll("path")
            .data(donut(dataValues));
        arcs.enter().append("svg:path")
            .attr("stroke", "white")
            .attr("stroke-width", 0.5)
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc)
            .each(function (d) {
                this._current = d
            })
            .on("click", function (d, i) {
                arcs.each(function (d) {
                    this.style.strokeWidth = .5
                }); // Clear
                params.filter(dataLabels[i]);
                this.style.strokeWidth = 5; // Highlight
            })

            // Draw on initiation
            .transition().delay(function (d, i) {
                return i * 100;
            }).duration(500)
            .attrTween('d', function (d) {
                var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return function (t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });

        // Append labels
        // DRAW SLICE LABELS
        var sliceLabel = label_group.selectAll("text")
            .data(donut(dataValues));
        sliceLabel.enter().append("svg:text")
            .attr("class", "arcLabel")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .text(function (d, i) {
                return dataset[i][params.labelName];
            })
            .on("click", function (d, i) {
                arcs.each(function (d) {
                    this.style.strokeWidth = .5
                }); // Clear
                params.filter(dataLabels[i]);
                arcs[0][i].style.strokeWidth = 5; // Highlight
            })


    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {

        var params = valueAccessor();
        var filter = params.filter;

        var el = $(element);


    }

};