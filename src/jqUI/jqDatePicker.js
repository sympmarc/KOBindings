define(["jquery", "jqueryui", "moment"], function($, jqueryui, moment) {


    /* Based on this implementation from RP Niemeyer:
     http://stackoverflow.com/questions/6612705/jquery-ui-datepicker-change-event-not-caught-by-knockoutjs
     */
    ko.bindingHandlers.jqDatePicker = {

        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var params = valueAccessor() || {};
            var observable = params.value;
            var options = params.options;

            var el = $(element);
            var val = ko.utils.unwrapObservable(observable);
            var setValue = val !== undefined ? val.format("MM/DD/YYYY") : "";

            // Initialize with options
            setTimeout(function () {
                el.datepicker(options);
                el.val(setValue);
            }, 0);

            //handle the field changing by registering datepicker's changeDate event
            ko.utils.registerEventHandler(element, "changeDate", function () {
                observable(el.datepicker("getDate"));
            });
            //handle the field changing by registering datepicker's changeDate event
            el.change(function () {
                observable(moment(el.datepicker("getDate")));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                el.datepicker("destroy");
            });

        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {

            var params = valueAccessor() || {};
            var observable = params.value;

            var el = $(element);
            var val = ko.utils.unwrapObservable(observable);
            var setValue = val !== undefined ? val.format("MM/DD/YYYY") : "";

            var current = el.datepicker("getDate");

            if (setValue !== current) {
                el.datepicker("setDate", setValue);
            }
        }

    };

}
