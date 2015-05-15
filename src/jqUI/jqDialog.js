// Custom binding to initialize a jQuery UI dialog
ko.bindingHandlers.jqDialog = {

    init: function(element, valueAccessor) {

        var options = ko.utils.unwrapObservable(valueAccessor()) || {};

        // Handle disposal
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).dialog("destroy");
        });

        // Initialize with options
        setTimeout(function() {
            $(element).dialog(options);
        }, 0);
    }

};