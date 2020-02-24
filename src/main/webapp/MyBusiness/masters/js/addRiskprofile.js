
var qlist=[];
var questionID=0;
var responseScoreID=0;

var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
loggedUserId=loggedUser.advisorMasterId;
console.log("loggedUserId "+loggedUserId);

var mode = sessionStorage.getItem("PAGE_MODE");
//alert("mode "+mode);
if (mode=="ADD"){
	
}

if (mode=="EDIT"){
  //  $('#IdAddRiskDiv').hide();
  //  $(".rp_questions_list").show();
    
    getClientData("GET","", "getQuestionList/"+loggedUserId, onQuestionListEditSuccess);
  }


ClientServiceUrl = serviceIP + "/clientservice/";
$('.risk_profile_count').change(function(){
	$('.risk_profile_t').show();
	$(".show_questions").show();
	var table = $('.r_table');
	var risk_profile_count = $(this).val();
	var rows = '';
		for (i = 1; i <= risk_profile_count; i++) { 
    	rows += ("<tr><td><span class='r_num'>" + i + "</span></td> <td><input type='text' class='form-control input-width-medium' name='text[]' placeholder='Enter risk profile name'></td> </tr>");
	};

	table.html(rows);		

});	
var total1;
$('.question_count').change(function(){
	var question_count = $(this).val();
	total1=question_count;
	$('.total_q').text(question_count);
	var inputs = "";
		for (i = 1; i <= question_count; i++) { 
			inputs +=('<li class="q_li clearfix"><input type="hidden" id="idQuestion">'+
     				'<div class="rp_question"><input type="hidden" id="idQuestion">'+
     				'<input type="text" class="form-control" placeholder="Enter Question" id="question" name="question">'+
     				'</div>'+
     				'<div class="ans ans1"><input type="hidden" id="idResponseBasedScore1">'+
     				'<input type="text" class="form-control rp_answer" placeholder=" Enter Response1" id="response1" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score1" name="score">'+
     				'</div>'+
     				'<div class="ans ans2"><input type="hidden" id="idResponseBasedScore2">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response2" id="response2" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score2" name="score">'+
     				'</div>'+
     				'<div class="ans ans3"><input type="hidden" id="idResponseBasedScore3">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response3" id="response3" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score3" name="score">'+
     				'</div>'+
     				'<div class="ans an4"><input type="hidden" id="idResponseBasedScore4">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response4" id="response4" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score4" name="score">'+
     				'</div>'+
     				'<div class="ans ans5"><input type="hidden" id="idResponseBasedScore5">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response5" id="response5" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score5" name="score">'+
     				'</div></li>'); 
		}
		
	    $('.question_list').html(inputs);
	});

$('.show_questions').on('click', function(){
	var err=0;
	var idQuestionCountVal = $("#idQuestionCount").val();
	if(idQuestionCountVal==0){
		$("#idQuestionCount").css("border","solid 1px red");
     	err=1;
    }else{
    	$("#idQuestionCount").css("border","1px solid #ccc");
     	err=0;
    }
	var idRiskProfileCountVal = $("#idRiskProfileCount").val();
	if(idRiskProfileCountVal==0){
		$("#idRiskProfileCount").css("border","solid 1px red");
     	err=1;
    }else{
    	$("#idRiskProfileCount").css("border","1px solid #ccc");
     	err=0;
    }
	var itemVal=[];
	$('input[name="text[]"]').each(function(i, item) {
       
     	if(($(item).val()) == ''){
     	$(item).css("border","solid 1px red");	
     	itemVal[i]=1;
        }else{
    	 $(item).css("border","1px solid #ccc");	
    	 itemVal[i]=0;
        }
      
       });
	var found = itemVal.includes(1);
	var f = jQuery.inArray(1, itemVal);
	
	/*$.each( itemVal, function( key, value ) {
		//alert(key +" "+value);
		  if(value == 1){
			  err=1;
		  }
		});*/
	if(err==0 && found == false && f==-1){
	// $('.question_add').show();   
       //   var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));	       
	   //   loggedUserId=loggedUser.advisorMasterId;
	      $(".show_questions").hide();
          var riskprofileNames = [];
          $('input[name="text[]"]').each(function(i, item) {
           var obj =  {
        	name:$(item).val(),
        	advisorID   :loggedUserId
         }
           riskprofileNames.push(obj);
          });
       
            jsondata = JSON.stringify(riskprofileNames);
			getClientData("POST", jsondata, "createRiskprofileName", onSuccess);
     }
});

