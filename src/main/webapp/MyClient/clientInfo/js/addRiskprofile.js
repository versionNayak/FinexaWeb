
var Total;
var qlist=[];
var anslist=[];
var questionID;
var responseID=0;
var errAnswer=0;
var id=0;
var mode;

 //   $('.prev_btn').hide();
//	$('.nxtbtn').hide();
	
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}       
var loggedUserId;
selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
mode = sessionStorage.getItem("PAGE_MODE");
$(document).ready(function (event ) {
	
	if(loggedUser != null){
		 loggedUserId=loggedUser.advisorMasterId;
	}else{
		 loggedUserId=loggedClient.advisorMasterID;
	}
	

	
	$("#addRecord").addClass('btn_Disabled');
    $('#editRecord').addClass('btn_Disabled');
    $('#deleteRecord').addClass('btn_Disabled');

	 if(mode=="ADD"){
     getClientData("GET","", "getQuestionList/"+loggedUserId, onQuestionListSuccess);
	 }else{
		 if (mode=="EDIT"){
			 selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		      
			 serviceurl = "getQuestionAnswerForClient/"+ selectedClientId +"/"+loggedUserId;
			 getClientData("GET","",serviceurl,onQuestionListSuccess);
		 }
	 }
});


function onQuestionListSuccess(QuestionList) {
	    var total = 0;
	    var input3 = "";
	    var cur_num = 0;
	    var qbj = 0;
		total = QuestionList.length;
		// $('.questions').empty();
		 $('#questions').html("");
		
		
		if(total!=0){
		$.each(QuestionList,function(index, obj) {
			qlist.push(obj);
		});
		qbj=qlist[0];
		questionID=qbj.id;
			//inputs ='<li class="question"><p><strong>Question No : <span class="iterating_q1">'+qbj.questionCount+'</span> of <span class="total_q1">'+qlist.length+'</span></strong></p>'+
			//'<div class="col-sm-12"><label id="quesId>'+qlist.question+'</label><div class="answers"></li>';
			
		   inputs ='<li class="question active"><p><strong>Question No : <span class="iterating_q1">'+qbj.questionCount+'</span> of <span class="total_q1">'+qlist.length+'</span> </strong></p><div class="col-sm-12"><label>'+qbj.question+'</label><div class="answers"><ol>';
		
			var inputs1="";
			$.each(qbj.riskProfileResponseBasedScoresDTO,function(index, objresponse){
	//		//console.log("objresponse.responseText "+objresponse.responseText);	
		    if(mode=="ADD"){	
			inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270"/> <span>'+objresponse.responseText+'</span></li>');
		    }
		    if (mode=="EDIT"){
		    	id=qbj.clientRiskProfileResponsesDTO.id;
		    	if(qbj.clientRiskProfileResponsesDTO.responseID==objresponse.responseID){
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270" checked="checked"/> <span>'+objresponse.responseText+'</span></li>');
					//$('input:radio[name="option"][value="' + objresponse.responseID +'"]').prop('checked', true);
					}else{					
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270"/> <span>'+objresponse.responseText+'</span></li>');	
					}
		    }
		    });
			inputs2='</ol></div></div></li>';
		    input3=inputs+inputs1+inputs2;
		    $('#questions').html(input3);
		    cur_num = parseInt($('.iterating_q1').text());
		    Total=parseInt($('.total_q1').text());
	    if(cur_num < total)
	    {
	    	$('.nxtbtn').show();
	    	$('.finbtn').hide();
	    	$('.prev_btn').hide();
	    }
	    if(cur_num == total){
	    	$('.prev_btn').hide();
	     	//$('.finbtn').show();
	     	$('.nxtbtn').hide();
	     	
	     	 finButtonHide();
	      }
	   
		}
     }


