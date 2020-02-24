$(".overlay").show();
$("#page-content-wrapper").css("height","1430px");
var noOfFundsPopulatedValue;
var fromDatePopulated;
var endDatePopulated;
var fundHouseNames=[];
var subAssetClassIdArr = [];
$('.editicon').hide();
$(document).ready(function(){
	if(loggedUser != null && loggedUser.role === "Admin"){
		$("#idClientSubmit").hide();
		$("#undo").hide();
	    }else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idClientSubmit").show();
			$("#undo").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idClientSubmit").hide();
			$("#undo").hide();
		}
	}
	$(".dashboardheading").html("Edit Product Recommendation Master");
	$("#productRecoMasterTable").hide();
	$("#saveForm").hide();
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedUserId=loggedUser.advisorMasterId;
	 $("#datepicker").datepicker({ 
			autoclose: true, 
			todayHighlight: true,
	        startDate:'-0m',
	        endDate: '-0m'
		}).datepicker();
	
	$("#datepicker").focusout(function() {		
		$("#fromDate").val(fromDatePopulated);
	});
	$(".calendar-icon-theme").click(function() {
		//$("#fromDate").val(fromDatePopulated);
		 $(this).closest(".input-group").find("input").trigger("focus");
	});
	/*$(".calendar-icon-container").focusout(function() {
		$("#fromDate").val(fromDatePopulated);
	});*/
	$("#datepicker1").datepicker({ 
		autoclose: true, 
		todayHighlight: true,
        startDate: '-0m',
	}).datepicker();
	
	$("#datepicker1").focusout(function() {		
	$("#endDate").val(endDatePopulated);
      });
	
    $(".calendar-icon-theme").click(function() {
	//$("#endDate").val(endDatePopulated);
    	 $(this).closest(".input-group").find("input").trigger("focus");
      });
    /*$(".calendar-icon-container").focusout(function() {
    	$("#endDate").val(endDatePopulated);
          });*/
		var iDs =[];
		var funHouseName ;
		getClientData("GET", "", "getAllAssetSubAssetClasses", onSuccess1);
		function onSuccess1(data) {
	//$.get( ClientServiceUrl+"getAllAssetSubAssetClasses", function( data ) {
		$(data).each(function(k,v){
			var desiredSubAssetClass = (v.subAssetClass).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\//\s/g]/gi, '');
			desiredSubAssetClass = (desiredSubAssetClass.trim());
			$("#assetSubAssetClassID").append("<tr id="+v.subAssetClassId+"><td>"+v.assetClass+"</td><td>"+v.subAssetClass+"</td><td>"+
							"<table class='addschmebusiness' >"+
							"<tbody id='"+desiredSubAssetClass+"ID'></tbody></table></td></tr>");
			iDs.push(desiredSubAssetClass+"ID");
			subAssetClassIdArr.push(v.subAssetClassId);
	});
		
		
		var allSubClassRowelementss = $("#assetSubAssetClassID").find('select');

		var fundHouseNames=[];
		getClientData("GET", "", "fundHouseList", onSuccess2);
		function  onSuccess2() {
			
			$("#fundHouseNames").append('<option value="0">Select fund house</option>');
			$(data).each(function(k,v){
				//$("#fundHouseNames").append('<option value='+v+'>'+v+'</option>');
				fundHouseNames.push('<option value='+v+'>'+v+'</option>');
				
			});	
		
		}
		/*$.get( ClientServiceUrl+"fundHouseList", function( data ) {	
			$("#fundHouseNames").append('<option value="0">Select fund house</option>');
			$(data).each(function(k,v){
				//$("#fundHouseNames").append('<option value='+v+'>'+v+'</option>');
				fundHouseNames.push('<option value='+v+'>'+v+'</option>');
				
			});	
		});*/
		
		/* count for numbver of funds */
		getClientData("GET", "", "getAdvisorMFProductFundDetails?advisorId="+loggedUserId, onSuccess3);
		function onSuccess3(data) {

			//funHouseName = data[1];
			
			$("#fromDate").val(data[1]);
		    fromDatePopulated=data[1];
			//alert(fromDatePopulated);
			$("#endDate").val(data[2]);
		    $("#noOfFunds").val(data[0]);
		    getRequredIndividualCover=data[0];
		    //alert(fromDatePopulated);
		    $("#fromDate").val(fromDatePopulated);
		  
		    endDatePopulated=data[2];
		    //$("#datepicker").datepicker('setDate', fromDatePopulated);
		   
		//$('#fundHouseNames option:contains('+funHouseName+')');
		/* count for numbver of funds ends */

		/* number of scheme list added  */
		 var totalNo = data[0];
		 var counter=0;
		$(iDs).each(function(k,v){
			 var counter=totalNo;
			$("#"+v).empty();
			
			 while(counter!=0)
		    	{
				 $("#"+v).append('<tr id="fundRow'+v+'"><td><select id="fundHouseNames"'+v+' onchange="mySelectFundHouse(this,'+subAssetClassIdArr[k]+')"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"></select>'+
						'<select onchange="myFunction(this)"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"></select></td></tr>');
				 counter--;
		    	}
		});

		$("#productRecoMasterTable").show();
		$("#saveForm").show();
		
		
		/* fund house pouplated and scheme list auto populate*/
		var selectedFund = funHouseName;
		var elementss = $("#assetSubAssetClassID").find('select');
		//alert(elementss.length);
		/*elementss.add(firstoption,null);*/
		$(elementss).each(function(elemenntkey,elementvalue){
			var firstelementText="";
			if(elementvalue.id!='')
				{ firstelementText="Select Fund House Name";				
				}/*else
					{
					firstelementText="Select Scheme Name";
					}*/			
			elementvalue.options.length = 0;
				var option = document.createElement("option");
				option.value = "0";
				option.text =firstelementText;
				elementvalue.add(option,null);
				
		});
			
		
		var elementCount =1;
		var populateSchemeNameFlag=false;
		var lastSubAssetClassId=0;
		 var fundHouseName ="";
		 var count=0;
			$(elementss).each(function(elemenntkey,elementvalue){
		
				 var node = elementvalue.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				// alert(elementvalue.id!='');
				 if(elementvalue.id!='')
					 {
				 if(lastSubAssetClassId!=node.id)
					{
					 fundHouseNames=[];
					 fundHouseNames =  getFundHouseListName(node.id);
					 count=0;
					}else
						{
						count++;
						}
				 if(lastSubAssetClassId!=node.id)
					{
					fundHouseName = getFundHouseName(loggedUser.id,node.id);
					}
				// alert(fundHouseName);
				//	alert(count);
				//	alert(fundHouseName[count]);
				 $(fundHouseNames).each(function(fundHousekey,fundHousevalue){

					 if(fundHousevalue!="")
						 {
						// alert(fundHouseName[count]);
						// alert(fundHouseName[count]);
					//	 alert(fundHousevalue);
						var option = document.createElement("option");
						option.value = fundHousevalue;
						option.text =fundHousevalue;
						if(fundHouseName[count]==fundHousevalue)
							{
							option.selected = true;							
							}
						elementvalue.add(option,null);
						
						 }
					});	
				// alert(lastSubAssetClassId!=node.id);
					
					
					//alert(fundHouseName);
				 
					 }else
						 {
						// alert(fundHouseName);
					//	 alert(fundHouseName);
					//	 alert(count);
				var schemeNameList= autoPopulateSchemeFund(fundHouseName[count],node.id);
				//alert(schemeNameList);
				$(schemeNameList).each(function(schemekey,schemeValue){
					
				//	alert(schemeValue.subAssetClassId==node.id);
					if(schemeValue.subAssetClassId==node.id)
					{					
					var option = document.createElement("option");
					option.value = schemeValue.isin;
					option.text =schemeValue.schemeName;
					elementvalue.add(option,null);
					}
				});	
						 }
				//alert(elementvalue.length);
				elementCount++;
				if(elementCount>elementss.length)
					{
					populateSchemeNameFlag=true;
					}
				if(populateSchemeNameFlag)
				{
			// populate scheme list 
			var trelementss = $("#assetSubAssetClassID").find('tr');
			var chekPoint =true;
			$(trelementss).each(function(k,v){
				
			if(v.id!='')
			{
			var allSelect = $("#"+v.id).find('select');
			$(allSelect).each(function(selectkey,selectvalue){
				//alert(value.options.length);
				//value.nodeName.value="INF209K01SQ5";
				//alert(value.value);
				var flag = true;
				$(productRecoMap).each(function(listKey,listvalue){
				//alert("2");
					if((listvalue.subAssetClassId==v.id) && flag)
						{
						$(selectvalue.options).each(function(optionkey,optionvalue){
							if((optionvalue.value==listvalue.isin) && flag)
							{
								selectvalue.value=listvalue.isin;
								listvalue.isin="";
					            flag = false;
					            return false;
					        }

							
							});
						return flag;
						
						}
					
					
					});
				});	
			}
			//return false;
			});	
				}

					lastSubAssetClassId=node.id;
			});
$(".overlay").hide();	
	
		}
		/*$.get( ClientServiceUrl+"getAdvisorMFProductFundDetails?advisorId="+loggedUser.id, 
				function( data ) {
			
		});
		*/
		
		/* number of scheme list added  ends*/
		
		
		

		
	};
		
	
	var selectMFList="";
	var uploadData=[]
	$("#saveForm").click(function(){
		if($("#fromDate").val()=='')
			{
			bootbox.alert('Please select From Date');
			$("#fromDate").focus();
			return false;
			}else
				{
		if($("#endDate").val()=='')
			{
			bootbox.alert('Please select To Date');
			$("#endDate").focus();
			return false;
			}
		else{	
		
		/*if($('#fundHouseNames').has('option').length <= 0)
			{
			bootbox.alert('Please select number of funds recommended');
			$("#noOfFunds").focus();return false;
			}else
				{
				if($('#fundHouseNames').val()==0)
					{
					bootbox.alert('Please select a fund house');
					$("#endDate").focus();return false;
					}else{
						
						
						
					}
				}*/
		}
				}
		
		selectMFList="";
		var elementss = $("#assetSubAssetClassID").find('select');
		var chekPoint =true;
		$(elementss).each(function(k,v){
			if(v.id==null ||v.id=="")
			{
			/*if(v.value==0){
				bootbox.alert('Please select recommended scheme names');
				chekPoint=false;
				return false;
			}*/
			if(k==(elementss.length-1))
				{
				selectMFList=selectMFList+''+v.value;
				}else
					{
					selectMFList=selectMFList+''+v.value+',';
					}
			}
		});
		if(chekPoint)
			{
			$.ajax({
				async: true,
				url: ClientServiceUrl+'editMasterMfProductReco?advisorId='+loggedUserId+'&isinList='+selectMFList+'&fromDate='+$("#fromDate").val()+'&endDate='+$("#endDate").val(),	
				method: 'POST',
				dataType: 'json',
			    beforeSend: function (xhr){ 
			    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				},
				contentType: "application/json; charset=utf-8",
				success:function(data)
		    	{
		    	$("#dashbord").empty();
		    	$("#dashbord").load("masters/productRecommendationMaster.html");
		    	$(".dashboardheading").html("View Product Recommendation Master");
		    	$("#addRecord").removeClass('btn_Disabled');
		       /* $("#headIcon").empty();
		        var url = "masters/addproduct.html";
		        var heading="Add Product Recommendation Master";
		        $("#headIcon").empty();
		        $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
		    	$("#addRecord").removeClass('btn_Disabled');*/
		    	},
		       error: function (jqXHR, exception) {
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
		      }
		});
/*		$.post( ClientServiceUrl+"editMasterMfProductReco", { advisorId: loggedUser.id, isinList:selectMFList,fromDate:$("#fromDate").val() ,endDate:$("#endDate").val() })
		  .done(function( data ) {
			  console.log(data);
		//    bootbox.alert( data.statusMessage);
		    if(data.statusCode=='success')
		    	{
		    	$("#dashbord").empty();
		    	$("#dashbord").load("masters/productRecommendationMaster.html");
		    	$(".dashboardheading").html("View Product Recommendation Master");
		    	$("#addRecord").removeClass('btn_Disabled');
		        $("#headIcon").empty();
		        var url = "masters/addproduct.html";
		        var heading="Add Product Recommendation Master";
		        $("#headIcon").empty();
		        $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
		    	$("#addRecord").removeClass('btn_Disabled');
		    	}else
		    		{
		    		bootbox.alert( data.statusMessage);	
		    		bootbox.alert({
		    		    message: data.statusMessage,
		    		    callback: function () {
		    		    	loadViewPage();
		    		    }
		    		});
		    		}
		  });*/
		}
		
	}); 

	function loadViewPage(){

		 $("#idBuinessMasters").empty();
		 $("#idBuinessMasters").load("masters/editproduct.html");
        $(".dashboardheading").html("View Product Recommendation Master");
	}
	//alert("subAssetClassIdArr.length() "+subAssetClassIdArr.length());
	$('#noOfFunds').on('change', function (e) {
		// console.log("subAssetClassIdArr "+subAssetClassIdArr[1]);
		
		 console.log("subAssetClassIdArr.length() "+subAssetClassIdArr.length);
		 bootbox.confirm({
			 title: "All the data will refresh.",
		     message: "All the data will refresh.",
	    	callback: function (result) {
	    		 if (result === true) {	    			 
	    		
	    			 refreshCheck(iDs,$('#noOfFunds').val(),subAssetClassIdArr);
	 			}else
	 				{
	 				$('#noOfFunds').val(getRequredIndividualCover);
	 				}
 				
				}	
		});

		
	    
	

		//$("#productRecoMasterTable").show();
	//	$("#saveForm").show();
			
	});
	});