function onSuccess(data) {

		$(".dashboardheading").html("Add Risk Profile Questionnaire");
		$("#wrapper").css("height","auto");
		$(".add_risk_div").hide();
		$(".rp_questions_list").show();
		$('.question_list li:first-child').addClass('cur_ques');
		$('.question_list li:first-child').show();

		var total = total1;

		  var cur_num = parseInt($('.iterating_q').text());
	      $('.iterating_q').text(cur_num);
	      if(cur_num > total)
	      {
	    	$('.nxtbtn').hide();
	     	$('.finbtn').show();
	     	$('.svebtn').show();
	      }

	    if(cur_num < total)
	    {
	    	$('.nxtbtn').show();
	    	$('.finbtn').hide();
	    	$('.svebtn').hide();
	    }
	    if(cur_num == total){
	    	$('.nxtbtn').hide();
	     	$('.finbtn').show();
	     	$('.svebtn').hide();
	     	
	    }		
}

        function onQuestionListEditSuccess(QuestionList) {
     
            total1 = QuestionList.length;
            $('.total_q').text(total1);
    
     		$.each(QuestionList,function(index, obj) {
     			qlist.push(obj);
     		});
     	
    		
     		var inputs = ('<li class="q_li clearfix"><input type="hidden" id="idQuestion">'+
     				'<div class="rp_question"><input type="hidden" id="idQuestion">'+
     				'<input type="text" class="form-control" placeholder="Enter Question" id="question" name="question">'+
     				'</div>'+
     				'<div class="ans ans1"><input type="hidden" id="idResponseBasedScore1">'+
     				'<input type="text" class="form-control rp_answer" placeholder=" Enter Response1" id="response1" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score1" name="score">'+
     				'</div>'+
     				'<div class="ans ans2"><input type="hidden" id="idResponseBasedScore2">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response2" id="response2" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score2" name="score">'+
     				'</div>'+
     				'<div class="ans ans3"><input type="hidden" id="idResponseBasedScore3">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response3" id="response3" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score3" name="score">'+
     				'</div>'+
     				'<div class="ans an4"><input type="hidden" id="idResponseBasedScore4">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response4" id="response4" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score4" name="score">'+
     				'</div>'+
     				'<div class="ans ans5"><input type="hidden" id="idResponseBasedScore5">'+
     				'<input type="text" class="form-control rp_answer" placeholder="Enter Response5" id="response5" name="responseText">'+
     				'<input type="text" class="form-control score" placeholder="Enter Score" id="score5" name="score">'+
     				'</div></li>');

       	    $('.question_list').html(inputs);
       	    
         	 $(".dashboardheading").html("Edit Risk Profile Questionnaire");
      		$("#wrapper").css("height","auto");
      		$(".add_risk_div").hide();
      		$(".rp_questions_list").show();
      		$('.question_list li:first-child').addClass('cur_ques');
      		$('.question_list li:first-child').show();
       		
       		var qbj=qlist[0];
    		questionID=qbj.id;
    		responseScoreID=qbj.riskProfileResponseBasedScoresDTO.id;
    		$('#idQuestion').val(qbj.id);
    		$('#question').val(qbj.question);
    		var j=1;
    		$.each(qbj.riskProfileResponseBasedScoresDTO,function(index, objresponse){
    			$('#idResponseBasedScore'+j).val(objresponse.id);
    			$('#response'+j).val(objresponse.responseText);
    			$('#score'+j).val(objresponse.score);
    			j++;
    		});
    	   
       		
       	    
        		
       	    
     
 		
 		
   	  var cur_num = parseInt($('.iterating_q').text());

		  var cur_num = parseInt($('.iterating_q').text());
	    //  $('.iterating_q').text(cur_num);
	        
	     
	      if(cur_num > total1)
	      {
	    	$('.nxtbtn').hide();
	     	$('.finbtn').show();
	     	$('.svebtn').show();
	     	$('.prevbtn').hide();
	      }

	    if(cur_num < total1)
	    {
	    	$('.nxtbtn').show();
	    	$('.finbtn').hide();
	    	$('.svebtn').hide();
	    	$('.prevbtn').hide();
	    }
	    if(cur_num == total1){
	    	$('.nxtbtn').hide();
	     	$('.finbtn').show();
	     	$('.svebtn').hide();
	     	$('.prevbtn').hide();
	     	
	    }		

   }







