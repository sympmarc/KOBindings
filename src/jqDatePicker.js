ko.bindingHandlers.jqDatePicker = {

    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var options = valueAccessor() || {};

        setTimeout(function() {
            $(element).datepicker(options);
        }, 0);
    }

};