function refreshCheck(iDs,totalFund,subAssetClassIdArr)
{
	 var totalNo = totalFund;

	 var counter=0;
	 fundHouseNames=[];
	 getClientData("GET", "", "fundHouseList", onSuccess);
		function onSuccess(data) {
			
			
			$(data).each(function(k,v){
				//$("#fundHouseNames").append('<option value='+v+'>'+v+'</option>');
				fundHouseNames.push('<option value='+v+'>'+v+'</option>');
				
			});	
			
			$(iDs).each(function(k,v){
				 var counter=totalNo;
				$("#"+v).empty();
				
				 while(counter!=0)
			    	{
					 $("#"+v).append('<tr id="fundRow'+v+'"><td><select id="fundHouseNames"'+v+' onchange="mySelectFundHouse(this,'+subAssetClassIdArr[k]+')"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"><option value="0">select fund house</option>'+fundHouseNames+'</select>'+
						'<select onchange="myFunction(this)"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"></select></td></tr>');
					 counter--;
			    	}
			});

			$("#productRecoMasterTable").show();
			$("#saveForm").show();
			
		
		}
/*		$.get( ClientServiceUrl+"fundHouseList", function( data ) {	
		
			$(data).each(function(k,v){
				//$("#fundHouseNames").append('<option value='+v+'>'+v+'</option>');
				fundHouseNames.push('<option value='+v+'>'+v+'</option>');
				
			});	
			
			$(iDs).each(function(k,v){
				 var counter=totalNo;
				$("#"+v).empty();
				
				 while(counter!=0)
			    	{
					 $("#"+v).append('<tr id="fundRow'+v+'"><td><select id="fundHouseNames"'+v+' onchange="mySelectFundHouse(this,'+subAssetClassIdArr[k]+')"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"><option value="0">select fund house</option>'+fundHouseNames+'</select>'+
						'<select onchange="myFunction(this)"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"></select></td></tr>');
					 counter--;
			    	}
			});

			$("#productRecoMasterTable").show();
			$("#saveForm").show();
			
		});*/
	
	 
}







			