var JSONObject =[]; 

$('#nxtbtn').click(function(event){
	
	// if(!event.detail || event.detail == 1){
	 errAnswer = validateMasterRiskProfile();
	 if(errAnswer==0){
		event.preventDefault();
		$('.prevbtn').show();
		var total = total1;
		var cur_num = parseInt($('.iterating_q').text());
	    var obj={       
			    "id":$('#idQuestion').val(),      
		        "question": $("#question").val(),
		        "advisorId": loggedUserId,
		        "riskProfileResponseBasedScoresDTO": [
		            {   "id":$("#idResponseBasedScore1").val(),
		                "responseID": 1,
		                "responseText": $("#response1").val(),
		                "score": $("#score1").val()
		            },
		            {    "id":$("#idResponseBasedScore2").val(),
		            	 "responseID": 2,
		                 "responseText": $("#response2").val(),
		                 "score": $("#score2").val()
		            },
		            {   "id":$("#idResponseBasedScore3").val(),
		           	    "responseID":3,
		                "responseText": $("#response3").val(),
		                "score": $("#score3").val()
		           },
		            {   "id":$("#idResponseBasedScore4").val(),
		           	    "responseID": 4,
		                "responseText": $("#response4").val(),
		                "score": $("#score4").val()
		           },
		            {   "id":$("#idResponseBasedScore5").val(),
		           	    "responseID": 5,
		                "responseText": $("#response5").val(),
		                "score": $("#score5").val()
		           }
		        ],
		        
		        "totalNumberQuestion": total,
		        "questionCount": cur_num
		    }
	 if(JSONObject.length>=cur_num){
	for(var i=0;i<JSONObject.length;i++){
		if(JSONObject[i].questionCount==cur_num){
			JSONObject[i]=obj;
			break;
		}
	}
	 }else{
		 JSONObject.push(obj);
	 }
	 var questionList = JSON.stringify(JSONObject);
    var new_num =  cur_num + 1;

     $('.iterating_q').text(new_num);
    
     if(JSONObject.length>=new_num){
     $.each(JSONObject,function(index, obj) {
   	   var c=obj.questionCount;
   	   if(c==new_num){
   	       $('#idQuestion').val(obj.id);
   		   $("#question").val(obj.question);
   		if(mode=="ADD"){
   		for(var i=1;i<=5;i++){
       	 }
   		}
   		if(mode=="EDIT"){
   	   		for(var i=1;i<=5;i++){
   	       	    $('#response'+i).val("");
       		    $('#score'+i).val("");
       		    $('#idResponseBasedScore'+i).val("");
   	       	 }
   	   	}
   		var rbsd=obj.riskProfileResponseBasedScoresDTO
   		   $.each(rbsd,function(index1, lst) {
   		       $("#idResponseBasedScore"+(index1+1)).val(lst.id);
   			   $("#response"+(index1+1)).val(lst.responseText);
   			   $("#score"+(index1+1)).val(lst.score);
   		   });
   		
   	   }
   	   
      });
     }else{
    	  if(mode=="ADD"){
    	 $("#question").val("");
	     	
	     	$("#response1").val("");
	        $("#response2").val("");
	     	$("#response3").val("");
	     	$("#response4").val("");
	         $("#response5").val("");
	     	
	         $("#score1").val("");
	     	$("#score2").val("");
	        $("#score3").val("");
	        $("#score4").val("");
	     	$("#score5").val("");
    	  }
    	  if(mode=="EDIT"){
    		  $.each(qlist,function(index, qbj) {
    			  var c=qbj.questionCount;
		    	   if(c==new_num){
		    		questionID=qbj.id;
		       		responseScoreID=qbj.riskProfileResponseBasedScoresDTO.id;
		       	    $('#idQuestion').val(qbj.id), 
		       		$('#question').val(qbj.question);
		       		var j=1;
		  
		       	 for(var i=1;i<=5;i++){
		       		$('#response'+i).val("");
		       		$('#score'+i).val("");
		       		$('#idResponseBasedScore'+i).val("");
		       		
		       	 }
		       		$.each(qbj.riskProfileResponseBasedScoresDTO,function(index, objresponse){
		       			$('#idResponseBasedScore'+j).val(objresponse.id);
		       			$('#response'+j).val(objresponse.responseText);
		       			$('#score'+j).val(objresponse.score);
		       			j++;
		       		}); 
		    	   }
    		  });
    	  }
     }
      
	
    
     if(new_num > total)

     {
   	
   	    $('.nxtbtn').hide();
    	$('.finbtn').show();
    	$('.svebtn').hide();
     }

   if(new_num < total)
   {
   	$('.nxtbtn').show();
   	$('.finbtn').hide();
   //	$('.svebtn').hide();
   }
   if(new_num == total){
   	    $('.nxtbtn').hide();
    	$('.finbtn').show();
    	$('.svebtn').hide();
   }
	}
 //}
});


