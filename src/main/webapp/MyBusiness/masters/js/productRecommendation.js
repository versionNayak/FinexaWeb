$("#page-content-wrapper").css("height","1600px");
var productRecoMap = [];
var expireCheck=false;
$(document).ready(function(){
	$('#addRecord').hide();
	if((loggedUser != null) && (loggedUser.MastersAddEdit != null && loggedUser.MastersAddEdit === "Y" ))
	{
		$(".addicon").show();
		$(".editicon").show();
	}else
	{
		$(".addicon").hide();
		$(".editicon").hide();
	}
	
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	//console.log("loggedUser "+loggedUser.id);
	//$.get( ClientServiceUrl+"getAllProductRecommendations?advisorId="+loggedUser.id, function( data ) {
	 getClientData("GET", "", "getAllProductRecommendations?advisorId="+loggedUser.id, onSuccess);
	 function onSuccess(data) {
		if(data.length>0)
			{
			if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" )){
			var lastSubAssetId=0;
			var currIndex=0;
		$(data).each(function(k,v){
			//if(k<4)
			if(lastSubAssetId===v.subAssetClassId)
				{
				currIndex++;
				}else
					{
					currIndex=0;
					}
			var productRecoSchemeObj={};
			productRecoSchemeObj['index']=currIndex;
			productRecoSchemeObj['isin']=v.isin;
			productRecoSchemeObj['subAssetClassId']=v.subAssetClassId;
		//	alert(v.statusMessage);
			if(v.statusMessage!='expired')
			{$("#productRecoMastertable").append("<tr><td>"+v.schemeName+"</td><td>"+v.subAssetClass+"</td><td>"+v.assetClass+"</td></tr> ");
			
			}else
		{
				expireCheck=true;
		}
			 productRecoMap.push(productRecoSchemeObj);
			//	alert(productRecoMap.length);
				
				lastSubAssetId=v.subAssetClassId;
			});
		$(window).scrollTop(0);
if(expireCheck)
	{
	$("#masterProductDownload").hide();
	bootbox.alert({
    message: 'Product Recommendations for current date is not available. Please Edit and  update the date',
    callback: function () {
    	loadViewPage();
    }
		});
	
	}
   }else{
	addPageBusiness("masters/authorisationErrorPage.html","Access Denied");
   }
	}else
		{
		 $("#wrapper").css("height","1433px;");
		 $(".fieldsrequired").html("Field marked * as mandatory");
		 $("#idClient").empty();
		 $("#idClient").load("masters/addproduct.html");
	     $(".form-section-container").css("height","1937px");
	     $('.editicon').hide();
		}
	}//);	
	
	function loadViewPage(){

		 $("#idBuinessMasters").empty();
		 $("#idBuinessMasters").load("masters/editproduct.html");
        $(".dashboardheading").html("View Product Recommendation Master");
	}
	
	$("#masterProductDownload").click(function(){
		//alert(JSON.stringify(productRecoMap));
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", ClientServiceUrl+"downloadAllProductRecommendations?advisorId="+loggedUser.id, true);
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			xhr.responseType = "blob";
			xhr.onload = function() {
				if(xhr.status == 401){
		        	bootbox.alert({
		        	    message: "You are not authenticated",
		        	    callback: function () {
			        	  window.location = "../index.html";
		        	    }
		        	})
		        }
				
				var url = window.URL.createObjectURL(xhr.response);  
				a.href = url;
				a.download = "Master_Product_Recommendation.xlsx";
				a.click();
				window.URL.revokeObjectURL(url);
			};
			xhr.send();  
		
		
	});
	});
	
	