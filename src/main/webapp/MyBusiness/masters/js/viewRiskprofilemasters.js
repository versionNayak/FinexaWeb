
$("#addRecord").removeClass('btn_Disabled');
$('#editRecord').removeClass('btn_Disabled');

$("#addRecord").show();
$('#editRecord').show();


$(".retirementview tr").click(function(){
	  $(this).addClass("selected").siblings().removeClass("selected"); 
	  $(".retirementview tr:nth-child(1)").removeClass("selected");
	  $('.editicon').removeClass('btn_Disabled');
	  $('.deleteicon').removeClass('btn_Disabled');
	 });

   $('.risk_profiles tr').click(function(){
   		$('.risk_profile_table').slideDown();
   });

 		 $("#wrapper").css("height","auto");
		 $(".form-section-container").css("height","auto");

	/*$(".addicon").click(function(){
		$(".dashboardheading").html("Add Risk Profile");
		$("#wrapper").css("height","auto");
		$("#idBuinessMasters").empty();
		$("#idBuinessMasters").load("masters/addRiskprofile.html");
		$(".form-section-container").css("height","auto");
		$("#page-content-wrapper").css("height","auto");
		$('.editicon').hide();
		$('.deleteicon').hide();
	


	});
	$(".editicon").click(function(){
		$(".dashboardheading").html("Edit Risk Profile");
		$("#idBuinessMasters").empty();
		$("#idBuinessMasters").load("masters/editRiskprofile.html");
	 	$("#wrapper").css("height","auto");		
		$(".form-section-container").css("height","auto");
		$("#page-content-wrapper").css("height","auto");
		$(".nonload").css("display","block");
		$(".displayonload").hide();
		$('.editicon').addClass('btn_Disabled');
		
	
	});
	$(".deleteicon").click(function(){
		//$("#idClient").empty();
		//$("#idClient").load("clientInfo/deleteClient.html");
		 $('#myModal').modal('show');
		 $("#wrapper").css("height","1368px;");
		$("#page-content-wrapper").css("height","auto");
			$(".form-section-container").css("height","auto");
	
	});*/
	
	$(document).ready(function (event) {
		//console.log("aaaa");
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	       
	    loggedUserId=loggedUser.advisorMasterId;
	      
	    serviceurl = "getRiskProfileNameList/"+ loggedUserId;
	    // service is not working properly
	    getClientDataAsyncFalse("GET","",serviceurl, onRiskProfileNameListSuccess);   
	});
	function onRiskProfileNameListSuccess(data) {
	//	console.log("l "+data.length);
		var j=data.length;
		if(data.length===0){
			if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" )){
	          var pageUrl ="masters/addRiskprofile.html";
	          addPageBusiness(pageUrl,"Add Risk Profile Questions");
			}else{
			  addPageBusiness("masters/authorisationErrorPage.html","Access Denied");
			}


		}else{
			$("#riskProfileNameList").empty();
			var i=1;
			
			
			$.each(data, function (index, obj) {
		//		console.log("obj.id "+obj.id);
				if(i==1){
				$("#idMaxScore").val(obj.maxScore);		
				$("#idMinScore").val(obj.minScore);
				$("#idInterval").val(obj.scoreInterval);
				$("#rpNumber").val(obj.numberOfRiskProfiles);
				}
				
				$("#riskProfileNameList").append('<tr>' +
						'<td>' + i + '</td>' +
						'<td>' + obj.name + '</td>' +
						'<td>' + obj.scoreFrom.toFixed(2) + '</td>' +
						'<td style="text-align:center!important;">' + obj.scoreTo.toFixed(2) + '</td>' +
						/*'<td style="text-align:center!important;">' + (j==i?Math.floor(obj.scoreTo):obj.scoreTo.toFixed(2)) + '</td>' +*/
						'<td class="hidden"><input type="text" id="idRiskprofile" name="riskprofileId"  value=' + obj.id + ' readonly="readonly"></td>' +
				'</tr>');
				i=i+1;
			}); 
			$('#rpNumber').prop('disabled', true);
			 var serviceurl1="getAllQuestionWithResponse/"+loggedUserId;
			 getClientData("GET","",serviceurl1, onQuestionresponseListSuccess);
		}
	}
	
	
	function onQuestionresponseListSuccess(data) {
		//console.log("l "+data.length);

		if(data.length===0){

	          var pageUrl ="masters/addRiskprofile.html";
	          addPageBusiness(pageUrl,"");
			


		}else{
			$("#QuestionResponseList").empty();
			var n=1;
			$.each(data, function (index, obj) {
				//console.log("obj.id "+obj.id);
				$("#qNumber").val(data.length);
				$('#qNumber').prop('disabled', true);
				
				var html='<tr>' +
						'<td style="text-align:center!important;">' + n + '</td>' +
						'<td class="text-left">' + obj.question + '</td>' 
						
				'</tr>';
				var i = 97;
				 //console.log("nex1   "+i);
				var html1="";
				$.each(obj.riskProfileResponseBasedScoresDTO, function (index, objResponse) {
					var t=String.fromCharCode(i);
					//console.log("t "+t);
					 html1=html1+'<tr>' +
					'<td>&nbsp;</td>' +
					'<td class="text-left">' + t  +')'+' '+ objResponse.responseText + '</td>' +
					'<td style="text-align:center!important;">'+objResponse.score+'</td>' +
			'</tr>'
				i=i+1;
				});
				var html2=html+html1;
				$("#QuestionResponseList").append(html2);
				n=n+1;
			}); 
		}
	}
	