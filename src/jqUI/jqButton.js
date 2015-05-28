// Custom binding to initialize a jQuery UI button
ko.bindingHandlers.jqButton = {

    init: function(element, valueAccessor) {
        var options = ko.utils.unwrapObservable(valueAccessor()) || {};

        // Handle disposal
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).button("destroy");
        });

        // Initialize with options
        setTimeout(function() {
            $(element).button(options);
        }, 0);

    }

};