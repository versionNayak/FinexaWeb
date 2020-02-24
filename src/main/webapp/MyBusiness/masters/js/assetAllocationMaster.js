var totalLength ;
	var  lookupAssetsubclassData;
	
	 var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	 //alert(loggedUser.id);
	
$(document).ready(function(){
	//$.get( ClientServiceUrl+"getAdvisorRiskProfile/"+loggedUser.id, function( data ) {
	getClientData("GET", "", "getAdvisorRiskProfile/"+loggedUser.id, onSuccess);
	function onSuccess(data) {
	$("#noOfPortfolio").val(data.riskProfileCount);
	$("#noOfPortfolioBucket").val(data.riskProfileCount);
	}//);	
	

	
document.getElementById("defaultOpen").click();
			$(".selectprd").click(function(){
				$("#modelportfolio").show();
				$("#portfolioNamesText").html('');
				 totalLength = $("#noOfPortfolio").val();
				for(var i =0 ; i<=(totalLength-1); i++)
					{
					$("#portfolioNamesText").append('<tr><td><input type="text" style="height:29px;width: 17em;" value="" id="" class="form-control"/></td></tr>');	
					}
				
				
			});
			$(".modesub").click(function(){
				$("#mpa").show();
				var elementss = $("#portfolioNamesText").find('input');
				$("#dynamicHeading").empty();
				$("#dynamicHeading").append("<th>Model Portfolio Allocation</th>");
				$(elementss).each(function(elemenntkey,elementvalue){	
					$("#dynamicHeading").append("<th>"+elementvalue.value+"</th>");
			});
				
				$("#inputd").empty();
				//$.get( ClientServiceUrl+"getAllLookupAssetSubClass", function( data ) {
				getClientData("GET", "", "getAllLookupAssetSubClass", onSuccess1);
				function onSuccess1(data) {
					lookupAssetsubclassData=data;
					$(data).each(function(elemenntkey,elementvalue){	
						$("#inputd").append('<tr id=subAsset'+elementvalue.subAssetClassId+'></tr>');
						$("#subAsset"+elementvalue.subAssetClassId).append('<td style="text-align:left !important">'+elementvalue.subAssetClass+'</td>');
						
						for(var i =0 ; i<=(totalLength-1); i++)
						{
							$("#subAsset"+elementvalue.subAssetClassId).append('<td><input  onkeyup="edValueKeyPress(this)" type="text" style="height:29px;width: 7em;" value="" id="" class="form-control"/></td>');	
						}																				
						
				});
					
					$("#inputd").append('<tr id="totalSubAsset"></tr>');
					$("#totalSubAsset").append('<td style="text-align:left !important"><b>Total</b></td>');
					
					for(var i =0 ; i<=(totalLength-1); i++)
					{
						$("#totalSubAsset").append('<td><input   type="text" style="height:29px;width: 7em;" value="" id="" class="form-control"/></td>');	
					}	
					
					
						}//);	
			});
			

			
			$(".assetAllocationMaster").click(function(){
					var selectPortfolioNames=[];
				var portfolioNames = $("#portfolioNamesText").find('input');
				$(portfolioNames).each(function(k,v){
						selectPortfolioNames.push(v.value);	
				});
				$("#hiddenportFolioNames").val(selectPortfolioNames);
			//	alert(JSON.stringify(selectPortfolioNames));
				var selectSubAssetWeightageList="";
				var formObject=[];
				$(lookupAssetsubclassData).each(function(elemenntkey,elementvalue){			
				var id = "#subAsset"+elementvalue.subAssetClassId;
				var elementss = $(id).find('input');
				var newObj={};
				selectSubAssetWeightageList=[]
				$(elementss).each(function(inputkey,inputvalue){					
					selectSubAssetWeightageList.push(inputvalue.value==""?0.0:parseFloat(inputvalue.value));
				});
				newObj['subAssetClassId']= elementvalue.subAssetClassId;
				newObj['weightageList']= selectSubAssetWeightageList;
			//	alert(JSON.stringify(newObj));
				formObject.push(newObj);
				});
				var forObject ={};
				forObject['advisorid']=loggedUser.id;
				forObject['fromDate']=$("#fromDate").val();
				forObject['toDate']=$("#toDate").val();
				forObject['subAssetClassObjList']=formObject;
				forObject['portFolioNames']=selectPortfolioNames;
				 $.ajax({
				        contentType: 'application/json; charset=utf-8',
				        dataType: 'json',
				        type: 'POST',
				        url: ClientServiceUrl+'savelookupassetsubClass',
				        data: JSON.stringify(forObject),
				        beforeSend: function (xhr){ 
				    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				        },
				        success: function () {          
				         
				        }, error: function (jqXHR, status, err) {
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
					        }else if(jqXHR.status==200){
				            	  alert('data saved successfully');
				            	  var i, tabcontent, tablinks;
				            		tabcontent = document.getElementsByClassName("tabcontent");
				            		for (i = 0; i < tabcontent.length; i++) {
				            			tabcontent[i].style.display = "none";
				            		}
				            		tablinks = document.getElementsByClassName("tablinks");
				            		for (i = 0; i < tablinks.length; i++) {
				            			tablinks[i].className = tablinks[i].className.replace(" active", "");
				            		}
				            		document.getElementById("ihm").style.display = "block";
						           $("#investhorizon").addClass('active');
				            }
				        },
				        complete: function (jqXHR, status) {
				          alert("Local completion callback.");
				        },
				        failure: function (response) {          
				            alert(response);
				        }
				    }); 
			});
			
			$(".ihmsb1").click(function(){
				$("#modelportfolioihm").show();
			});
			$(".modesubihm").click(function(){
				$("#mpaihm").show();
			});
			
			$("#datepicker").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#customFieldDate").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#datepicker1").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#customFieldDate").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#datepicker2").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#customFieldDate").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#datepicker3").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#customFieldDate").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			
			
			
			
});	


function openCity(evt, cityName) {
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

function edValueKeyPress(val)
{
	//alert(val.value);
	var index = val.parentElement.cellIndex;
	var totalvalue =0;
	$(lookupAssetsubclassData).each(function(elemenntkey,elementvalue){			
		var id = "#subAsset"+elementvalue.subAssetClassId;
		if($(id+' td:nth-child('+(index+1)+')').children().val()!='')
		{	
		totalvalue = parseInt(totalvalue) +  parseInt($(id+' td:nth-child('+(index+1)+')').children().val());
		$('#totalSubAsset td:nth-child('+(index+1)+')').children().val(totalvalue);
		}
		if(totalvalue>100)
	{
			alert("can't be more than 100");
			$('#totalSubAsset td:nth-child('+(index+1)+')').children().val('');
			return false;
	}
});

    //var s = $("#edValue").val();
    //$("#lblValue").text(s);    
}
