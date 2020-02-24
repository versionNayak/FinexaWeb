// *******regex for alphanumeric take only character with limit 100 ******//
$.validator.addMethod('regexcheckForCFA', function(value, element, param) {
      var stingLength = /^[A-Za-z\s]{1,100}$/;
     
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});
//regex for alphanumeric with limit 100
$.validator.addMethod('regexcheckForClientCode', function(value, element, param) {
    var stingLength = /^[A-Za-z0-9\s]{1,100}$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});
//*************** Form 1 validation  starts ****************************//
$("form[name='form1']").validate({
    
	 onkeyup: false,
	  onfocusout: false ,
    rules: {
     
    	clientAppli:{
              required: true,
    		  regexcheckForCFA: true
          },
          clientsecondAppli:
        	  { required: true,
    		  	regexcheckForCFA: true
    		  },
		clientCode:{
			required:true,
			regexcheckForClientCode:true
		},
		clientThirdAppli:{
            required: true,
  		  regexcheckForCFA: true
        },
        guardianName:{
            required: true,
  		  regexcheckForCFA: true
        },
        holding:{
            required: true,
  		 
        },
    	
    },
    
    messages: {    	
    		clientAppli:{
    			required:"Please Enter First Applicant Name",
    			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
    	     
    	      },
    	      clientsecondAppli:{
      			required:"Please Enter Second Applicant Name",
      			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
      	     
      	      },
    	      clientCode:{
    				required:"Please Enter Client code",
    				regexcheckForClientCode:"Client code must be alphanumeric and within 100 character"
    			},
    			
        	      clientThirdAppli:{
        			required:"Please Enter Third Applicant Name",
        			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
        	      },
        	      guardianName:{
          			required:"Please Enter Guardian name",
          			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
          	      },
          	    holding:{
                    required: "Please Enter Holding",
          		 
                },
    	    	
 
    },
    
    submitHandler: function(form) {
 
    			openCity($(form).find("#saveAndNext1"),'pan');
    	  
    	
    }
  });

//*************** Form 1 validation  ends ****************************//
//@Author  :> done by partha pratim saha







//*************** Form 2 validation  starts ****************************//

$.validator.addMethod('regexcheckForClientPan', function(value, element, param) {
    var stingLength = /^[A-Za-z0-9\s]{1,10}$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});

$("form[name='form2']").validate({
    
	 onkeyup: false,
	  onfocusout: false ,
   rules: {
	   firstAppliPan:{
		   
		   required: true,
		   regexcheckForClientPan: true
		   
	   },
	   secondApplicantPAN:{
		   
		   required: true,
		   regexcheckForClientPan: true
		   
	   },
	   thirdApplicantPAN:{
		   
		   required: true,
		   regexcheckForClientPan: true
		   
	   },
	   secondGuardianName:{
           required: true,
 		  regexcheckForCFA: true
       }
   },
	messages: { 
		
		 firstAppliPan:{
			 required:"Please Enter First Applicant PAN",
			 regexcheckForClientPan:"Please Enter valid PAN number"
			 
		 },
		 secondApplicantPAN:{
			 required:"Please Enter Second Applicant PAN",
			 regexcheckForClientPan:"Please Enter valid PAN number"
			 
		 },
		 thirdApplicantPAN:{
			 required:"Please Enter Second Applicant PAN",
			 regexcheckForClientPan:"Please Enter valid PAN number"
			 
		 },
		 secondGuardianName:{
   			required:"Please Enter Guardian name",
   			regexcheckForCFA: "Name cannot contain digit or special character"
   	      }
	},
   submitHandler: function(form) {
	   
		openCity($(form).find("#saveAndNext2"),'bank');

		
   }



});
