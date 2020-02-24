	$(document).ready(function() {	           
		
      // ************************ DEFAULT ONLOAD VIEW CLIENT STARTS *************************//
		$("#idClient").empty();
        //$(".dashboardheading    ").html("");
		$("#idClient").load("../adminPanel.html");
	    $(".dashboardheading").html("Admin Panel");
		
      
		
    
    // ************************ ADD CLIENT STARTS *************************//
    $(".addclientdata").click(function(){
    	$(".dashboardheading").html("Add Client Personal Info");
		$("#wrapper").css("height", "1800px");
		$("#idClient").empty();
		$("#idClient").load("clientInfo/addClient.html");
		//$("#idClient").load("clientInfo/addContactdetails.html");
		//$(".form-section-container").css("height","1850px");
		$("#page-content-wrapper").css("height","auto");				
	});
    // ************************ ADD CLIENT ENDS *************************//
        
    
});
	
function openPage(path,heading) {
	//alert(heading);
    $("#idClient").empty();
    $(".dashboardheading").html("");    
	$("#idClient").load(path);
    $("#page-content-wrapper").css("height","auto");
	$(".form-section-container").addClass("height1257px");
	$(".nonload").css("display","block");
	$("#top-nav-bar").show();
	$(".top-nav-items").show();
	$(".displayonload").hide();
	$("#headIcon").empty();
    $(".dashboardheading    ").html(heading);
	$("#mandatory-field-msg").hide();	

	selectedClientId = 	sessionStorage.getItem("SELECTED_CLIENT_ID");
	//alert(selectedClientId);
	if (selectedClientId != 0 && selectedClientId != null && selectedClientId != 'udefined')
	{
		getClientData("GET", "", "clientMaster/"+selectedClientId, onAgeSuccess);
		function onAgeSuccess(data) {
			console.log("data.age "+data.age)		
			if(data.age>18){
				$('#idGuardian').hide();
				$('#idGuardianContact').hide();
			}else{
				$('#idGuardian').show();
				$('#idGuardianContact').show();
			}
		}
	}		
}
	
