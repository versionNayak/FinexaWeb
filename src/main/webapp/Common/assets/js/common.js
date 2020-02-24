	//All common functions 
	var loggedClient;
	if (loggedUser == null) {
	    loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	} else {
	    loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	var modulePath = "ci/"

	function toggleDiv(divId) {
	    alert('�n toggle: ' + divId);
	    $("#" + divId).toggle();
	}

	function hideDiv(divId) {
	    //alert('�n toggle: '+divId);	
	    $("#" + divId).hide();
	}

	function showDiv(divId) {
	    //	alert('�n toggle: '+divId);	
	    $("#" + divId).show();
	}

	//add days, month, year to date
	function addDaystoDate(iDate, days, months, years) {
	    //alert('Inside addDaystoDate '+iDate);
	    var a = moment(iDate, 'DD/MM/YYYY', true);
	    var b = a.clone().add(years, 'year').add(months, 'month').add(days, 'day');
	    var c = b.format('DD/MM/YYYY');
	    //alert('New Date '+ c);
	    return c;
	}

	//masking a number representing an amount with commas - parameter num is id of html element in jquery format e.g #idAmount
	function maskAmount(num) {
	    var numval = $(num).val();
	    numval = unmaskAmountValue(numval);
	    //console.log('In maskAmount() value: ' + numval);
	    if (numval != 0 || numval != "") {
	        //	console.log('In maskAmount() value: ' + numval);		
	        var maskednum = Number(numval).toLocaleString('en-IN');
	        $(num).val(maskednum);
	    }
	}

	function maskAmountValue(val) {
	    //	console.log('In maskAmountValue(): ' + val);
	    var maskedval = Number(val).toLocaleString('en-IN');
	    return maskedval;
	}

	//unmasking a number representing an amount by removing commas - parameter num is id of html element in jquery format e.g #idAmount
	function unmaskAmount(num) {
	    //	console.log('In unmaskAmount(): ' + num);
	    var numval = $(num).val();
	    //	console.log('In unmaskAmount() value: ' + numval);
	    if (numval != 0 || numval != "") {
	        //	console.log('In unmaskAmount() value: ' + numval);
	        numval = numval.replace(/,/g, '');
	        $(num).val(numval);
	    }
	}

	function unmaskAmountValue(numval) {
	    //	console.log('In unmaskAmountValue(): ' + numval);
	    numval = numval.replace(/,/g, '');
	    return numval;
	}


	function showLoaderOnSave(btnID) {
	    $(btnID).attr("disabled", "disabled");
	    $(btnID).html('<i class="fa fa-refresh fa-lg fa-spin" style="color: #ffffff;"></i> Saving...');
	    //$("body").css("cursor", "progress");
	    $("#overlayLoading").css({ 'display': 'block' });
	}

	function hideLoaderOnSave(btnID) {
	    //alert('In hideLoaderOnSave()');
	    $(btnID).removeAttr("disabled");
	    $(btnID).html("SAVE");
	    //$("body").css("cursor", "default");
	    $("#overlayLoading").css({ 'display': 'none' });
	}


	$(window).on('mouseover', (function() {
	    window.onbeforeunload = null;
	}));
	$(window).on('mouseout', (function() {
	    window.onbeforeunload = ConfirmLeave;
	}));

	function ConfirmLeave() {
	    if (loggedClient != null && loggedUser == null) {
	        serviceurl = "logoutFinexaForClient?clientID=" + loggedClient.id;
	        getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            sessionStorage.clear();
	        }
	    } else if (loggedUser != null) {
	        serviceurl = "logoutFinexa?advisorUserId=" + loggedUser.id;
	        getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            sessionStorage.clear();
	        }
	    }

	    window.location = "../index.html";
	}

	var prevKey = "";
	$(document).keydown(function(e) {
	    if (e.keyCode == 17 && e.keyCode == 87) {
	        window.onunload = window.onbeforeunload = ConfirmLeave;
	    } else if (e.key.toUpperCase() == "W" && prevKey == "CONTROL") {
	        window.onunload = window.onbeforeunload = ConfirmLeave;
	    } else if (e.key.toUpperCase() == "F4" && (prevKey == "ALT" || prevKey == "CONTROL")) {
	        window.onbeforeunload = ConfirmLeave;
	    }
	    prevKey = e.key.toUpperCase();
	});

	function showProgressBarOnClick(btnID) {

	}