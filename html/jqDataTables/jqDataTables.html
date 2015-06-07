<!doctype html>
    <head>
<meta name="WebPartPageExpansion" content="full" />
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>KO Bindings For JQuery DataTables</title>
		
		<link href="https://cdn.datatables.net/1.10.7/css/jquery.dataTables.min.css" rel="stylesheet" media="all"/>
    </head>
    <body>
    <h1>jQuery DataTables Example</h1>
    
<button data-bind="click: addItem">Add Item</button>
<br/>
<table id="example" data-bind="jqDataTable: {initialize: isDTLoaded, oTable: oTable, options: dTOptions, data: rows.data}, with: rows">
    <thead>
        <tr>
            <th>Action</th>
            <th>First Column</th>
            <th>Second Column</th>
            <th>Third Column</th>
        </tr>
    </thead>
    <tbody data-bind="foreach: { data: data, afterAdd: $root.afterAddFunc }">
        <tr data-bind="attr: {id: rowId}">
            <td>
                <button data-bind="click: $root.deleteItem">Delete</button>
            </td>
            <td> <span>
                <input data-bind="value:firstColumn, valueUpdate: 'input'"></input>
                </span>

            </td>
            <td data-bind="text:secondColumn"></td>
            <td data-bind="text:computedColumn"></td>
        </tr>
    </tbody>
</table>


	<!-- Scripts via CDN change these is you have issues with CDN or local versions to work with on SharePoint -->
	<script src="http://code.jquery.com/jquery-1.11.3.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-debug.js"></script>
	<script src="http://cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
	<!--https://github.com/ZiadJ/knockoutjs-reactor-->
	<script src="../../src/jqDataTables/knockout-reactor.js"></script>
	<!-- Bindings-->
	<script src="../../src/jqDataTables/jqDataTables.js"></script>	
	<script>

/* This View Model represents a single row*/
var rowVM = function (id, firstValue, secondValue) {

    var self = this;

    self.id = ko.observable(id);

    self.rowId = ko.computed(function () {
        return "row-" + self.id();
    }, this);

    self.firstColumn = ko.observable(firstValue);

    self.secondColumn = ko.observable(secondValue);

    /*@function computed column*/
    self.computedColumn = ko.computed(function () {
        return self.firstColumn() + ' ' + self.secondColumn();
    }, this);
};

/* This View Model represents a collection of rows*/
var rowsVM = function () {

    var self = this;

    self.data = ko.observableArray();
    /*@function Add Row to rows*/
    self.addRow = function (row) {
        self.data.push(row);
    };

};

/* This View Model represents a table*/
var tableVM = function (rows) {
    var self = this;
    /*View Model reference*/
    self.rows = rows;
    ko.BaseDataTableViewModel(self, 'example');

    /*Delete row function*/
    self.deleteItem = function (row) {
        self.rows.data.remove(row);
    }; //end delete Item

    /*Before you Add*/
    self.addItem = function () {
        var temp = new Date().getTime();
        self.rows.addRow(new rowVM(temp, temp, 'Some Value'));
    }; //end addItem

};

/*Run Bindings*/
var testRows = new rowsVM();
for (var i = 0; i < 4; i++) {
    var tempD = new Date().getTime();
    testRows.addRow(new rowVM(tempD + '-' + i, tempD, 'Some Value'));
}
console.clear();
var testTable = new tableVM(testRows);

//Apply Bindings
ko.applyBindings(testTable);

//Tell to Data Table Loaded
testTable.isDTLoaded(true);


	</script>
	
    </body>
</html>