$('#prevbtn').click(function(){
	//if(!event.detail || event.detail == 1){
	var total = total1;
	 var cur_num = parseInt($('.iterating_q').text());
	 var obj={
	            
			"id":$('#idQuestion').val(),           
	        "question": $("#question").val(),
	        "advisorId": loggedUserId,
	        "riskProfileResponseBasedScoresDTO": [
	            {   "id":$("#idResponseBasedScore1").val(),
	                "responseID": 1,
	                "responseText": $("#response1").val(),
	                "score": $("#score1").val()
	            },
	            {    "id":$("#idResponseBasedScore2").val(),
	            	 "responseID": 2,
	                 "responseText": $("#response2").val(),
	                 "score": $("#score2").val()
	            },
	            {   "id":$("#idResponseBasedScore3").val(),
	           	    "responseID":3,
	                "responseText": $("#response3").val(),
	                "score": $("#score3").val()
	           },
	            {   "id":$("#idResponseBasedScore4").val(),
	           	    "responseID": 4,
	                "responseText": $("#response4").val(),
	                "score": $("#score4").val()
	           },
	            {   "id":$("#idResponseBasedScore5").val(),
	           	    "responseID": 5,
	                "responseText": $("#response5").val(),
	                "score": $("#score5").val()
	           }
	        ],
	        
	        "totalNumberQuestion": total,
	        "questionCount": cur_num
	    }
	 if(JSONObject.length>=cur_num){
	for(var i=0;i<JSONObject.length;i++){
		if(JSONObject[i].questionCount==cur_num){
			JSONObject[i]=obj;
			break;
		}
	}
	 }else{
		 if($("#question").val()!=""){
		 JSONObject.push(obj);
		 }
	 }
	 var questionList = JSON.stringify(JSONObject);
 
    var new_num =  cur_num - 1;
     $('.iterating_q').text(new_num);
	
     if(JSONObject.length>=new_num){
     $.each(JSONObject,function(index, obj) {
   	   var c=obj.questionCount;
   	   if(c==new_num){

   	       $('#idQuestion').val(obj.id), 
   		   $("#question").val(obj.question);
   	    if(mode=="EDIT"){    
   	    for(var i=1;i<=5;i++){
       		$('#response'+i).val("");
       		$('#score'+i).val("");
       		$('#idResponseBasedScore'+i).val("");
       		
       	 }
   	    }  
   		var rbsd=obj.riskProfileResponseBasedScoresDTO
   		   $.each(rbsd,function(index1, lst) {
   			   $("#idResponseBasedScore"+(index1+1)).val(lst.id);
   			   $("#response"+(index1+1)).val(lst.responseText);
   			   $("#score"+(index1+1)).val(lst.score);
   		   });
   		
   	   }
   	   
      });
     }
     if(new_num > total)
     {
   	    $('.nxtbtn').hide();
    	$('.finbtn').show();
    	$('.svebtn').hide();
     }

   if(new_num < total)
   {
   	$('.nxtbtn').show();
   	$('.finbtn').hide();
   //	$('.svebtn').hide();
   }
   if(new_num == total){
   	    $('.nxtbtn').hide();
    	$('.finbtn').show();
    	$('.svebtn').hide();
   }
   if(new_num == 1){
	   $('.prevbtn').hide();
   }
   console.log("prev obj "+JSON.stringify(JSONObject));
  //}
});

