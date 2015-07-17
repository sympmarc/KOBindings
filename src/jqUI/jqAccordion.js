// jQueryUI datepicker


ko.bindingHandlers.jqAccordion = {

    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var options = valueAccessor() || {};

        // Initialize with options
        // Note that we hide/show the accordion to reduce flicker
        setTimeout(function() {
            $(element).hide();
            $(element).accordion(options);
            $(element).show();
        }, 0);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).accordion('destroy');
        });


    }

};