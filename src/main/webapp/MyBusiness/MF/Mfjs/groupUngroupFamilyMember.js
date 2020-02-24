var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

var clientId1 = null;
var clientId2 = null;
var relationID = null;
var clientGender = null;
var otherRelation = null;
var gender = [];

var errTransReport = 0;
var p;
var i;

var startForClient1 = 0;
var startForClient2 = 0;

var lClients1 = document.getElementById('idClient1Drop');
var lClients2 = document.getElementById('idClient2Drop');
var lRelation = document.getElementById('idRelation');
var lOtherRelation = document.getElementById('idOthers');

$("#idOtherRelation").hide();

$(document).ready(function(){
	
	console.log(loggedInUser.id);
	
	getClientList1();
	getClientList2();

});

//populate 1st client list
function getClientList1() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"clientMasterListWithpagination/" + loggedInUser.id + "/" + startForClient1,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			
			if(data == '') {
				 $('#idSelect1').append("<li>No other record Found</li>");
				 hideLoader();
				 return false;
			 } else {
			  	 p = "";
				 $.each(data, function (index, item) {
				 	i ++;
					p = p + "<li id = " + item.id + ">" + item.name + "</li>"
					gender[item.id] = item.gender;
			 	});
			 $('#idSelect1').append(p);
			 hideLoader();
			 //action = "inactive";
			 }
			
		},
		error : function(jqXHR, data) {
			if(jqXHR.status == 401){

	        var error,error_description;
			error = jqXHR.responseJSON.error_description;
			error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
			if(error === error_description){
	        		msg = "Your session has expired.Please log in again"
	        		bootbox.alert({
			        	 message: msg,
			        	 callback: function () {
				         window.location = "../index.html";
			         }
			      })
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        })
	        	}	
	        
	        }
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();

			hideLoader();
		}     
	});	
}

//populate 2nd client list
function getClientList2() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"clientMasterListWithpagination/" + loggedInUser.id + "/" + startForClient2,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			
			if(data == '') {
				 $('#idSelect2').append("<li>No other record Found</li>");
				 hideLoader();
				 return false;
			 } else {
			  	 p = "";
				 $.each(data, function (index, item) {
				 	i ++;
					p = p + "<li id = " + item.id + ">" + item.name + "</li>"
			 	});
			 $('#idSelect2').append(p);
			 hideLoader();
			 //action = "inactive";
			 }
			
		},
		error : function(jqXHR, data) {
			if(jqXHR.status == 401){

	        var error,error_description;
			error = jqXHR.responseJSON.error_description;
			error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
			if(error === error_description){
	        		msg = "Your session has expired.Please log in again"
	        		bootbox.alert({
			        	 message: msg,
			        	 callback: function () {
				         window.location = "../index.html";
			         }
			      })
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        })
	        	}	
	        
	        }
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();

			hideLoader();
		}     
	});	
}

//check if same client
function checkIfSameClient() {
	console.log("check same client")
	if (clientId1 != null && clientId2 != null) {
		if (clientId1 == clientId2) {
			document.getElementById('alertClients1').innerHTML="Can not select the same client for family member mapping";
			document.getElementById('alertClients2').innerHTML="Can not select the same client for family member mapping";
			lClients1.style.border = "2px solid red";
			lClients2.style.border = "2px solid red";
			errTransReport = 1;
			
			//disable the relation drop down
			$("#idRelation").attr("disabled", true);
		} else {
			document.getElementById('alertClients1').innerHTML="";
			document.getElementById('alertClients2').innerHTML="";
			lClients1.style.border = "1px solid #C0C0C0";
			lClients2.style.border = "1px solid #C0C0C0";
			errTransReport = 0;
			
			//enable the relation drop down
			$("#idRelation").attr("disabled", false);
		}
	}
}

//check if family is present for 1st user
function checkIfFamilypresent(clientId1) {
	getClientData("GET", "" , "checkIfFamilypresent/" + clientId1, onCheckFamilySuccess1);
	function onCheckFamilySuccess1(data) {
		if (data == true) {
			document.getElementById('alertClients1').innerHTML="Selected Client already has a family";
			lClients1.style.border = "2px solid red";
			errTransReport = 1;
		} else {
			document.getElementById('alertClients1').innerHTML="";
			lClients1.style.border = "1px solid #C0C0C0";
			errTransReport = 0;
		}
	}
}

