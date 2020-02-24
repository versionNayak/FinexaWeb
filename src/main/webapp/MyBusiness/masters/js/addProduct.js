$("#page-content-wrapper").css("height","1430px");
$(document).ready(function(){
	$("#productRecoMasterTable").hide();
	$("#saveForm").hide();
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedUserId=loggedUser.advisorMasterId;
	/*$("#datepicker").datepicker({ 
		autoclose: true, 
		todayHighlight: true,
		 maxDate: $.now() ,
	}).datepicker();*/
	$("#datepicker").datepicker().datepicker('setDate','today');
	$("#fromDate").prop('disabled', true);
	/*$("#datepicker1").datepicker({ 
		autoclose: true, 
		todayHighlight: true,
		 maxDate: $.now() ,
	}).datepicker();*/
	
	$("#datepicker1").datepicker({
		autoclose: true, 
		todayHighlight: true,
        startDate: '-0m',
	}).datepicker();
	
	var iDs =[];
	var subAssetClassId = [];
	//get( ClientServiceUrl+"getAllAssetSubAssetClasses", function( data ) {
	getClientData("GET", "", "getAllAssetSubAssetClasses", onSuccess1);
	function onSuccess1(data) {
		$(data).each(function(k,v){
			var desiredSubAssetClass = (v.subAssetClass).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\//\s/g]/gi, '');
			desiredSubAssetClass = (desiredSubAssetClass.trim());
			$("#assetSubAssetClassID").append("<tr id="+v.subAssetClassId+"><td>"+v.assetClass+"</td><td>"+v.subAssetClass+"</td><td>"+
							"<table class='addschmebusiness' >"+
							"<tbody id='"+desiredSubAssetClass+"ID'></tbody></table></td></tr>");
			iDs.push(desiredSubAssetClass+"ID");
			subAssetClassId.push(v.subAssetClassId);
	});
	};
	var fundHouseNames=[];
	//$.get( ClientServiceUrl+"fundHouseList", function( data ) {
	getClientData("GET", "", "fundHouseList", onSuccess2);
	function onSuccess2(data) {
		$("#fundHouseNames").append('<option value="0">select fund house</option>');
		$(data).each(function(k,v){
			//$("#fundHouseNames").append('<option value='+v+'>'+v+'</option>');
			fundHouseNames.push('<option value='+v+'>'+v+'</option>');
			
		});	
	}//);
	var mfList =[];
	

	
	$('#noOfFunds').on('change', function (e) {

		 var totalNo = this.value;
		 var counter=0;
		
		$(iDs).each(function(k,v){
			 var counter=totalNo;
			 $("#"+v).empty();
			//console.log("subAssetClass Id "+subAssetClassId[k]);
			 while(counter!=0)
		    	{
				 $("#"+v).append('<tr id="fundRow'+v+'"><td><select id="fundHouseNames"'+v+' onchange="mySelectFundHouse(this,'+subAssetClassId[k]+')"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"><option value="0">select fund house</option>'+fundHouseNames+'</select>'+
					'<select onchange="myFunction(this)"  style="padding-top:7px;width:308px" class="form-control input-width-medium"  tabindex="430"></select></td></tr>');
				 counter--;
		    	}
		});

		$("#productRecoMasterTable").show();
		$("#saveForm").show();
	});
	
	
	
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
			{bootbox.alert('Please select End Date');$("#endDate").focus();return false;}
		else{	
		
		if($('#fundHouseNames').has('option').length <= 0)
			{
			bootbox.alert('Please Select number of funds recommended');
			$("#noOfFunds").focus();return false;
			}else
				{
				if($('#fundHouseNames').val()==0)
					{
					bootbox.alert('Please Select a fund house');
					$("#endDate").focus();return false;
					}else{
						
					}
				}}
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
		/*$.post( ClientServiceUrl+"saveMasterMfProductReco", { advisorId: loggedUser.id, isinList:selectMFList,fromDate:$("#fromDate").val() ,endDate:$("#endDate").val() })
		  .done(function( data ) {
			  
		//    bootbox.alert( data.statusMessage);
		    if(data.statusCode=='success'){
		    	$("#dashbord").empty();
		    	$("#dashbord").load("masters/productRecommendationMaster.html");
		    	$(".dashboardheading").html("View Product Recommendation Master");

			    	 url = "masters/editProductRecommendationMaster.html";
			        	heading="Edit Product Recommendation Master";
			        	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
			    	 
			    	url = "masters/viewProductRecommendationMaster.html";
			        	$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='confirmationClickBusiness()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
			        	$("#addRecord").removeClass('btn_Disabled');
			        	$('#editRecord').addClass('btn_Disabled');
			        	$('#deleteRecord').addClass('btn_Disabled');
			    	$("#addRecord").removeClass('btn_Disabled');
		    }
		    	
		    	else
		    		{
		    		bootbox.alert( data.statusMessage);	
		    		}
		  }//);
*/		
		
		
		$.ajax({
			type: 'POST',
			url:  ClientServiceUrl+'saveMasterMfProductReco?advisorId='+loggedUserId+'&isinList='+selectMFList+'&fromDate='+$("#fromDate").val()+'&endDate='+$("#endDate").val(),	
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
		    	$("#dashbord").empty();
		    	$("#dashbord").load("masters/productRecommendationMaster.html");
		    	$(".dashboardheading").html("View Product Recommendation Master");

			    	/* url = "masters/editProductRecommendationMaster.html";
			        	heading="Edit Product Recommendation Master";
			        	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
			    	 */
			    	/*url = "masters/viewProductRecommendationMaster.html";
			        	$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='confirmationClickBusiness()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
			        	$("#addRecord").removeClass('btn_Disabled');
			        	$('#editRecord').addClass('btn_Disabled');
			        	$('#deleteRecord').addClass('btn_Disabled');*/
			    	$("#addRecord").removeClass('btn_Disabled');
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
			}

		});
		//==============
		}
		
		
	}); 
 });

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
  //  alert("#"+node.id);
   var elementss = $("#"+node.id).find('select');
	/*elementss.add(firstoption,null);*/
   var selectElements=[];
   $(elementss).each(function(elemenntkey,elementvalue){
	   if(elementvalue.id=='' &&elementvalue.value!='0')
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
		   }
		   }
	});
 
}
var lastselected=false;
function mySelectFundHouse(val,subAssetClassID) {
	  var node = val.parentNode.parentNode.parentNode;
	   var elementss = $("#"+node.id).find('select');
		/* elementss.add(firstoption,null); */
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
				 // bootbox.alert("Already Selected Fund");
				 // val.value="0";
				// lastselected=false;
				// return false;
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
		   {
		   if(elementvalue.id!='' && elementvalue.value=='0')
			{
			 lastselected=false;
			}  
			}
		   countFund++;
		 // alert(lastselected);
		});
	
	
	
	
	
	
	var selectedFund =  val.options[val.selectedIndex].text;
	val.nextSibling.options.length = 0
	var schemeSelect = val.nextSibling;
	
// elementss.add(firstoption,null);
			var option = document.createElement("option");
			option.value = "0";
			option.text ="Select Scheme Name";
			schemeSelect.add(option,null);
		// console.log("subAssetClassID "+subAssetClassID);
			// $.get(
			// ClientServiceUrl+"getSchemeFromFund/"+selectedFund+"/"+subAssetClassID,
			// function( data ) {
			getClientData("GET", "", "getSchemeFromFund/"+selectedFund+"/"+subAssetClassID, onSuccess3);
			function onSuccess3(data) {
			 var node = schemeSelect.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		// console.log(node.id);
			
			// alert(elementvalue.parentNode.parentNode.id);
			$(data).each(function(key,value){
				if(value.subAssetClassId==node.id)
				{				
				var option = document.createElement("option");
				option.value = value.isin;
				option.text =value.schemeName;
				schemeSelect.add(option,null);
				}
			});
		
		}// );
	}
	
	