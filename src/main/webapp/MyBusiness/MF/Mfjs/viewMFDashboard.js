var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
$(document).ready(function(){
	
	$("#idBackOffice").load("MF/investorMaster.html");
	
	/**********Client Master Data Entry*****/
	$(".clientMaster").click(function(){
		
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$(".dashboardheading").html("Client Master"); 
		$("#idBackOffice").load("MF/mfClient.html");
		
	});
	
	/**********Family Master Data Entry*****/
	$(".familyMaster").click(function(){
		
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$(".dashboardheading").html("Family Master"); 
		$("#idBackOffice").load("MF/familyMaster.html");
		
	});
	
	/**********Group Family Member*****/
	$(".groupfamilymember").click(function(){
		
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$(".dashboardheading").html("Group/Ungroup Family Members"); 
		$("#idBackOffice").load("MF/groupUngroupFamilyMember.html");
		
	});
	
	/**********RM Master Data Entry*********/
	$(".rmMaster").click(function(){	
		
		$("#idBackOffice").empty();
		//$("#deleteMessage").hide();
		//selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		$("#mandatory-field-msg").hide();			
				 
		serviceurl = "getRmMaster/" +loggedInUser.id;
		getClientData("GET", "" , serviceurl, onSuccess);
		function onSuccess(data){
			
			if(data.length==0) {
				getMFData("GET", data, "checkIfRmRoleExists/" + loggedInUser.id, onCheckSuccess);
				function onCheckSuccess(flag) {
					if(flag==false) {
						 $("#idSave").prop("disabled", true);
						bootbox.alert("Please create a RM Master role");
					}
				}					
				
				var addURL = "MF/rmMaster.html";
				addPageBackOffice(addURL,"Add RM Master");
			} else {
				sessionStorage.setItem("RM_MASTER_LIST", JSON.stringify(data));
				$("#idBackOffice").load("MF/viewRmMaster.html");
				$(".dashboardheading").html("");
				$(".dashboardheading").html("View RM Master");
			}
		}
		
		$("#headIcon").empty();
        var url = "MF/rmMaster.html";
        var heading="Add RM Master";
        $("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageBackOffice(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
                
        url = "MF/rmMaster.html";
        heading="Edit RM Master";
        $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageBackOffice(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
               
        //url = "clientInfo/viewLoansandLiabilities.html";
        //heading = "Loans and Liabilites";
        $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
              
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
               
        $("#addRecord").removeClass('btn_Disabled');
        $('#editRecord').addClass('btn_Disabled');
        $('#deleteRecord').addClass('btn_Disabled');
		
		
	});

	/**************************Branch Master**************************/
	$(".branchMaster").click(function(){
		
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		
		serviceurl = "getAllMFBackOfficeBranchByAdvisorId/" +loggedInUser.id;
		getMFData("GET", "" , serviceurl, onSuccess);
		function onSuccess(data){
			if(data.length==0) {
				var addURL = "MF/branchMaster.html";
				addPageBackOffice(addURL,"Add Branch Master");
			} else {
				sessionStorage.setItem("BRANCH_MASTER_LIST", JSON.stringify(data));
				$("#idBackOffice").load("MF/viewBranchMaster.html");
				$(".dashboardheading").html("");
				$(".dashboardheading").html("View Branch Master");
			}
		}
		
		$("#headIcon").empty();
		var url = "MF/branchMaster.html";
        var heading="Add Branch Master";
        $("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageBackOffice(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
                
        url = "MF/branchMaster.html";
        heading="Edit Branch Master";
        $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageBackOffice(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
               
        //url = "clientInfo/viewLoansandLiabilities.html";
        //heading = "Loans and Liabilites";
        $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
              
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
               
        $("#addRecord").removeClass('btn_Disabled');
        $('#editRecord').addClass('btn_Disabled');
        $('#deleteRecord').addClass('btn_Disabled');
				
	});
	
	/**************************Sub Broker Master**************************/
	$(".sbMaster").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		serviceurl = "getSbMaster/" +loggedInUser.id;
		getClientData("GET", "" , serviceurl, onSuccess);
		function onSuccess(data){
			if(data.length == 0) {
				getMFData("GET", data, "checkIfSbRoleExists/" + loggedInUser.id, onCheckSuccess);
				function onCheckSuccess(flag) {
					if(flag==false) {
						 $("#idImportButton").prop("disabled", true);
						bootbox.alert("Please create a Sub Broker Master role");
					}
				}				
				var addURL = "MF/sbMaster.html";
				addPageBackOffice(addURL,"Add Sub Broker Master");
			} else {
				sessionStorage.setItem("SB_MASTER_LIST", JSON.stringify(data));
				$("#idBackOffice").load("MF/viewSbMaster.html");
				$(".dashboardheading").html("");
				$(".dashboardheading").html("View Sub Broker Master");
			}
		}
		$("#headIcon").empty();
        var url = "MF/sbMaster.html";
        var heading="Add SUB BROKER Master";
        $("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageBackOffice(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
                
        url = "MF/sbMaster.html";
        heading="Edit SUB BROKER Master";
        $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageBackOffice(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
              
        $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
              
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
               
        $("#addRecord").removeClass('btn_Disabled');
        $('#editRecord').addClass('btn_Disabled');
        $('#deleteRecord').addClass('btn_Disabled');
				
	});
	
	/*********Family Attribute Master**********/
	$(".faMaster").click(function(){
		
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$(".dashboardheading").html("Family Attibute Master"); 
		$("#idBackOffice").load("MF/familyAttributeMaster.html");
		
	});
		
	$(".investor").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$(".dashboardheading").html("Investor Master"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/investorMaster.html");
	});
	
	$(".dailyFeeds").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$(".dashboardheading").html("Daily Feeds"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/dailyFeeds.html");
	});
	
	$(".sipstpFeed").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$(".dashboardheading").html("SIP/STP Feeds"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/sipstpFeed.html");
	});
	
	$(".brokerageFeed").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$(".dashboardheading").html("Brokerage Feed"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/brokerageFeed.html");
	});
	
	$(".rdataImport").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$(".dashboardheading").html("Rejection Data Import"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/rdataImport.html");
	});
	
	$(".aumReconciliation").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$(".dashboardheading").html("AUM reconciliation"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/aumReconciliation.html");
	});
	
	$(".uploadHistory").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$(".dashboardheading").html("View Upload History"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/viewUploadHistory.html");
	});
	
	$(".transReport").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$(".dashboardheading").html("Transaction Report"); 
		$("#idBackOffice").load("MF/transReport.html");
	});

	$(".realized_Gain_Report").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Realized Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/realized.html");
	});
	
	$(".unrealized_Gain_Report").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Unrealized Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/unrealized.html");
	});
	
	
	$(".dividendReport").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Dividend Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/dividendReport.html");
	});
	
	$(".dividendReportNew").click(function() {
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("New Dividend Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/dividendReportNew.html");
	});
	
	$(".sip_stp_swpReport").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("SIP/STP/SWP Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/SipStpReport.html");
	});
	
	$(".sip").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("SIP Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/sipstpFeed.html");
	});
	
	$(".inactive_clients").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Inactive Client Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/inactiveClient.html");
	});
	
	$(".brokerage").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Brokerage Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/brokerage.html");
	});
	
	$(".aumReport").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("AUM Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/aumReport.html");
	});
	
	$(".capitalGains").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".form-section-container").css("padding","18px 45px 600px");
		$(".dashboardheading").html("Capital Gains Report"); 
		$("#wrapper").css("height","auto");
		$("#idBackOffice").load("MF/capitalGainsReport.html");
	});
	
	/**********************************************/
	$(".transReportNew").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$(".dashboardheading").html("Transaction Report"); 
		$("#idBackOffice").load("MF/transReportNew.html");
	});
	
	$(".configuration").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();	
		$("#headIcon").empty();
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$(".dashboardheading").html("Configuration"); 
		$("#idBackOffice").load("MF/configuration.html");
	});

	$(".realized_Gain_Report_new").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Realized Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/realized_new.html");
	});
	
	$(".portfolio_gainloss_report").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".form-section-container").css("padding","18px 45px 600px");
		$(".dashboardheading").html("Portfolio Gain Loss Report"); 
		$("#wrapper").css("height","auto");
		$("#idBackOffice").load("MF/portfolioGainLossReport.html");
	});
	
	$(".dividendReportnew").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Dividend Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/dividendReportNew.html");
	});
	
	$(".portfolio_valuation_report").click(function(){
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Portfolio Valuation Report"); 
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/portfolioValuationReport.html");
	});
	
	/**********************************************/
	
	/*************Business Reports*****************/
	
	$(".aumReconciliationBusinessReport").click(function() {
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("AUM Reconciliation");
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/aumReconciliation_businessReports.html");
	});
	
	$(".businessMISReport").click(function() {
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Business MIS Report");
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/businessMISReport.html");
	});
	
	$(".transactionSummaryReport").click(function() {
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Transaction Summary Report");
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		$("#idBackOffice").load("MF/transactionSummaryReport.html");
	});
	
	$(".brokerageMISBusinessReport").click(function() {
		$("#idBackOffice").empty();
		$("#mandatory-field-msg").hide();
		$("#headIcon").empty();
		$(".dashboardheading").html("Brokerage MIS Report");
		$("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		//$("#idBackOffice").load("MF/business_mis_report.html");
		$("#idBackOffice").load("MF/brokerage.html");
		
	});
	
});	

