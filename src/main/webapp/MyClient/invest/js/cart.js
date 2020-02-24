var selectedClientCode;
var lumpsumOrderId = [];
var sipOrderId = [];
var switchOrderId = [];
var stpOrderId = [];
var swpOrderId = [];
var selectedMode;
$(document).ready(function() {
	
	
	jQuery.fn.popupwindow = function(p)
	
	{


		var profiles = p || {};

		return this.each(function(index){
			var settings, parameters, mysettings, b, a, winObj;
			
			// for overrideing the default settings
			mysettings = (jQuery(this).attr("rel") || "").split(",");

			
			settings = {
				height:600, // sets the height in pixels of the window.
				width:600, // sets the width in pixels of the window.
				toolbar:0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
				scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
				status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
				resizable:1, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
				left:0, // left position when the window appears.
				top:0, // top position when the window appears.
				center:0, // should we center the window? {1 (YES) or 0 (NO)}. overrides top and left
				createnew:1, // should we create a new window for each occurance {1 (YES) or 0 (NO)}.
				location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
				menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
				onUnload:null // function to call when the window is closed
			};

			// if mysettings length is 1 and not a value pair then assume it is a profile declaration
			// and see if the profile settings exists

			if(mysettings.length == 1 && mysettings[0].split(":").length == 1)
			{
				a = mysettings[0];
				// see if a profile has been defined
				if(typeof profiles[a] != "undefined")
				{
					settings = jQuery.extend(settings, profiles[a]);
				}
			}
			else
			{
				// overrides the settings with parameter passed in using the rel tag.
				for(var i=0; i < mysettings.length; i++)
				{
					b = mysettings[i].split(":");
					if(typeof settings[b[0]] != "undefined" && b.length == 2)
					{
						settings[b[0]] = b[1];
					}
				}
			}

			// center the window
			if (settings.center == 1)
			{
				settings.top = (screen.height-(settings.height + 110))/2;
				settings.left = (screen.width-settings.width)/2;
			}
			
			parameters = "location=" + settings.location + ",menubar=" + settings.menubar + ",height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars  + ",status=" + settings.status + ",resizable=" + settings.resizable + ",left=" + settings.left  + ",screenX=" + settings.left + ",top=" + settings.top  + ",screenY=" + settings.top;
			
			jQuery(this).bind("click", function(){
				var name = settings.createnew ? "PopUpWindow" + index : "PopUpWindow";
				winObj = window.open(this.href, name, parameters);
			
				
				if (settings.onUnload) {
					// Incremental check for window status
					// Attaching directly to window.onunlaod event causes invoke when document within window is reloaded
					// (i.e. an inner refresh)
					unloadInterval = setInterval(function() {
						if (!winObj || winObj.closed) {
							clearInterval(unloadInterval);	
							settings.onUnload.call($(this));
						}
					},500);
				}
				
				winObj.focus();
				
				return false;
			});
		});

	};
		var profiles =
		{

			window800:
			{
				height:800,
				width:1250,
				status:1
			}

				};

		function unloadcallback(){
			alert("unloaded");
		};


	   	$(function()
		{
		
	   		$(".popupwindow").popupwindow(profiles);
	   	});	
	
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	var serviceurl = "clientTransact/"+selectedClientId;
	getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	if (data.length == 0) {
	    		 bootbox.confirm({
					  title: "No Client Code Present",
				    	message: "Please create Client Code to Proceed further",
					    	callback: function (result) {
					    		if (result === true) {
					    			$("#idInvest").empty();
					    			$(".dashboardheading").html("Create UCC");
					    			$("#idInvest").load("invest/addCreateUCC.html");
					    		}
		    	 				else{
		    	 					$(".dashboardheading").html("View UCC");
		    	 			    	$("#idInvest").load("invest/viewUCCDetails.html");
	    	 				}	
	    	 				}	
	            		});
	    	} else {
	    		holdingDrop = $("#idClientUCCCombo");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select UCC</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value.clientCode + '" name = "' + value.clientAppName1 + '">' + value.clientCode + '</option>');
				});
	    	}
	    }
});	
$('#idClientUCCCombo').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedClientCode = selectedValue;
	selectedMode = "lumpsum";
	viewLumpsumOrdersInCart();
});
function toggleOrders(id) {
	var checked = $("#checkbox"+id).is(":checked");
	if (checked) {
		lumpsumOrderId.push(id);
	}else {
		var index = lumpsumOrderId.indexOf(id);
		if (index > -1) {
			lumpsumOrderId.splice(index, 1);
		}
	}
		
}
function toggleSipOrders(id) {
	var checked = $("#checkboxSip"+id).is(":checked");
	if (checked) {
		sipOrderId.push(id);
	}else {
		var index = sipOrderId.indexOf(id);
		if (index > -1) {
			sipOrderId.splice(index, 1);
		}
	}
		
}
function toggleSwitchOrders(id) {
	var checked = $("#checkboxSwitch"+id).is(":checked");
	if (checked) {
		switchOrderId.push(id);
	}else {
		var index = switchOrderId.indexOf(id);
		if (index > -1) {
			switchOrderId.splice(index, 1);
		}
	}
		
}
function toggleStpOrders(id) {
	var checked = $("#checkboxStp"+id).is(":checked");
	if (checked) {
		stpOrderId.push(id);
	}else {
		var index = stpOrderId.indexOf(id);
		if (index > -1) {
			stpOrderId.splice(index, 1);
		}
	}
		
}
function toggleSwpOrders(id) {
	var checked = $("#checkboxSwp"+id).is(":checked");
	if (checked) {
		swpOrderId.push(id);
	}else {
		var index = swpOrderId.indexOf(id);
		if (index > -1) {
			swpOrderId.splice(index, 1);
		}
	}
		
}
function viewSTPOrdersInCart() {
	var serviceurl = "viewSTPOrders/"+selectedClientCode;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idSTPCartOrderTBody").empty();
    	var serial = 1;
    	$.each(data, function (index, value) {
    		$("#idSTPCartOrderTBody").append('<tr>' +
        			'<td>' + serial +  '</td>' +
        			'<td>' + (value.amcName) +  '</td>' +
        			'<td>' + (value.fromSchemeName) +  '</td>' +
        			'<td>' + value.toSchemeName +  '</td>' +
        			'<td>' + value.transferAmount +  '</td>' +
        			'<td>' + value.frequencyType +  '</td>' +
        			'<td>' + value.noOfInstallment +  '</td>' +
        			'<td><input type = "checkbox" id="checkboxStp'+value.id+'" onClick="toggleStpOrders('+value.id+')"/></td>' +
    		'</tr>');
    		serial ++;
    	});
    }
}
function viewSWPOrdersInCart() {
	var serviceurl = "viewSWPOrders/"+selectedClientCode;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idSWPCartOrderTBody").empty();
    	var serial = 1;
    	$.each(data, function (index, value) {
    		$("#idSWPCartOrderTBody").append('<tr>' +
        			'<td>' + serial +  '</td>' +
        			'<td>' + (value.amcName) +  '</td>' +
        			'<td>' + (value.schemeName) +  '</td>' +
        			'<td>' + value.schemeType +  '</td>' +
        			'<td>' + value.withdrawalAmt +  '</td>' +
        			'<td>' + value.withdrawalunits +  '</td>' +
        			'<td>' + value.frequencyType +  '</td>' +
        			'<td>' + value.noOfInstallment +  '</td>' +
        			'<td><input type = "checkbox" id="checkboxSwp'+value.id+'" onClick="toggleSwpOrders('+value.id+')"/></td>' +
    		'</tr>');
    		serial ++;
    	});
    }
}
function viewSwitchOrdersInCart() {
	var serviceurl = "viewSwitchOrders/"+selectedClientCode;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idSwitchCartOrderTBody").empty();
    	var serial = 1;
    	$.each(data, function (index, value) {
    		$("#idSwitchCartOrderTBody").append('<tr>' +
        			'<td>' + serial +  '</td>' +
        			'<td>' + (value.amcName) +  '</td>' +
        			'<td>' + (value.fromSchemeName) +  '</td>' +
        			'<td>' + value.toSchemeName +  '</td>' +
        			'<td>' + value.units +  '</td>' +
        			'<td>' + value.amountInvested +  '</td>' +
        			'<td><input type = "checkbox" id="checkboxSwitch'+value.id+'" onClick="toggleSwitchOrders('+value.id+')"/></td>' +
    		'</tr>');
    		serial ++;
    	});
    }	
}
function viewLumpsumOrdersInCart() {
	var serviceurl = "viewLumpsumOrders/"+selectedClientCode;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idLumpsumCartOrderTBody").empty();
    	if (data.length == 0) {
    		$("#idLumpsumCartOrderTBody").append('<tr>' +
        			'<td colspan = "7">No Orders In Cart</td>' +
    		'</tr>');
    	} else {
        	var serial = 1;
        	$.each(data, function (index, value) {
        		$("#idLumpsumCartOrderTBody").append('<tr>' +
            			'<td>' + serial +  '</td>' +
            			'<td>' + (value.amcName) +  '</td>' +
            			'<td>' + (value.schemeName) +  '</td>' +
            			'<td>' + value.schemeType +  '</td>' +
            			'<td>' + value.amountInvested +  '</td>' +
            			'<td>' + value.units +  '</td>' +
            			'<td><input type="checkbox" id = "checkbox'+value.id+'" onClick="toggleOrders('+value.id+')"/></td>' +
        		'</tr>');
        		serial ++;
        	});
    	}
    }
}
function viewSipOrdersInCart() {
	var serviceurl = "viewSIPOrders/"+selectedClientCode;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idSipCartOrderTBody").empty();
    	var serial = 1;
    	$.each(data, function (index, value) {
    		$("#idSipCartOrderTBody").append('<tr>' +
        			'<td>' + serial +  '</td>' +
        			'<td>' + (value.amcName) +  '</td>' +
        			'<td>' + (value.fromSchemeName) +  '</td>' +
        			'<td>' + value.schemeType +  '</td>' +
        			'<td>' + value.regType +  '</td>' +
        			'<td>' + value.installmentAmount +  '</td>' +
        			'<td>' + value.noOfInstallments +  '</td>' +
        			'<td>' + value.frequency +  '</td>' +
        			'<td><input type = "checkbox" id="checkboxSip'+value.id+'" onClick="toggleSipOrders('+value.id+')"/></td>' +
    		'</tr>');
    		serial ++;
    	});
    }
}
function openCity(evt, cityName) {
	if (cityName == "lumpsum") {
		selectedMode = "lumpsum";
		viewLumpsumOrdersInCart();
	}
	if (cityName == "sip") {
		selectedMode = "sip";
		viewSipOrdersInCart();
	}
	if (cityName == "swt") {
		selectedMode = "swt";
		viewSwitchOrdersInCart()
	}
	if (cityName == "stp") {
		selectedMode = "stp";
		viewSTPOrdersInCart();
	}
	if (cityName == "swp") {
		selectedMode = "swp";
		viewSWPOrdersInCart();
	}
	
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

$('#idLumpsum').click(function(){
	var serviceurl = "placeLumpsumOrdersFromCart/"+lumpsumOrderId;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idTBodyCart").empty();
    	$.each(data, function (index, value) {
    		if(value.schemeName == null) {
    			$("#idTBodyCart").append("<tr>" +
    					"<td>Not Available</td>" +
    					"<td>"+value.orderStatus+"</td></tr>");
    		} else {
    			$("#idTBodyCart").append("<tr>" +
				"<td>"+value.schemeName+"</td>" +
				"<td>"+value.orderStatus+"</td></tr>");
    		}
    		
    	});
    }
});
$('#idSip').click(function(){
	var serviceurl = "placeSipOrdersFromCart/"+sipOrderId;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idTBodyCart").empty();
    	$.each(data, function (index, value) {
    		$("#idTBodyCart").append("<tr>" +
    				"<td>"+value.schemeName+"</td>" +
    				"<td>"+value.orderStatus+"</td></tr>");
    	});
    }
});
$('#idSwp').click(function(){
	var serviceurl = "placeSwpOrdersFromCart/"+swpOrderId;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idTBodyCart").empty();
    	$.each(data, function (index, value) {
    		$("#idTBodyCart").append("<tr>" +
    				"<td>"+value.schemeName+"</td>" +
    				"<td>"+value.orderStatus+"</td></tr>");
    	});
    }
});
$('#idStp').click(function(){
	var serviceurl = "placeStpOrdersFromCart/"+stpOrderId;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idTBodyCart").empty();
    	$.each(data, function (index, value) {
    		$("#idTBodyCart").append("<tr>" +
    				"<td>"+value.schemeName+"</td>" +
    				"<td>"+value.orderStatus+"</td></tr>");
    	});
    }
});
$('#idSwitch').click(function(){
	var serviceurl = "placeSwitchOrdersFromCart/"+switchOrderId;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	$("#idTBodyCart").empty();
    	$.each(data, function (index, value) {
    		$("#idTBodyCart").append("<tr>" +
    				"<td>"+value.schemeName+"</td>" +
    				"<td>"+value.orderStatus+"</td></tr>");
    	});
    }
});
var modal = document.getElementById('idPopUpProduct');

