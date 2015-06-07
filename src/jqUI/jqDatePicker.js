// jQueryUI datepicker


ko.bindingHandlers.jqDatePicker = {

    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var options = valueAccessor() || {};

        // Initialize with options
        setTimeout(function() {
            $(element).datepicker(options);
        }, 0);


        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).datepicker('destroy');
        });        
    }

};