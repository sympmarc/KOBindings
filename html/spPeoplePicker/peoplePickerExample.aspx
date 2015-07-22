<!doctype html>
    <head>
<meta name="WebPartPageExpansion" content="full" />
<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=8">
        <title>KO Bindings For SharePoint 2010 People Picker</title>
		
		<!--Styles-->
		<link href="http://code.jquery.com/ui/1.11.4/themes/black-tie/jquery-ui.css" rel="stylesheet"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<style type="text/css">
			.people-picker-list {
				padding-left: 0px;
			  	margin-bottom: 0px;
			}

			.people-picker-list > li {
			    display: inline-block;
			    margin-right: 5px;
			  	font-size: smaller;
			 	border-bottom: black;
			  	border-bottom-width: thin;
			  	border-bottom-style: dashed;
			}
		</style>
		
    </head>
    <body>
	<h1>KO Bindings For SharePoint 2010 People Picker</h1>
	<div class="input-group">
		<div class="input-group-addon">
			<ul class="people-picker-list" data-bind="foreach: userList">
				<li data-bind="css: {'text-danger' : !valid}">
					<span data-bind="text: displayName"></span>
					<span class="glyphicon glyphicon-remove" style="display:none"
					data-bind="visible: $data, click: removeUser"></span>
				</li>
			</ul>	
		</div>
		<input type="text" class="form-control" id="inputGroup" data-bind="spPeopleChecker: userInformation">
		<span class="input-group-addon"><img data-bind="spPeoplePicker: userInformation" src="/_layouts/images/addressbook.gif"/></span>
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
    $(document).ready(function() {

    	var exViewModel = function() {
    		var self = this;

    		//User Information
    		self.userInformation = ko.observable();
    		self.userList = ko.observableArray();

    		//
    		self.userDisplay = ko.computed(function() {
    			if (self.userInformation() != null) {
    				self.userList.push({
    					"UserID": self.userInformation()[0].userId,
    					"displayName": self.userInformation()[0].displayName,
    					"loginName": self.userInformation()[0].loginName,
    					"valid": self.userInformation()[0].userId ? true : false
    				});
    			}
    		});

    		self.removeUser = function(user) {
    			self.userList.remove(user);
    		}


    	};

    	//Apply Bindings;
    	ko.applyBindings(exViewModel);
    });
	
    
	
	</script>
	
    </body>
</html>