function contains(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return true;
        }
    }
    return false;
}


function myFunction(val) {
   var node = val.parentNode.parentNode.parentNode;
    
   var elementss = $("#"+node.id).find('select');
	/*elementss.add(firstoption,null);*/
   var selectElements=[];
   $(elementss).each(function(elemenntkey,elementvalue){
	   if(elementvalue.id=='')
		   {
	   if(selectElements.length>0)
		   {
		   var elemnetcheck =  contains(selectElements,elementvalue.value);

		   if(elemnetcheck)
			   {
			   
			   bootbox.alert("Already Selected");
			   val.value="0";
			   return false;
			   }
		   
	 }
	   else
		   {
		   selectElements.push(elementvalue.value);
		   }}
	  
	});
 
}
var lastselected=false;
function mySelectFundHouse(val,subAssetClassID) {
	//alert(val.nextSibling.nodeName);
	
	//alert(val.options[val.selectedIndex].text);
	
	  var node = val.parentNode.parentNode.parentNode;
	  //  alert("#"+node.id);
	   var elementss = $("#"+node.id).find('select');
		/*elementss.add(firstoption,null);*/
	   var selectElements=[];
	  var countFund=0;
	   $(elementss).each(function(elemenntkey,elementvalue){
		   if(elementvalue.id!='' && elementvalue.value!='0')
			   {
		   if(selectElements.length>0)
			   {
			   var elemnetcheck =  contains(selectElements,elementvalue.value);

			   if(elemnetcheck)
				   {				   
				 //  bootbox.alert("Already Selected Fund");
				 //  val.value="0";
				//   lastselected=false;
				//   return false;
				   }else
					   {
					   if(!lastselected &&countFund>0)
						   {
						   bootbox.alert("Please select fund sequentially.");
						   val.value="0";
						   lastselected=false;
						   return false;
						   }
					   }
			   
		 }
		   else
			   {
			   selectElements.push(elementvalue.value);
			   }
		   lastselected=true;
			   }else
				   {if(elementvalue.id!='' && elementvalue.value=='0')
					   {
					   lastselected=false;
					   }
				   
				   }
		   countFund++;
		 //  alert(lastselected);
		});
	
	
	
	
	
	
	var selectedFund =  val.options[val.selectedIndex].text;
	val.nextSibling.options.length = 0
	var schemeSelect = val.nextSibling;
	
//	elementss.add(firstoption,null);
			var option = document.createElement("option");
			option.value = "0";
			option.text ="Select Scheme Name";
			schemeSelect.add(option,null);
			$.get( ClientServiceUrl+"getSchemeFromFund/"+selectedFund+"/"+subAssetClassID, function( data ) {		
			 var node = schemeSelect.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			// alert(node.id);
			
			//alert(elementvalue.parentNode.parentNode.id);
			$(data).each(function(key,value){
				if(value.subAssetClassId==node.id)
					{				
				var option = document.createElement("option");
				option.value = value.isin;
				option.text =value.schemeName;
				schemeSelect.add(option,null);
					}
			});

		
		
});
	}


