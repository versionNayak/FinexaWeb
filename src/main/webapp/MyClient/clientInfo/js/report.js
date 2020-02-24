var ClientServiceUrl = serviceIP + "/clientservice/";

$(document).ready(function(event) {
	
	change();
    //getClientData("GET", "" , "showUser", onGetDataSuccess);
});

$("#idclear").on("click", function(event) {
		
		document.getElementById('idUsertype').value = "";
		document.getElementById('idUserName').value = "";
});

/**first dropdown onchange function**/
function change() {
	
	if ($('#idUsertype option:selected').val() == "Self") {
	    $('#idUserName').attr('disabled', true);
	    //getClientData("GET", "" , "showUserSelf", onGetDataSuccess);
	} else {
		$('#idUserName').attr('disabled', false);
		getClientData("GET", "" , "showMaster", onGetDropDownSuccess);
	}
	
}

//function download() {
$("#idDownload").on("click", function(event) {
	
	loadLoader();
	
	if (validate($('#exportRepot'))) {
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		var fileName = "Users_report.xlsx";
	
		var xhr = new XMLHttpRequest();
		//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
		if ($('#idUsertype option:selected').val() == "Self") {
			xhr.open( "GET", ClientServiceUrl+'downloadReport/self', true);
		} else {
			var advisorId = $('#idUserName option:selected').val();
			xhr.open( "GET", ClientServiceUrl+'downloadReport/org/'+advisorId, true);
		}
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		xhr.responseType = "blob";
		xhr.onload = function() {
			var url = window.URL.createObjectURL(xhr.response);  
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		};
		xhr.send();
	}
	hideLoader();
});


/**Populate data in 2nd drop-down**/
function onGetDropDownSuccess(data) {
	
	$.each(data, function (index, fund) {
		
		/*var markup = "<option value="+fund.id+">"+fund.orgName+"</option>";
		$("#idUserName").append(markup);*/
		
		$("#idUserName").append($('<option>', { 
	        value: fund.id,
	        text : fund.orgName
	    }));
	 });
}

function loadLoader(){	
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"> <img src="../Common/assets/images/icons/processing-gif-14.gif" alt="Loader" width="42" height="42"> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;">Processing... </h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    if(document.getElementById("overlayLoading1")){
	    console.log("overlayLoading1");
	    $("#overlayLoading1").html(ineerHtml).css({'display':'block'});
	  	}
	  	
	    if(document.getElementById("overlayLoading")){
	      console.log("overlayLoading1");
	  	  $("#overlayLoading").html(ineerHtml).css({'display':'block'});
	  	}
	
	    
	}

function hideLoader(){
	  
		   if(document.getElementById("overlayLoading1")){
		   console.log("overlayLoading");
  $("#overlayLoading1").css({'display':'none'}).html("");
		   } 
		   if(document.getElementById("overlayLoading")){
			   console.log("overlayLoading");
			   $("#overlayLoading").css({'display':'none'}).html("");
		   }
}

