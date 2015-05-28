<!doctype html>
    <head>
<meta name="WebPartPageExpansion" content="full" />
<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=8">
        <title>KO Bindings For SharePoint 2010 People Picker</title>
		
		<!--Styles-->
		<link href="http://code.jquery.com/ui/1.11.4/themes/black-tie/jquery-ui.css" rel="stylesheet"/>
		
    </head>
    <body>
    	<h1>KO Bindings For SharePoint 2010 People Picker</h1>
		<div>
			<span data-bind="text: userDisplay" style="padding-right:5px"></span>
			<img data-bind="spPeoplePicker: userInformation" src="/_layouts/images/addressbook.gif"/>
		</div>

	<!-- Scripts via CDN change these is you have issues with CDN or local versions to work with on SharePoint -->
	<script src="/_layouts/1033/init.js"></script>
	<script src="/_layouts/1033/core.js"></script>
	<script src="http://code.jquery.com/jquery-1.11.3.js"></script>
	<script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-debug.js"></script>
	
	<!-- Bindings-->	
	<script src="../../src/spPeoplePicker/spPeoplePicker.js"></script>
	<script>    
    $(document).ready(function(){
    
		var exViewModel = function(){
				var self = this;

				//User Information
				self.userInformation = ko.observable();
				
				//
				self.userDisplay = ko.computed(function(){
					if(self.userInformation() == null)
					{
						return "Nobody";
					}
					else
					{
						return "UserID: " + self.userInformation().userId + " | User Name: " + self.userInformation().userName;
					}
				});
				
				
			};
			
			//Apply Bindings;
			ko.applyBindings(exViewModel);    
    });
	
    
	
	</script>
	
    </body>
</html>



