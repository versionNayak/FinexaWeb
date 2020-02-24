//document.getElementById("defaultOpen").click();
var flag=false;
$(document).ready(function(){
	
	   $("#btnSubmit").click(function (event) {

	        //stop submit the form, we will post it manually.
	        event.preventDefault();
	        //alert('hello dear');
	        fire_ajax_submit();

	    });

});
function validateLogoImageSize(file) {

//	alert(file.files[0].type);
    var FileSize = file.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
    	 bootbox.alert('File size cannot exceeds 2 MB');
        file.value = null;   
    } else {
    	if(file.files[0].type==="image/png" || file.files[0].type==="image/jpeg" || file.files[0].type==="image/jpg" ||file.files[0].type==="image/gif")
    		{
    		 if (file.files && file.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function (e) {
                      $('#idAdvisorLogo')
                          .attr('src', e.target.result)
                          .width(150)
                          .height(200);
                  };

                  reader.readAsDataURL(file.files[0]);
              }
    		}else
    			{    			
    			bootbox.alert('only jpeg , png , jpg , gif allowed');
    			 file.value = null;   
    			}

    	flag=true;
    }
    return flag;
}

function fire_ajax_submit() {

    if(flag)
    	{
    var form = $('#fileUploadForm')[0];
    
    var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var data = new FormData(form);
    
    data.append("id", loggedUser.id);

  //  $("#btnSubmit").prop("disabled", true);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url:  ClientServiceUrl+"logo/upload",
        data: data,
        //http://api.jquery.com/jQuery.ajax/
        //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function (xhr){ 
    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
        },
        success: function (data) {
        	bootbox.alert(data);
        	 $.ajax({
        		  url: ClientServiceUrl+"getadvisor/logo/"+loggedUser.id, 
      	          type: "GET",
      	          contentType: "image/png",
      	          dataType: "text",
      	          beforeSend: function (xhr){ 
      	        	  xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
      	          },
      	        success: function(data) { 
  	        		if(data!="") {
      	        	    $("#idBussinessHeaderAdvisorLogo").attr('src','data:image/png;base64,' + data);
              		}else {
              			$("#idBussinessHeaderAdvisorLogo").attr('src', '../Common/assets/images/finexa-logo.jpg');
              		}
      	        }
      	    });

        },
        error: function (jqXHR,e) {
        	console.log("jqXHR.status: " + jqXHR.status);
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
        	bootbox.alert(e.responseText);
            console.log("ERROR : ", e);
            $("#btnSubmit").prop("disabled", false);

        }
    });
    	}else
    		{
    		bootbox.alert('Please select a file !');	
    		}

}


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