//$('#finish').hide();
   
	$('#next').click(function(){
		 var total = 0;
		 var cur_num = 0;
		 var errAnswer;
		 var obj;
		 var questionAnswerList;
		 var new_num;
		 var selectedObj;
		 var c;
		 
		 total = parseInt($('.total_q1').text());
		 cur_num = parseInt($('.iterating_q1').text());
		errAnswer = validateClientriskProfile();
		if(errAnswer==0){
		$('.prev_btn').show();
		obj={"id":id,"responseID":responseID,"clientId":selectedClientId,"questionId":questionID,"advisorId":loggedUserId,"questionCount":cur_num};
		 if(anslist.length>=cur_num){
		for(var i=0;i<anslist.length;i++){
			if(anslist[i].questionCount==cur_num){
				anslist[i]=obj;
				break;
			}
		}
		 }else{
			 if(obj.responseID!=0){
			 anslist.push(obj);
			 }
		 }
		 questionAnswerList = JSON.stringify(anslist);
	     new_num =  cur_num + 1;
	      $('.iterating_q1').text(new_num);
	 	
	      if(qlist.length>=new_num){
		      $.each(qlist,function(index, obj) {
		    	   c=obj.questionCount;
		    	   if(c==new_num){
		    	   questionID=obj.id;
		    	   responseID=0;
		    	   inputs ='<li class="question active"><p><strong>Question No : <span class="iterating_q1">'+obj.questionCount+'</span> of <span class="total_q1">'+qlist.length+'</span> </strong></p><div class="col-sm-12"><label>'+obj.question+'</label><div class="answers"><ol>';
		    	   if(mode=="ADD"){
		   		   selectedObj=null;
		    	   }
		    	   if (mode=="EDIT"){
		    		id=obj.clientRiskProfileResponsesDTO.id;
		    		selectedObj=obj.clientRiskProfileResponsesDTO;   
		    	   }
		   		   $.each(anslist,function(index, objR){
					if(objR.questionCount==new_num){
						selectedObj=objR;
				  	}
				  });
		   		
		   		
		   		    var inputs1="";
					$.each(obj.riskProfileResponseBasedScoresDTO,function(index, objresponse){
					
					
					if(selectedObj!=null){
					if(objresponse.responseID==selectedObj.responseID){
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270" checked="checked"/> <span>'+objresponse.responseText+'</span></li>');
					//$('input:radio[name="option"][value="' + objresponse.responseID +'"]').prop('checked', true);
					}else{					
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270"/> <span>'+objresponse.responseText+'</span></li>');	
					}
					}else{
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270"/> <span>'+objresponse.responseText+'</span></li>');	
					}
					
					
					});
				inputs2='</ol></div></div></li>';
			    input3=inputs+inputs1+inputs2;
			    $('#questions').html(input3);
	    	   }
	       });
	      }
	      if(new_num < total)
		    {
		    	$('.nxtbtn').show();
		    	$('.finbtn').hide();
		   
		    }
		    if(new_num == total){
		        $('.nxtbtn').hide();
		     	//$('.finbtn').show();
		     	
		        finButtonHide();
		     	
		    }
		    if(new_num == 1){
			 	   $('.prevbtn').hide();
			 }
	}      
	});
	  	$('#previous').click(function(){
	  		 var total;
	  		 var cur_num;
	  		 var obj;
	  		 var questionAnswerList;
	  		 var new_num;
	  		 var c;
	  		 var selectedObj;
	  		
			 total = parseInt($('.total_q1').text());
			 cur_num = parseInt($('.iterating_q1').text());
			 if($('input:radio[name=option]').is(':checked')){	    
		 	 responseID = $('input:radio[name=option]:checked').val();
		 	 }
			 console.log("previous id "+id);
			 obj={"id":id,"responseID":responseID,"clientId":selectedClientId,"questionId":questionID,"advisorId":loggedUserId,"questionCount":cur_num};
			 if(anslist.length>=cur_num){
			 for(var i=0;i<anslist.length;i++){
				if(anslist[i].questionCount==cur_num){
					anslist[i]=obj;
					break;
				}
			}
			 }else{
			
				 if(obj.responseID!=0){
					
				 anslist.push(obj);
				 }
			 }
			  questionAnswerList = JSON.stringify(anslist);
		      new_num =  cur_num - 1;
		      $('.iterating_q1').text(new_num);
		 	
		      if(qlist.length>=new_num){
		      $.each(qlist,function(index, obj) {
		    	   c=obj.questionCount;
		    	   if(c==new_num){
		    	   questionID=obj.id;
		    	   responseID=0;
		    	   inputs ='<li class="question active"><p><strong>Question No : <span class="iterating_q1">'+obj.questionCount+'</span> of <span class="total_q1">'+qlist.length+'</span> </strong></p><div class="col-sm-12"><label>'+obj.question+'</label><div class="answers"><ol>';
		    	   if(mode=="ADD"){
			   		 selectedObj=null;
			    	}
			       if (mode=="EDIT"){
			    	 id=obj.clientRiskProfileResponsesDTO.id;
			    	 selectedObj=obj.clientRiskProfileResponsesDTO; 
			    	}
		   		   $.each(anslist,function(index, objR){
					if(objR.questionCount==new_num){
						selectedObj=objR;
				  	}
				  });
		   		
		   		
		   		    var inputs1="";
					$.each(obj.riskProfileResponseBasedScoresDTO,function(index, objresponse){
					
					
					if(selectedObj!=null){
					if(objresponse.responseID==selectedObj.responseID){
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270" checked="checked"/> <span>'+objresponse.responseText+'</span></li>');
					}else{					
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270"/> <span>'+objresponse.responseText+'</span></li>');	
					}
					}else{
					inputs1+=('<li><input type="radio" name="option" class="input_risk_profile" value='+objresponse.responseID+' tabindex="270"/> <span>'+objresponse.responseText+'</span></li>');	
					}
					});
					inputs2='</ol></div></div></li>';
				    input3=inputs+inputs1+inputs2;
				   $('#questions').html(input3);
		    	   }
		       });
		      }
		       

	    if(new_num < total)
	    {
	    	$('.nxtbtn').show();
	    	$('.finbtn').hide();
	   
	    }
	    if(new_num == total){
	        $('.nxtbtn').hide();
	     	//$('.finbtn').show();
	     	
	        finButtonHide();
	     	
	    }
	    if(new_num == 1){
	 	   $('.prev_btn').hide();
	    }
	    
	    obj=null;
    
    });
	  
	  function validateClientriskProfile(){
		     var errAnswer=0;
			 if($('input:radio[name=option]').is(':checked')){    
		 	 responseID = $('input:radio[name=option]:checked').val();
		 	 }else{
			 		//bootbox.alert("please select at least one response!");
			 modalMessage("please select at least one response!");
			 errAnswer=1;
			 }
			 return errAnswer;
	  }

	   $("#finish").on("click", function (event) {
		    var cur_num = 0;
		    var errAnswer = 0;
		    var obj;
		    var questionAnswerList;
		    
		    cur_num = parseInt($('.iterating_q1').text());
		    errAnswer = validateClientriskProfile();
			if(errAnswer==0){
			 $('.prev_btn').hide();
			 event.preventDefault();
			 showLoaderOnSave("#finish");
			 window.setTimeout(function(){
			 obj={"id":id,"responseID":responseID,"clientId":selectedClientId,"questionId":questionID,"advisorId":loggedUserId,"questionCount":cur_num};
			 if(anslist.length>=cur_num){
			 for(var i=0;i<anslist.length;i++){
				if(anslist[i].questionCount==cur_num){
					anslist[i]=obj;
					break;
				}
			}
			 }else{
				 anslist.push(obj);
			 }
			 questionAnswerList = JSON.stringify(anslist); 
		     console.log("questionAnswerList "+questionAnswerList);	 
		     saveData("POST", questionAnswerList,"save",onAddQuestionAnswerSuccess);
		     }, 5000);
	        
	      }else{
	    	  $('#finish').attr("disabled", false);
	    	  $('#finish').prop("disabled", false);
	     }	
		});


	   function onAddQuestionAnswerSuccess(QuestionList) {
		   hideLoaderOnSave("#finish");
		   if(loggedUser != null){
	    	   loggedUserId=loggedUser.advisorMasterId;
	    	   serviceurl = "getRiskProfile/"+ selectedClientId +"/"+loggedUserId;
	       }else{
	    	   loggedUserId=loggedClient.advisorMasterID;
	    	   serviceurl = "getRiskProfile/"+ selectedClientId +"/"+loggedUserId;
	       }
		    
		    getClientData("GET","",serviceurl, onRiskProfileNameSuccess);
		    
  function onRiskProfileNameSuccess(data) {
		    
	        sessionStorage.setItem("RiskProFile_LIST", JSON.stringify(data));
	        $("#idClient").empty();
	        $("#idClient").load("clientInfo/viewRiskProfile.html");
	       
			
			$(".dashboardheading    ").html("");
			$(".dashboardheading    ").html("Risk Profile");
			$("#addRecord").addClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');
			}
		    
		  
	   }
	function finButtonHide(){
   	//new code for access rights
   	if(loggedClient != null && loggedClient.role === "Client"){
   			if(loggedClient.clientInfoAddEdit === "Y"){
   				$('.finbtn').show();
   			}else if(loggedClient.clientInfoView === "Y"){
   				$('.finbtn').hide();
   			}
   	}else{ 
   		if(loggedUser != null && loggedUser.role === "Admin"){
   			$('.finbtn').hide();
   		}else{
   			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){	    				
   				$('.finbtn').show();
   			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
   				$('.finbtn').hide();
   			}
   		}
   	  }
	}
    	//End access righ