function getFundHouseName(advisorId,subAssetClassId)
{
	var fundHouseName=[];
	$.ajax({
		type: 'GET',
		async:false,
		url: ClientServiceUrl+"getAdvisorMFProductSelectedFundDetails?advisorId="+advisorId+"&subAssetClassId="+subAssetClassId,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			//alert(data);
			fundHouseName = data;
		},
		error: function (jqXHR,data) {
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
			fundHouseName = data.responseText;
		}

	});
	return fundHouseName;
}
function getFundHouseListName(subAssetClassId)
{
	$.ajax({
		type: 'GET',
		async:false,
		//url: ClientServiceUrl+"fundHouseListForSubAsset/"+subAssetClassId,
		url: ClientServiceUrl+"fundHouseList",
		
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			//fundHouseName = data;
			$(data).each(function(k,v){
				//$("#fundHouseNames").append('<option value='+v+'>'+v+'</option>');
				fundHouseNames.push(v);			
			});	
		},
		error: function (jqXHR,data) {
			if(jqXHR.status == 401){
	    	//msg = 'You are not authorized to access this data.';
	    	bootbox.alert({
	    	    message: "You are not authenticated",
	    	    callback: function () {
	        	  window.location = "../index.html";
	        		
	    	    }
	    	})
	      }
		}

	});
	return fundHouseNames;
}

function autoPopulateSchemeFund(selectedFund,subAssetClassID) {
var selectedFundNames=[];
if(selectedFund!=undefined){
$.ajax({
	type: 'GET',
	async:false,
	url:  ClientServiceUrl+"getSchemeFromFund/"+selectedFund+"/"+subAssetClassID,	
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		//fundHouseName = data;
		$(data).each(function(k,v){
			//$("#fundHouseNames").append('<option value='+v+'>'+v+'</option>');
			selectedFundNames.push(v);			
		});	
	},
	error: function (jqXHR,data) {
		if(jqXHR.status == 401){
    	//msg = 'You are not authorized to access this data.';
    	bootbox.alert({
    	    message: "You are not authenticated",
    	    callback: function () {
        	  window.location = "../index.html";
        		
    	    }
    	})
      }
	}

});
}
	return selectedFundNames;
	}

	