//check relation and gender
function checkRelationAndGender() {
	console.log("check relation and gender")
	console.log("relation ID : " + relationID)
	console.log("client Gender : " + clientGender)
	if (relationID != null) {	
		if (clientGender != null) {
			if (clientGender === "M") {
				if (relationID == 3 || relationID == 5 || relationID == 7) {
					document.getElementById('alertRelation').innerHTML="Female relation can not be mapped to a male client";
					lRelation.style.border = "2px solid red";
					errTransReport = 1;
				} else {
					document.getElementById('alertRelation').innerHTML="";
					lRelation.style.border = "1px solid #C0C0C0";
					errTransReport = 0;
				}
			} else if (clientGender === "F") {
				if (relationID == 2 || relationID == 4 || relationID == 6) {
					document.getElementById('alertRelation').innerHTML="Male relation can not be mapped to a female client";
					lRelation.style.border = "2px solid red";
					errTransReport = 1;
				} else {
					document.getElementById('alertRelation').innerHTML="";
					lRelation.style.border = "1px solid #C0C0C0";
					errTransReport = 0;
				}
			}
		}
	}
}

/*********first drop down starts***********/
$("#idClient1Drop").click(function(){
	
	$("#idSearchClient1").click(function() {
		//alert(this.id)
		//alert("input click koreche")
		document.getElementById('idSelect1').style.display = "block";
		return false;
	});
	
	if (document.getElementById('idSelect1').style.display == "none") {
		document.getElementById('idSelect1').style.display = "block";
		document.getElementById('idSearchClient1').style.display = "block";
	} else {
		document.getElementById('idSelect1').style.display = "none";
		document.getElementById('idSearchClient1').style.display = "none";
	}
	
});

$(document).on("click","#idClient1Drop li",function(){
		var selText = $(this).text();///User selected value...****
		//if (this.id != "idSearchLi") {
  	$('li:contains('+selText+')').filter(function() {
		    	  return $(this).text() == selText;
		    }).addClass('active');
  	$("#idClients1").text(selText);
  	$('#idClients1').css('color', 'black');
	document.getElementById('idSearchClient1').style.display = "none";
	document.getElementById('idSelect1').style.display = "none";

	clientId1 = this.id;
	//alert(clientId)
	console.log("clientId: " + clientId1);
	if(clientId1 != ""){
		//enable the 2nd list
		$("#idClient2Drop").removeClass("disabled");
		checkIfFamilypresent(clientId1);
		checkRelationAndGender();
		checkIfSameClient();
		
		clientGender = gender[clientId1];
		
		/*document.getElementById('alertClients1').innerHTML="";
		lClients1.style.border = "1px solid #C0C0C0";
		errTransReport = 0;*/
	} else {
		document.getElementById('alertClients1').innerHTML="Please select a Client";
		lClients1.style.border = "2px solid red";
		errTransReport = 1;
	}
});

$('#idSelect1').scroll(function () {
    if ($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight()) {
          //alert("end of scroll");
    	  startForClient1 = startForClient1 + 1;
          if ($('#idSelect1 li:last-child').text() != "No other record Found") {
	       	 	loadLoader();
	       	 	getClientList1();
          }
    }
});

$("#idSearchClient1").on("keyup", function() {
    var matchString = $(this).val();
    //alert(matchString)
    if (matchString != "") {
    	getClientData("GET", "" , "searchClientsDynamically/" + loggedInUser.id + "/" + matchString, onSearchSuccess1);
    }
    else {
    	$('#idSelect1').empty();
    	//getClientData("GET", "" , "showUserWithPagination/" + 0, onGetDataSuccess);
   	 	loadLoader();
   	    startForClient1 = 0;
   	    getClientList1();
    }
});

function onSearchSuccess1(data) {
	if(data == '') {
		 $('#idSelect1').empty();
		 hideLoader();
		 return false;
	 } else {
		 $('#idSelect1').empty();
		 p = "";
		 $.each(data, function (index, item) {
		 	i ++;
			p = p + "<li id = " + item.id + ">" + item.name + "</li>"
	 	});
	 $('#idSelect1').append(p);
	 }
}
/*********first drop down ends***********/
/*********second drop down starts***********/
$("#idClient2Drop").click(function(){
	
	$("#idSearchClient2").click(function() {
		//alert(this.id)
		//alert("input click koreche")
		document.getElementById('idSelect2').style.display = "block";
		return false;
	});
	
	if (document.getElementById('idSelect2').style.display == "none") {
		document.getElementById('idSelect2').style.display = "block";
		document.getElementById('idSearchClient2').style.display = "block";
	} else {
		document.getElementById('idSelect2').style.display = "none";
		document.getElementById('idSearchClient2').style.display = "none";
	}
	
});

