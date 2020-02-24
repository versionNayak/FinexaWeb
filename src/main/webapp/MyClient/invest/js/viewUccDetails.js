var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var ucc_arr = [];

$(document).ready(function (event ) {
	var jsonData;
	var serviceurl = "clientTransact/"+selectedClientId;
    getClientData("GET", "" , serviceurl, onSuccess);
    function onSuccess(data) {
    	jsonData = data;
    	$("#idUCCList").empty();
    	$("#idPaginationDiv").empty();
    	var dataCount = 0;
		var divContainer = "";
		var pageCount = 1;
		
    	$.each(data, function (index, value) {
			//console.log("retirementStatus: " + value.retirementStatus);
			
			
			if (dataCount % 10 == 0) {
				if (dataCount > 0) {
					divContainer = divContainer + '</tbody></table></div>';
				}
				divContainer = divContainer + '<div class="jumbotron page" id="page'+pageCount+'">'+
				'<table id="idTable" width="100%" class="table table-hover">'+
				'<thead><tr>'+
				'<th style="text-align:left">First Applicant</th>'+
				'<th>Second Applicant</th>'+
				'<th>Third Applicant</th>'+
				'<th>UCC</th></tr></thead>'+
				'<tbody id=idUCCList">';
				divContainer=divContainer+'<tr >'+
				'<td>'+ value.clientAppName1 +'</td>'+
				'<td>'+ (value.clientAppName2 == null ? "N/A" : value.clientAppName2) +'</td>'+
				'<td>'+ (value.clientAppName3 == null ? "N/A" : value.clientAppName3) +'</td>'+
				'<td>'+ value.clientCode +'</td>'+
				'<td class="hidden"><input type="text" id="idClientCode" name="clientCode"  value=' + value.clientCode + ' readonly="readonly"></td>' +
    			'<td class="hidden"><input type="text" id="idFatcaStatus" name="fatcaStatus"  value=' + value.fatcaStatus + ' readonly="readonly"></td>' +
    			'<td class="hidden"><input type="text" id="idMandateStatus" name="mandateStatus"  value=' + value.mandateStatus + ' readonly="readonly"></td>' +
    			'<td class="hidden"><input type="text" id="idAOFStatus" name="AOFStatus"  value=' + value.aofStatus + ' readonly="readonly"></td>' +
    		'</tr>';
				dataCount ++;
				pageCount ++;
			} else {	
				divContainer=divContainer+'<tr >'+
				'<td>'+ value.clientAppName1 +'</td>'+
				'<td>'+ (value.clientAppName2 == null ? "N/A" : value.clientAppName2) +'</td>'+
				'<td>'+ (value.clientAppName3 == null ? "N/A" : value.clientAppName3) +'</td>'+
				'<td>'+ value.clientCode +'</td>'+
				'<td class="hidden"><input type="text" id="idClientCode" name="clientCode"  value=' + value.clientCode + ' readonly="readonly"></td>' +
    			'<td class="hidden"><input type="text" id="idFatcaStatus" name="fatcaStatus"  value=' + value.fatcaStatus + ' readonly="readonly"></td>' +
    			'<td class="hidden"><input type="text" id="idMandateStatus" name="mandateStatus"  value=' + value.mandateStatus + ' readonly="readonly"></td>' +
    			'<td class="hidden"><input type="text" id="idAOFStatus" name="AOFStatus"  value=' + value.aofStatus + ' readonly="readonly"></td>' +
    		'</tr>';
				dataCount ++;
			}
			ucc_arr.push(value.clientCode);
		});
    	
    	if (dataCount % 10 > 0) {
			divContainer = divContainer + '</tbody></table></div>';
		}
    	
    	divContainer = divContainer +'<ul id="pagination-demo" class="pagination-sm pull-right" style="margin-right:60px"></ul>';
    	$("#idPaginationDiv").append(divContainer);
    	$('#pagination-demo').twbsPagination({
			totalPages: (pageCount-1),
			// the current page that show on start
			startPage: 1,
			
			// maximum visible pages
			visiblePages: 5,
			
			initiateStartPageClick: true,
			
			// template for pagination links
			href: false,
			
			// variable name in href template for page number
			hrefVariable: '{{number}}',
			
			// Text labels
			first: 'First',
			prev: 'Previous',
			next: 'Next',
			last: 'Last',
			
			// carousel-style pagination
			loop: false,
			
			// callback function
			onPageClick: function (event, page) {
				//alert(page);
				$('.page-active').removeClass('page-active');
				$('#page'+page).addClass('page-active');
			},
			
			// pagination Classes
			paginationClass: 'pagination',
			nextClass: 'next',
			prevClass: 'prev',
			lastClass: 'last',
			firstClass: 'first',
			pageClass: 'page',
			activeClass: 'active',
			disabledClass: 'disabled'
				
		});
    	
    	$("#idTable").on("click", "tr", function (e) {
   		 $('#editRecordInvest').removeClass('btn_Disabled');
   		//alert($(this).find("#cashId").val());
   		findid=$(this).find("#idClientCode").val();
   		sessionStorage.removeItem("SELECTED_CLIENT_CODE_EDIT");
   		sessionStorage.setItem("SELECTED_CLIENT_CODE_EDIT", findid);
   		
   		$.each(jsonData	, function (index, value) {
   			if(value.clientCode == findid) {
   				
   				// create the appropriate Json String
   				
   				var obj = new Object();
   				obj.clientCode = value.clientCode;
   				obj.applicantName  = value.clientAppName1;
   				obj.firstApplicantPan = value.clientPan;
   				obj.secondApplicantPan = value.clientPan2;
   				obj.thirdApplicantPan  = value.clientPan3;
   				obj.firstApplicantName = value.clientAppName1;
   				obj.secondApplicantName = value.clientAppName2;
   				obj.thirdApplicantName  = value.clientAppName3;
   				obj.guardianName = value.clientGuardian;
   				obj.guardianPan = value.clientGuardianPan;
   				
   				var jsonString = JSON.stringify(obj);
   				
   				sessionStorage.removeItem("APPLICANT_STATUS");
   				sessionStorage.setItem("APPLICANT_STATUS", jsonString);
   				sessionStorage.setItem("TRANSACT_NAV_MODE","UCC_EDIT");
   			}
   		});
   		
   		fatcaId=$(this).find("#idFatcaStatus").val();
   		sessionStorage.removeItem("SELECTED_FATCA_STATUS");
   		sessionStorage.setItem("SELECTED_FATCA_STATUS", fatcaId);
   		
   		
   		mandateId=$(this).find("#idMandateStatus").val();
   		sessionStorage.removeItem("SELECTED_MANDATE_STATUS");
   		sessionStorage.setItem("SELECTED_MANDATE_STATUS", mandateId);
   		
   		
   		aofid=$(this).find("#idAOFStatus").val();
   		sessionStorage.removeItem("SELECTED_AOF_STATUS");
   		sessionStorage.setItem("SELECTED_AOF_STATUS", aofid);
   		
   		$(this).addClass("selected");
   		$(this).addClass("selected").siblings().removeClass("selected");
   	}); 
    	
    	sessionStorage.setItem("LIST_OF_UCC",ucc_arr);
    }
	
	$("#idCreateNewUcc").click(function(){
		sessionStorage.removeItem("SELECTED_CLIENT_CODE_EDIT");
		sessionStorage.removeItem("TRANSACT_NAV_MODE");
		sessionStorage.setItem("TRANSACT_NAV_MODE","UCC");
		openPageUCC("Create");
	});
	
	$("#goToMyBusiness").click(function(){
		sessionStorage.setItem("TRANSACT_UPLOAD_BSE_MASTER","TRUE");
        window.location='../MyBusiness/mybusinessDashboard.html';
    })

});
function openPageUCC(heading) {
	heading = heading + " UCC";
	$("#idInvest").empty();
	$(".dashboardheading").html("");
	$("#idInvest").load("invest/addCreateUCC.html");
	$(".dashboardheading").html(heading);
	$("#mandatory-field-msg").show();
}