$('#finbtn').on("click", function (event) { 
	 //if(!event.detail || event.detail == 1){
	 var errAnswer = validateMasterRiskProfile();
	 if(errAnswer==0){
		 $('#prevbtn').hide();
		 event.preventDefault();
	     showLoaderOnSave("#finbtn");
	     window.setTimeout(function () {
		 var total = total1;
		 var cur_num = parseInt($('.iterating_q').text());
	         var obj={
			    "id":$('#idQuestion').val(),  
		        "question": $("#question").val(),
		        "advisorId": loggedUserId,
		        "riskProfileResponseBasedScoresDTO": [
		            {   "id":$("#idResponseBasedScore1").val(),
		                "responseID": 1,
		                "responseText": $("#response1").val(),
		                "score": $("#score1").val()
		            },
		            {    "id":$("#idResponseBasedScore2").val(),
		            	 "responseID": 2,
		                 "responseText": $("#response2").val(),
		                 "score": $("#score2").val()
		            },
		            {   "id":$("#idResponseBasedScore3").val(),
		           	    "responseID":3,
		                "responseText": $("#response3").val(),
		                "score": $("#score3").val()
		           },
		            {   "id":$("#idResponseBasedScore4").val(),
		           	    "responseID": 4,
		                "responseText": $("#response4").val(),
		                "score": $("#score4").val()
		           },
		            {   "id":$("#idResponseBasedScore5").val(),
		           	    "responseID": 5,
		                "responseText": $("#response5").val(),
		                "score": $("#score5").val()
		           }
		        ],
		        
		        "totalNumberQuestion": total,
		        "questionCount": cur_num
		    }
	       //if(JSONObject.length>=cur_num){
	        if(JSONObject.length == cur_num){
			for(var i=0;i<JSONObject.length;i++){
				if(JSONObject[i].questionCount==cur_num){
					JSONObject[i]=obj;
					break;
				}
			}
			 }else{
				 if(JSONObject.length < cur_num){
				 JSONObject.push(obj);
			}
			 }
			 var questionList = JSON.stringify(JSONObject);		 
		/*showLoaderOnSave("#finbtn");
		window.setTimeout(function(){*/
		saveData("POST", questionList,"saveQuestionList",onAddQuestionSuccess);

		}, 5000);
       
      }
	//}
	});

	function onAddQuestionSuccess(data) {
		
		console.log("success");
		hideLoaderOnSave("#finbtn");
		
		if(mode=="EDIT"){
			 bootbox.confirm({
				 title: "delete client RiskProfile",
			     message: "Does the changes require the client to re-answer the questionnaire?",
		    	callback: function (result) {
		    		 if (result === true) {
		    			 
		    			 getClientData("GET","","deleteByadvisorID/"+loggedUserId,successClientRiskProfileDelete);

		 				function successClientRiskProfileDelete(data){
		 					loadViewPage();
		 			  }		
		 			}
	 				else{
						
	 					 getClientData("GET","","getScoreforAllClient/"+loggedUserId,successgetScoreforAllClient);

			 				function successgetScoreforAllClient(data){
			 					loadViewPage();
			 			  }		
	 				}
		    	 
		    	}		 
			});
		}
		if(mode=="ADD"){
			loadViewPage();
		}
	  }
	
	function loadViewPage(){
		
		 //$("#dashbord").empty();
	     //$("#dashbord").load("masters/riskProfileMaster.html");
	     //$(".dashboardheading").html("View Risk Profile Master");

		$("#idBuinessMasters").empty();
        $("#idBuinessMasters").load("masters/riskProfileMaster.html");
        $(".dashboardheading").html("View Risk Profile Master");
        
       
       
        
        $("#addRecord").removeClass('btn_Disabled');
        $('#editRecord').addClass('btn_Disabled');
        $('#deleteRecord').addClass('btn_Disabled');
	}
	$(function () {
				"use strict";
				$("[data-toggle=\"tooltip\"]").tooltip();
				$("#idStartDate,#idMaturityDate,#idExtensionDate").datepicker({
					format: "dd/mm/yyyy",
					todayHighlight: true,
					todayBtn: true
				});
				$(".datepicker-icon").on("click", function () {
					$(this).closest(".input-group").find("input").trigger("focus");
				});
			});


	function validateMasterRiskProfile(){
		 var errAnswer=0;
		 var qVal = $("#question").val();
		 if(qVal!=''){
			 $("#question").css("border","1px solid #ccc");	
			 var rVal1 = $("#response1").val();
			 var rVal2 = $("#response2").val();
			 var rVal3 = $("#response3").val();
			 var rVal4 = $("#response4").val();
			 var rVal5 = $("#response5").val();
			 
		    if(rVal1!='' || rVal2!='' || rVal3!='' || rVal4!='' || rVal5!='')
		    {
		    	if(rVal1!=''){
		    		 var sVal1 = $("#score1").val();
		    		if(sVal1==''){
		    			//bootbox.alert("please enter score!");
		    			$("#score1").css("border","solid 1px red");
		    			errAnswer=1;
		    		}else{
		    			$("#score1").css("border","1px solid #ccc");
		    			errAnswer=0;
		    		}
		    	}
		    	if(rVal2!=''){
		    		 var sVal2 = $("#score2").val();
		    		if(sVal2==''){
		    			$("#score2").css("border","solid 1px red");
		    		    //bootbox.alert("please enter score!");
		    			errAnswer=1;
		    		}else{
		    			$("#score2").css("border","1px solid #ccc");
		    			errAnswer=0;
		    		}
		    	}
		    	if(rVal3!=''){
		    		 var sVal3 = $("#score3").val();
		    		if(sVal3==''){
		    			$("#score3").css("border","solid 1px red");
		    			//bootbox.alert("please enter score!");
		    			errAnswer=1;
		    		}else{
		    			$("#score3").css("border","1px solid #ccc");
		    			errAnswer=0;
		    		}
		    	}
		    	if(rVal4!=''){
		    		 var sVal4 = $("#score4").val();
		    		if(sVal4==''){
		    			$("#score4").css("border","solid 1px red");
		    			//bootbox.alert("please enter score!");
		    			errAnswer=1;
		    		}else{
		    			$("#score4").css("border","1px solid #ccc");
		    			errAnswer=0;
		    		}
		    	}
		    	if(rVal5!=''){
		    		 var sVal5 = $("#score5").val();
		    		if(sVal5==''){
		    			$("#score5").css("border","solid 1px red");
		    			//bootbox.alert("please enter score!");
		    			errAnswer=1;
		    		}else{
		    			$("#score5").css("border","1px solid #ccc");
		    			errAnswer=0;
		    		}
		    	}
		    }else{
		    bootbox.alert("please enter at least one option!");
		   	errAnswer=1;
		    }
		 }else{
		 		//bootbox.alert("please select at least one response!");
	     //bootbox.alert("please enter question!");
		 $("#question").css("border","solid 1px red");		 
		 errAnswer=1;
		 }
		 console.log("errAnswer "+errAnswer);
		 return errAnswer;
	}	


