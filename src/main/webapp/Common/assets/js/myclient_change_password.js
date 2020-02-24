var emailID;
var loggedUser = loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	if(loggedUser == null){
	emailID = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"))["emailID"];
	}else{
	emailID = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"))["emailID"];
	}
$(document).ready(function(){
    $('#adviserUserPassChange').show();
    $('#newAdviserUserPassChange').hide();
    if(loggedClient != null && loggedClient.role === "Client"){
    	 $('#email').val(emailID);
    }else{
    	 $('#email').val(emailID);
    }
   
});

$('#backToClientDashBoard').click(function () {
    $("#id_change_password").hide();
    $("#sidebar-wrapper").show();
    $("#businesswrapper").show();
    $("#wrapper").show();
    $("#idChangPassword").show();
    $("#idChangPassword").css("color", "#FFFFFF !important")
});
$('#pwd').on('input', function () {
    $('#message2').html('').css('color', '');
    $('#pwd').css('border', '');
});

$('#pwd').focus(function(){
    $('#pwd').prop("type", "password");
});
$('#btnChangePassword').click(function () {

    var password = $('#pwd').val();
    if (password === ''){
        $('#message2').html('Please Enter Yor Password').css('color', 'red');
        $('#pwd').css('border', '2px solid red');
    } else {
       
        if(loggedUser == null){
        	 getClientDataAsyncFalse("GET", "", "checkExistingClientPassword/" + emailID + "/" + password, onSuccess);
        }else{
        	 getClientDataAsyncFalse("GET", "", "checkExistingUserPassword/" + emailID + "/" + password, onSuccess);
        }
        function onSuccess(xxData) {
            if (xxData) {
                $('#adviserUserPassChange').hide();
                $('#newAdviserUserPassChange').show();
                $('#e-email').val(emailID);
                $('#new_pwd').on('input', function () {
                    $('#message').html('').css('color', '');
                    $('#new_pwd').css('border', '');
                });
                $('#re_pwd').on('input', function () {
                    $('#message').html('').css('color', '');
                    $('#re_pwd').css('border', '');
                });
                $('#btnAdviserChangePassword').click(function () {
                    var new_pass = $('#new_pwd').val();
                    var re_pass = $('#re_pwd').val();
                    if (new_pass === '') {
                        $('#message1').html('Please Enter New Password').css('color', 'red');
                        $('#new_pwd').css('border', '2px solid red');
                    } else if (re_pass === '') {
                        $('#message').html('Please Enter Re-Type Password').css('color', 'red');
                        $('#re_pwd').css('border', '2px solid red');
                    } else if (new_pass === re_pass && new_pass !== '' && re_pass !== '') {
                        var formData = $('#adviserUserPassChange').serializeToJSON();
                        formData["emailId"] = emailID;
                        formData["password"] = new_pass;
                        if(loggedUser == null){
                       	 url = ClientServiceUrl + "changePasswordClient";
                       }else{
                    	 url = ClientServiceUrl + "changeUserPassword";
                       }
                        $.ajax({
                            type: "POST",
                            url: url,
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            data: JSON.stringify(formData),
                            beforeSend: function (xhr){ 
            					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
                            },
                            success: function (data) {
                                if (data) {
                                	alert("Password changed successfully");
                                    logout();
                                }
                            }
                        });
                    } else if (new_pass !== re_pass) {
                        $('#message').html('Password did not Matched').css('color', 'red');
                        $('#re_pwd').css('border', '2px solid red');
                    }
                });

            } else {
                $('#message2').html('Please Enter Correct Password').css('color', 'red');
                $('#pwd').css('border', '2px solid red');
            }
        }
    }
});