$(document).on("click","#idClient2Drop li",function(){
		var selText = $(this).text();///User selected value...****
		//if (this.id != "idSearchLi") {
  	$('li:contains('+selText+')').filter(function() {
		    	  return $(this).text() == selText;
		    }).addClass('active');
  	$("#idClients2").text(selText);
  	$('#idClients2').css('color', 'black');
	document.getElementById('idSearchClient2').style.display = "none";
	document.getElementById('idSelect2').style.display = "none";

	clientId2 = this.id;
	//alert(clientId)
	console.log("clientId2: " + clientId2);
	if(clientId2 != ""){
		//check
		checkIfSameClient();
	} else {
		document.getElementById('alertClients2').innerHTML="Please select a Client";
		lClients2.style.border = "2px solid red";
		errTransReport = 1;
	}
});

$('#idSelect2').scroll(function () {
    if ($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight()) {
          //alert("end of scroll");
    	  startForClient2 = startForClient2 + 1;
          if ($('#idSelect2 li:last-child').text() != "No other record Found") {
	       	 	loadLoader();
	       	 	getClientList2();
          }
    }
});

$("#idSearchClient2").on("keyup", function() {
    var matchString = $(this).val();
    //alert(matchString)
    if (matchString != "") {
    	getClientData("GET", "" , "searchClientsDynamically/" + loggedInUser.id + "/" + matchString, onSearchSuccess2);
    }
    else {
    	$('#idSelect2').empty();
    	//getClientData("GET", "" , "showUserWithPagination/" + 0, onGetDataSuccess);
   	 	loadLoader();
   	    startForClient2 = 0;
   	    getClientList2();
    }
});

function onSearchSuccess2(data) {
	if(data == '') {
		 $('#idSelect2').empty();
		 hideLoader();
		 return false;
	 } else {
		 $('#idSelect2').empty();
		 p = "";
		 $.each(data, function (index, item) {
		 	i ++;
			p = p + "<li id = " + item.id + ">" + item.name + "</li>"
	 	});
	 $('#idSelect2').append(p);
	 }
}
/*********second drop down ends***********/
/*********relation drop down starts***********/
$("#idRelation").change(function() {
	relationID = $("#idRelation").val();
	if (relationID != 1 && relationID != 8) {
		checkRelationAndGender();
	} else if (relationID == 8) {
		$("#idOtherRelation").show();
	}
	
	if (relationID == 1 || relationID == 4 || relationID == 5) {
		getClientData("GET", "" , "checkIfRelationAlreadyExists/" + clientId2 + "/" + relationID, oncheckRelationSuccess);
		function oncheckRelationSuccess(data) {
			//alert(data)
			if (data == false) {
				document.getElementById('alertRelation').innerHTML="";
				lRelation.style.border = "1px solid #C0C0C0";
				errTransReport = 0;
			} else {
				document.getElementById('alertRelation').innerHTML="This relation already exists for the client";
				lRelation.style.border = "2px solid red";
				errTransReport = 1;
			}
		}
	} else {
		document.getElementById('alertRelation').innerHTML="";
		lRelation.style.border = "1px solid #C0C0C0";
		errTransReport = 0;
	}
}); 
/*********relation drop down ends***********/
/*********submit starts***********/
$("#idsubmit").click(function() {
	if (relationID == 8) {
		if ($("#idOthers").val() == null || $("#idOthers").val() == "") {
			document.getElementById('alertOtherRelation').innerHTML="Please specify the relation";
			lRelation.style.border = "2px solid red";
			errTransReport = 1;
		} else {
			otherRelation = $("#idOthers").val();
			
			document.getElementById('alertOtherRelation').innerHTML="";
			lRelation.style.border = "1px solid #C0C0C0";
			errTransReport = 0;
		}
	}
	
	if (errTransReport == 0) {
		getClientData("GET", "" , "groupFamilyMembers?userId=" + loggedInUser.id + "&clientId1=" + clientId1 + "&clientId2=" + clientId2 + 
				"&relationID=" + relationID + "&otherRelation=" + otherRelation, onGroupSuccess);
		function onGroupSuccess(data) {
			if (data == true) {
				bootbox.alert("Success!")
				//window.location = "MF/groupUngroupFamilyMember.html";
				$("#idBackOffice").empty();
				$("#mandatory-field-msg").hide();	
				$("#headIcon").empty();
				
				$("#wrapper").css("height","auto");
				$(".form-section-container").css("height","auto");	
				$(".dashboardheading").html("Group/Ungroup Family Members"); 
				$("#idBackOffice").load("MF/groupUngroupFamilyMember.html");
			} else {
				bootbox.alert("error!")
			}
		}
	}
});
/*********submit ends***********/

