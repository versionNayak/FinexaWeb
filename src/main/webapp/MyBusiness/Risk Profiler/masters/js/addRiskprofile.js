/*
$('.risk_profile_count').change(function(){
	//alert ('change');
	$('.risk_profile_t').show();
	//$("#SAVE").show();
//	$(".show_questions1").show();
	var table = $('.r_table');
	var risk_profile_count = $(this).val();
	var rows = '';
		for (i = 1; i <= risk_profile_count; i++) { 
    	rows += ("<tr><td><span class='r_num'>" + i + "</span></td> <td><input type='text' class='form-control input-width-medium' placeholder='Enter risk profile name'></td> </tr>");
	};

	table.html(rows);		

});	

$('.question_count').change(function(){
var question_count = $(this).val();
$('.total_q').text(question_count);
var inputs = "";
	for (i = 1; i <= question_count; i++) { 
    	inputs += ('<li class="q_li clearfix"><div class="rp_question"><input type="text" class="form-control" placeholder="Enter Question"name=""></div> <div class="ans ans1"><input type="text" class="form-control rp_answer" placeholder=" Enter Response1" name=""><input type="text" class="form-control score" placeholder="Enter Score" name=""></div><div class="ans ans2"><input type="text" class="form-control rp_answer" placeholder="Enter Response2" name=""><input type="text" class="form-control score" placeholder="Enter Score" name=""></div><div class="ans ans3"><input type="text" class="form-control rp_answer" placeholder="Enter Response3" name=""><input type="text" class="form-control score" placeholder="Enter Score" name=""></div><div class="ans an4"><input type="text" class="form-control rp_answer" placeholder="Enter Response4" name=""><input type="text" class="form-control score" placeholder="Enter Score" name=""></div><div class="ans ans5"><input type="text" class="form-control rp_answer" placeholder="Enter Response5" name=""><input type="text" class="form-control score" placeholder="Enter Score" name=""></div></li>');
	};
	$(".show_questions1").hide();
    $('.question_list').html(inputs);
});

$('.show_questions1').on('click', function(){
		alert("jjjjjjj");
});
$('.show_questions').on('click', function(){
	//$('.question_add').show();
	// if(!validate()) return false;
	
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	
	loggedUserId=loggedUser.id;

     var riskprofileNames = [];
     $('input[type=text]').each(function(i, item) {
         var obj =  {
        	name:$(item).val(),
        	advisorID   :loggedUserId
         }
         values.push(grade);
         
            jsondata = JSON.stringify($('#loginForm').serializeToJSON());
			console.log(jsondata);
			alert(jsondata);
			getClientData("POST", jsondata, "createRiskprofileNames", onSuccess);
     });
     });

function onSuccess(data) {
	alert("success");
	
		$(".dashboardheading").html("Add Risk Profile Questionnaire");
		$("#wrapper").css("height","auto");
		$(".add_risk_div").hide();
		$(".rp_questions_list").show();
		$('.question_list li:first-child').addClass('cur_ques');
		$('.question_list li:first-child').show();
		$(this).hide();
		
}



$('.nxtbtn').click(function(){
	$('.prevbtn').show();
	var $current = $('.question_list li.cur_ques');
	$('.q_li').removeClass('cur_ques');
	$current.next().addClass('cur_ques');
	var total = $('.q_li').length-1;
    var currentindex = $current.index()+1;
    //alert (currentindex);
    
    if(currentindex >= total)

    {
    	$('.nxtbtn').hide();
     	$('.finbtn').show();
     	$('.svebtn').show();
      }

    else
    {
    	$('.nxtbtn').show();
    	$('.finbtn').hide();
    	$('.svebtn').hide();
    }

    	var cur_num = parseInt($('.iterating_q').text());
        var new_num =  cur_num + 1;
         $('.iterating_q').text(new_num);
 	
});

$(".show_questions").hide();

$('.prevbtn').click(function(){
	//alert ('prev');
    var $current = $('.question_list li.cur_ques');
    $('.q_li').removeClass('cur_ques');
    $current.prev().addClass('cur_ques');
    var cur_num = parseInt($('.iterating_q').text());
    var new_num =  cur_num - 1;
    $('.iterating_q').text(new_num);

    var total = $('.q_li').length-1;
    var currentindex = $current.index()-1;
    //alert (currentindex);
    
    if(currentindex <= total)

    {
    	$('.nxtbtn').show();
     	$('.finbtn').hide();
     	$('.svebtn').hide();
      }

    else
    {
    	$('.nxtbtn').hide();
    	$('.finbtn').show();
    	$('.svebtn').show();
    }

    if(currentindex == 0)
    {
    	$('.prevbtn').hide();
    }
});

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


	
	var ppfext = document.getElementById("idPPFExtension");
ppfext.onchange = function(event){
    if(ppfext.value=="Yes"){
        $(".pptselection").show();
    }
	else{
		
		$(".pptselection").hide();
	}
}

*/