
////***** Binding Handler ******////
// Here's a custom Knockout binding that makes elements shown/hidden via jQuery.
ko.bindingHandlers.jqFadeVisible = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();

        //Parameter trigger provides dom element that initaties show or hide
        var valueUnwrapped = ko.unwrap(value);

        if(valueUnwrapped == true)
        {
        	$(element).fadeIn();
		}
        else
		{
     	   $(element).fadeOut();
    	}

        //Disposal Logic
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).off();
        });//end disposal logic        
    } //end init
};