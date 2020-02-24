var totalRiskScoreLength ;
	var  lookupAssetsubclassData;
	var formObjList=[];
$(document).ready(function(){
		

			$(".ihmsb1").click(function(){
				$("#modelportfolioihm").show();
				$("#bucketingMasterTable").empty();
				totalRiskScoreLength = $("#noOfPortfolioBucket").val();
				for(var i =0 ; i<=(totalRiskScoreLength-1); i++)
					{
					$("#bucketingMasterTable").append('<tr><td style="width: 24%;">'+(i+1)+'</td><td><label>0</label></td><td><input type="text" onkeyup="edValueKeyPress(this)" style="height:29px;width: 17em;" value="" id="" class="form-control"/></td></tr>');	
					}
				
				
			});
			$(".modesubihm").click(function(){
				
				
				 var  allPortfolioNames =  $("#hiddenportFolioNames").val().split(',');
			     var selectOptionListHTML = '';
					$(allPortfolioNames).each(function(k,v){
/*							alert(k);
							alert(v);*/
						selectOptionListHTML=selectOptionListHTML+'<option val='+v+'>'+v+'</option>';
					});
				
				$("#mpaihm").show();
				var elementss = $("#bucketingMasterTable").find('input');
				$("#dynamicBucketHeading").empty();
				$("#dynamicBucketHeading").append("<th>Bucket No.</th>");
				$("#dynamicBucketHeading").append("<th>From (months)</th>");
				$("#dynamicBucketHeading").append("<th>To (months)</th>");
				for(var i =0 ; i<=(totalRiskScoreLength-1); i++)
				{
					//alert(i);
					$("#dynamicBucketHeading").append("<th>"+(i+1)+"</th>");	
				}
				var elementss = $("#bucketingMasterTable").find('tr');
				$("#bucketTable").empty();
				;
				$(elementss).each(function(elemenntkey,elementvalue){	
				//	alert(elementvalue.nodeName);
					var formObject={};
					var bucketCode ='B_'
				//	$("#bucketTable").append("<tr></tr>");
					var rowhtml = '';
					var c = elementvalue.childNodes;
				    var txt = "";
				    var i;
				    var cellhtml='';
				    var secondChild = '';
				    var thirdChild = '';
				    cellhtml =cellhtml+'<td style="text-align:left !important">'+(elemenntkey+1)+'</td>';
				    for (i = 0; i < c.length; i++) {
				    	
				   if(i>0)
					   {
				        if(c[i].firstChild.nodeName=='LABEL')
				        	{
				        //	alert(c[i].firstChild.textContent);
				        	cellhtml=cellhtml+'<td> <label>'+c[i].firstChild.textContent+'</label></td>';
				        	formObject['lcMonthsToGoal']=c[i].firstChild.textContent;
				        	bucketCode=bucketCode+c[i].firstChild.textContent+'_';
				        	}
				        if(c[i].firstChild.nodeName=='INPUT')
			        	{
				        //	alert(c[i].firstChild.value);
				        	cellhtml=cellhtml+'<td> <label>'+c[i].firstChild.value+'</label></td>';
				        	formObject['ucMonthsToGoal']=c[i].firstChild.value;
				        	bucketCode=bucketCode+c[i].firstChild.textContent+'_'+c[i].firstChild.value;
			        	}
					   }
				    		
				    }
				
				    for(var i =0 ; i<=(totalRiskScoreLength-1); i++)
					{
				    
				    	cellhtml =cellhtml+'<td style="text-align:left !important"><select class="form-control">'+selectOptionListHTML+'</select></td>';	
					}
				    
				    rowhtml = '<tr>'+cellhtml+'</tr>';
				    $("#bucketTable").append(rowhtml);
				    formObject['bucketCode']=bucketCode;
				    formObjList.push(formObject);
			});
				
				
				
			});
			
			
			$(".bucketMasterSubmit").click(function(){
					var selectPortfolioNames=[];
			
				
					
					var elementss = $("#bucketTable").find('tr');
					$(elementss).each(function(elemenntkey,elementvalue){	
						//	alert(elementvalue.nodeName);
						var selectedPortNameList=[]
						var formObj = formObjList[elemenntkey];
						
						var c = elementvalue.childNodes;
						   for (i = 0; i < c.length; i++) {							  						    
							   if(i>0)
								   {
							        if(c[i].firstChild.nodeName=='SELECT')
						        	{
							        	 //alert(c[i].firstChild.value);
							        	selectedPortNameList.push(c[i].firstChild.value);
						        	}
							        		}
								   }	
						   
						   formObj['portfolioList']=selectedPortNameList;
						   formObj['advisorid']=1;
						   formObjList[elemenntkey] = formObj;
						// alert(JSON.stringify(formObjList));
					});
					
					
				 $.ajax({
				        contentType: 'application/json; charset=utf-8',
				        dataType: 'json',
				        type: 'POST',
				        url: ClientServiceUrl+'saveLookupBucketMaster',
				        data: JSON.stringify(formObjList),
				        beforeSend: function (xhr){ 
				    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				        },
				        success: function () {          
				            $('#result').html('"PassThings()" successfully called.');
				        },
				        failure: function (jqXHR,response) { 
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
				            $('#result').html(response);
				        }
				    }); 
				 formObjList=[];
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
	// alert(val.value);
	//var index = val.parentNode.parentNode.nextSibling.innerHTML;
	
	var c = val.parentNode.parentNode.nextSibling.childNodes;
    var txt = "";
    var i;
    for (i = 0; i < c.length; i++) {
    	if(i==1)
    		{
        c[i].firstChild.textContent = val.value==''?0:parseInt(val.value)+1;
    		}
    }
	}
