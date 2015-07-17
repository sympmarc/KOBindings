//jQuery Data Table Custom Binding
ko.bindingHandlers.jqDataTables = {

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // First get the latest data that we're bound to
        var parameters = valueAccessor() || {};

        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.unwrap(parameters);

        //Handle boolean to either setup DataTable or Not
        var initialize = valueUnwrapped.initialize;

        initialize.subscribe(function (newValue) {
            if (newValue === true) {
                //Get Data Table options
                var dTOptions = ko.unwrap(valueUnwrapped.options) || {};

                var temp = $(element).DataTable(dTOptions);
                valueUnwrapped.oTable(temp);
            }
        });

        //Handle DataTable object expected as observable
        oTable = valueUnwrapped.oTable;

        //Get observable array of data         
        var dataArray = valueUnwrapped.data;

        if (typeof dataArray == 'function') { //Needs to be an observable
            //Subscribe to changes to handle add event
            dataArray.subscribe(function (changes) {
                //Check if any of these events were an addition of a row
                var result = ko.utils.arrayFirst(changes, function(item) {
                    return item.status == 'added';
                });
                //If an additional row was made
                if(result)
                {
                    if (oTable()) {//Destory Data Table
                        oTable().destroy();
                        oTable(null);
                    }//end if                    
                }//end check for result
            }, null, "arrayChange");

            //Build Function for KO-Reactor watch capability
            var x = function (parents, child, item) {
                if (oTable()) {
                    if (item === undefined) { //Undefined means a change occured
                        oTable().rows().invalidate(); //Refresh cache
                    } else if (item.status == 'deleted') {
                        //We assume that rowId property exists
                        //Search for row
                        var row = oTable().row('#' + item.value.rowId());
                        //Remove row
                        row.remove();
                        //Redraw
                        oTable().draw();
                    }
                }//end oTable check
            }; //end x

            // Initiate view ko watch on this data array
            ko.watch(dataArray, {
                depth: -1,
                keepOldValues: 1,
                tagParentsWithName: true
            }, x); //end ko.watch             

        } //end if dataArray

        //Disposal Logic
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            if(oTable()){
                oTable().destroy();
                oTable(null);
            }
        });//end disposal logic

    }//end init
};


//Base View Model for Handling JQuery DataTables
(function (ko) {
    ko.BaseDataTableViewModel = function (self, tableId) {
        //@property the Data Table Object
        self.oTable = ko.observable();

        //@property The table's DOM id
        self.tableId = ko.observable(tableId);

        //@property Data Table Options
        self.dTOptions = ko.observable({bSort:true});

        //@property Is Data Table loaded
        self.isDTLoaded = ko.observable(false);

        self.afterAddFunc = function (el, data, index) {
            if(self.oTable() == undefined)//only run if self.oTable does not have a Data Table object already
            {
                self.oTable($('#' + self.tableId()).DataTable(self.dTOptions()));   
            }//end check if undefined            
        };
    };//end BaseDataTableViewModel
}(ko));