//Get the button that opens the modal
var btn = document.getElementById("idLumpsum");

var btn1 = document.getElementById("idSip");

var btn2 = document.getElementById("idSwitch");

var btn3 = document.getElementById("idStp");

var btn4 = document.getElementById("idSwp");


//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//When the user clicks the button, open the modal 
btn.onclick = function() {
 $(".onpopupscroller").css("overflow","hidden");
 modal.style.display = "block";
}

btn1.onclick = function() {
	 $(".onpopupscroller").css("overflow","hidden");
	 modal.style.display = "block";
	}
btn2.onclick = function() {
	 $(".onpopupscroller").css("overflow","hidden");
	 modal.style.display = "block";
	}
btn3.onclick = function() {
	 $(".onpopupscroller").css("overflow","hidden");
	 modal.style.display = "block";
	}
btn4.onclick = function() {
	 $(".onpopupscroller").css("overflow","hidden");
	 modal.style.display = "block";
	}
//When the user clicks on <span> (x), close the modal
span.onclick = function() {
 $(".onpopupscroller").css("overflow","visible");
 modal.style.display = "none";
 console.log(selectedMode);
 if(selectedMode == "lumpsum") {
	 viewLumpsumOrdersInCart();
 } else if (selectedMode == "sip") {
	 viewSipOrdersInCart(); 
 } else if (selectedMode == "swt") {
	 viewSwitchOrdersInCart(); 
 } else if (selectedMode == "stp") {
	 viewStpOrdersInCart(); 
 } else if (selectedMode == "swp") {
	 viewSwpOrdersInCart(); 
 }
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
 if (event.target == modal) {
     modal.style.display = "none";
 }
}

