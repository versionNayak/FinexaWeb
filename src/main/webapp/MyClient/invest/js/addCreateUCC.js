var pageMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var applicantName;
var firstApplicantId;
var guardianId;
var minor=0;

$(document).ready(function() {
	var serviceUrl = "clientMaster/" + selectedClientId;
	$("#idDivGuardian").hide();
	$("#idDivGuardianPan").hide();
	getClientData("GET", "", serviceUrl, onSuccess);
	function onSuccess(data){
		/*if(pageMode == "UCC_EDIT") {
			// Edit MOde
			
			var applicantData = sessionStorage.getItem("APPLICANT_STATUS");
			//alert(applicantData);
			jsonString = JSON.parse(applicantData);
			//alert(jsonString.clientCode);
			//$("#idFirstApplicantName").val(jsonString.applicantName);
			firstApplicantDrop = $("#idFirstApplicantName");
			firstApplicantDrop.find('option').remove();
			firstApplicantDrop.append('<option value="" name = "Select">Select</option>');
					
			$.each(data.clientFamilyMembersDTO, function (index, value) {
				
			var clientName=value.firstName + ((value.middleName == "") ? " " : (value.middleName+" ")) + value.lastName; 
				firstApplicantDrop.append('<option value="' + value.pan + '" name = "' + value.id + '">' + clientName + '</option>');
			
			});
			
			
			
			//$("#idFirstApplicantName").val(jsonString.firstApplicantName);
			$("#idFirstApplicantName").val(jsonString.firstApplicantPan);
			$("#idFirstApplicantPan").val(jsonString.firstApplicantPan);
			$("#idSecondApplicantName").val(jsonString.secondApplicantName);
			$("#idSecondApplicantPan").val(jsonString.secondApplicantPan);
			$("#idThirdApplicantName").val(jsonString.thirdApplicantName);
			$("#idThirdApplicantPan").val(jsonString.thirdApplicantPan);
			$("#idGuardianName").val(jsonString.guardianName);
			$("#idGuardianPan").val(jsonString.guardianPan);
			
			$("#idUCCNumber").val(jsonString.clientCode);
			
			var ddl = document.getElementById("idFirstApplicantName");
			applicantName = ddl.options[ddl.selectedIndex].text;
			
		} else {
			// Normal Mode
			
		}*/
		
		firstApplicantDrop = $("#idFirstApplicantName");
		firstApplicantDrop.find('option').remove();
		firstApplicantDrop.append('<option value="" name = "Select">Select</option>');
				
		$.each(data.clientFamilyMembersDTO, function (index, value) {
			
		var clientName=value.firstName + ((value.middleName == "") ? " " : (value.middleName+" ")) + value.lastName; 
		firstApplicantDrop.append('<option value="' + value.pan + '" name = "' + value.id + '">' + clientName + '</option>');
		
		});
		
	}
	
	$('#idFirstApplicantName').change(function(e){
		// Your event handler
		
		var ddl = document.getElementById("idFirstApplicantName");
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		applicantName = ddl.options[ddl.selectedIndex].text;
		//alert("applicantName " + applicantName);
		var selectedName = $(this).find('option:selected').attr("name");
		firstApplicantId = selectedName;
		//alert(firstApplicantId);
		if (!(selectedName == "Select")) {
			// check whether applicant is minor or not

			selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			//console.log("selectedClientId "+selectedClientId);
			var serviceUrl = "clientMaster/" + selectedClientId;
			getClientData("GET", "", serviceUrl, onSuccess);
			
			function onSuccess(data) {
				var pan, selectedPan, panValue, n; 
				
				$.each(data.clientFamilyMembersDTO, function (index, value) {
					pan = value.pan; 
					selectedPan = document.getElementById("idFirstApplicantName");
					panValue = selectedPan.options[selectedPan.selectedIndex].value;
					
					pan = pan.trim();
					n = pan.localeCompare(panValue.trim());
					
					id = value.id;
					//alert("id " + id);
					if((n == 0) && (id == firstApplicantId)){
						
						var date1 = value.birthDate;
						var day = date1.substring(0,2);
						var month = date1.substring(3,5);
						var year = date1.substring(6,10);
						var dateNew = new Date(year,month,day);
						var date2 = new Date();
						var timeDiff = Math.abs(date2.getTime() - dateNew.getTime());
						console.log("timeDiff" + timeDiff);
						var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
						console.log("diffDays" + diffDays);
						var diffYears = Math.ceil(diffDays/365);
						console.log("diffYears" + diffYears);
						//alert("diffYears" + diffYears);
						if (diffYears >= 18) {
							minor = 0;
//							$('#idFirstApplicantPan').attr('disabled', true);
							$("#idDivGuardian").hide();
							$("#idDivGuardianPan").hide();
							document.getElementById("idGuardianName").value = "";
							document.getElementById("idGuardianPan").value = "";
						} else {
							// In case of Minor
//							$('#idFirstApplicantPan').attr('disabled', false);
							$("#idDivGuardian").show();	
							$("#idDivGuardianPan").show();
							// get the details of Guardian
							var serviceUrl = "ClientGuardianInfo/client/" + selectedClientId;
	                        getClientDataAsyncFalse("GET", "", serviceUrl, onGuardianSuccess);
	                        function onGuardianSuccess(data) {
	                        	if (data.id > 0) {
	                        		var guardianName=data.firstName + ((data.middleName == "") ? " " : (data.middleName+" ")) + data.lastName; 
		                        	$("#idGuardianName").val(guardianName);	
		                        	$("#idGuardianPan").val(data.pan);	
	                        	}
	                        }
							minor = 1;
						}
						
					}
					
				});
				if (minor == 1) {
					$("#idFirstApplicantPan").val("");
				} else {
					if(selectedValue == "") {
//						document.getElementById('alertFirstApplicantName').innerHTML("Please enter the Pan Number from clientInfo to proceed");
						$("#idFirstApplicantPan").val("");
						bootbox.alert("The PAN for the specified client is not updated. Please save the same in the Client Info section before proceeding");
					} else {
						$("#idFirstApplicantPan").val(selectedValue.toUpperCase());
					}
				}
			}
		} else {
			minor = 0;
			$('#idFirstApplicantPan').attr('disabled', true);
			$("#idDivGuardian").hide();
			$("#idDivGuardianPan").hide();
			document.getElementById("idGuardianName").value = "";
			document.getElementById("idGuardianPan").value = "";
		}

	});
	
	
	$('#idGuardianName').change(function(e){
		// Your event handler
		var ddl = document.getElementById("idGuardianName");
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		var selectedName = $(this).find('option:selected').attr("name");
		guardianId = selectedName;
		$("#idGuardianName").val(selectedValue.toUpperCase());
	});
	
	function inArray(data, ucc) {
	    var length = data.length;
	    for(var i = 0; i < length; i++) {
	        if(data[i] == ucc)
	            return true;
	    }
	    return false;
	}
	$("#idAddUCC").on("click", function(event) {
		if (validateAddCreateUCC($('#clientUCC'),minor))
		{
			
			var ucc = $("#idUCCNumber").val();
			var data = sessionStorage.getItem("LIST_OF_UCC");
			if(inArray(ucc)) {
				bootbox.alert("UCC already present");
			} else {
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				var formData = $('#clientUCC').serializeToJSON();
				formData["clientId"] = selectedClientId;
				//alert(applicantName);
				var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
				formData["advisorId"] = loggedUser.id;
				formData["applicantName"] = applicantName;
				formData["firstApplicantId"] = firstApplicantId;
				formData["secondApplicantPan"] = $("#idSecondApplicantPan").val();
				formData["thirdApplicantPan"] = $("#idThirdApplicantPan").val();
				formData["firstApplicantName"] = applicantName;
				formData["secondApplicantName"] = $("#idSecondApplicantName").val();
				formData["thirdApplicantName"] = $("#idThirdApplicantName").val();
				formData["guardianId"] = guardianId;
				formData["guardianName"] = $("#idGuardianName").val();
				formData["guardianPan"] = $("#idGuardianPan").val();
				var data = JSON.stringify(formData);
				//alert(data);
				sessionStorage.setItem("APPLICANT_STATUS",data);
				saveData("POST", data, "validateExistingClient", onValidateSuccess)
				function onValidateSuccess(data) {
					if (data.statusCode == 200) {
						bootbox.alert(data.message);
						
						$(".dashboardheading").html("View UCC");
						$("#idInvest").load("invest/viewUCCDetails.html");
						
					} else {
						
						$("#idInvest").empty();
						$(".dashboardheading").html("");
						$("#idInvest").load("invest/verificationProcessDisabled.html");
						$(".dashboardheading").html("Create New UCC");
					}
				}
			}
			
		}

	});
	
	$('#undo').click(function(){
		
		//document.getElementById("clientUCC").reset(); 
		$('#clientUCC')[0].reset();
		
		
		(document.getElementById("idFirstApplicantName")).style.border = "1px solid #ccc";
		(document.getElementById("idFirstApplicantPan")).style.border = "1px solid #ccc";
		(document.getElementById("idSecondApplicantName")).style.border = "1px solid #ccc";
		(document.getElementById("idSecondApplicantPan")).style.border = "1px solid #ccc";
		(document.getElementById("idThirdApplicantName")).style.border = "1px solid #ccc";
		(document.getElementById("idThirdApplicantPan")).style.border = "1px solid #ccc";
		(document.getElementById("idGuardianName")).style.border = "1px solid #ccc";
		(document.getElementById("idGuardianPan")).style.border = "1px solid #ccc";
		(document.getElementById("idUCCNumber")).style.border = "1px solid #ccc";
		
		document.getElementById('alertform').innerHTML = "";
		
		document.getElementById('alertFirstApplicantName').innerHTML = "";
		document.getElementById('alertFirstApplicantPan').innerHTML = "";
		document.getElementById('alertSecondApplicantName').innerHTML = "";
		document.getElementById('alertSecondPan').innerHTML = "";
		document.getElementById('alertThirdApplicantName').innerHTML = "";
		document.getElementById('alertThirdApplicantPan').innerHTML = "";
		document.getElementById('alertGuardianName').innerHTML = "";
		document.getElementById('alertGuardianPan').innerHTML = "";
		document.getElementById('alertUCCNumber').innerHTML = "";
	});
	
	
});

