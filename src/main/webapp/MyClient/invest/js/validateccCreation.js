
// *******regex for alphanumeric take only character with limit 100 ******//
$.validator.addMethod('regexcheckForCFA', function(value, element, param) {
	var stingLength = /^[A-Za-z\s]+$/;
	// var stingLength = /^[A-Za-z\s]{0,10}$/;
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
        	  { //required: true,
    		  	regexcheckForCFA: true
    		  },
		clientCode:{
			required:true,
			regexcheckForClientCode:true
		},
		clientThirdAppli:{
           //required: true,
  		  regexcheckForCFA: true
        },
        guardianName:{
           //required: true,
  		  regexcheckForCFA: true
        },
        holding:{
            required: true,
            
  		 
        },
        dateOfBirth:{
        	required:true,
        	/*yearRange: "-100:+0",
        	changeMonth: true,
        	changeYear: true,
        	dateFormat : "d-M-yy",*/
        },
        gender:{
        	required:true,
        },
        occupation:{
        	required:true,
        },
        taxStatus:{
        	required:true,
        }
       
    	
    },
    
    messages: {    	
    		clientAppli:{
    			required:"Please Enter First Applicant Name",
    			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
    	     
    	      },
    	      clientsecondAppli:{
      			//required:"Please Enter Second Applicant Name",
      			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
      	     
      	      },
    	      clientCode:{
    				required:"Please Enter Client code",
    				regexcheckForClientCode:"Client code must be alphanumeric and within 100 character"
    			},
    			
        	      clientThirdAppli:{
        			//required:"Please Enter Third Applicant Name",
        			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
        	      },
        	      guardianName:{
          			//required:"Please Enter Guardian name",
          			regexcheckForCFA: "Name cannot contain digit or special character and within 100 character"
          	      },
          	    holding:{
                    required: "Please Enter Holding",
          		 
                },
                occupation:{
                	required:"Please Enter Occupation"
                },
                dateOfBirth:{
                	required:"Please Enter DOB",
                	//dateFormat:"Please Enter valid DOB format"
                },
                gender:{
                	required:"Please Enter Gender",
                },
                taxStatus:{
                	required:"Please Enter TaxStatus"
                },
    },
    
    submitHandler: function(form) {
    	var totalElement = form.elements;
    //	alert(totalElement[totalElement]);
    			//alert($(form).find("#saveAndNext1"));
    			//openCity(event.target,'pan');
    	
    			openCity($(form).find("#saveAndNext1"),'pan');
    	
    }
  });

//*************** Form 1 validation  ends ****************************//








//*************** Form 2 validation  starts ****************************//

$.validator.addMethod('regexcheckForClientPan', function(value, element, param) {
    var stingLength = /^[A-Za-z0-9\s]{0,10}$/;
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
		   
		   //required: true,
		   regexcheckForClientPan: true
		   
	   },
	   thirdApplicantPAN:{
		   
		  // required: true,
		   regexcheckForClientPan: true
		   
	   },
	   secondGuardianName:{
          // required: true,
 		  regexcheckForCFA: true
       }
   },
	messages: { 
		
		 firstAppliPan:{
			 required:"Please Enter First Applicant PAN",
			 regexcheckForClientPan:"Please Enter valid PAN number"
			 
		 },
		 secondApplicantPAN:{
			// required:"Please Enter Second Applicant PAN",
			 regexcheckForClientPan:"Please Enter valid PAN number"
			 
		 },
		 thirdApplicantPAN:{
			// required:"Please Enter Second Applicant PAN",
			 regexcheckForClientPan:"Please Enter valid PAN number"
			 
		 },
		 secondGuardianName:{
   			//required:"Please Enter Guardian name",
   			regexcheckForCFA: "Name cannot contain digit or special character"
   	      }
	},
   submitHandler: function(form) {
	   
	   openCity($(form).find("#previous2"),'cd');
		openCity($(form).find("#saveAndNext2"),'bank');

		
   }



});

//*************** Form 2 validation  End ****************************//


//*************** Form 3 validation  start ****************************//


$.validator.addMethod('regexcheckForAccNo', function(value, element, param) {
    var stingLength = /^[0-9\s]{1,100}$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});

$("form[name='form3']").validate({
    
	 onkeyup: false,
	  onfocusout: false ,
  rules: {
	  
	  acountType:{
		  required:true,
		  
	  },
	  bankAccountNumber:{
		  required:true,
		  regexcheckForAccNo:true
	  },
	  bankName:{
		  required:true,
		  regexcheckForCFA:true
	  },
	  iFSCcode:{
		  required:true,
		  regexcheckForClientCode:true
	  },
	  mICRcode:{
		  regexcheckForAccNo:true
	  },
	  wetherDefaultBankAccount:{
		  required:true,
	  }
  },
  messages: { 
	  
	  acountType:{
		  required:"Please Enter Acount Type"
	  },
	  bankAccountNumber:{
		  required:"Please Enter Bank Account Number",
		  regexcheckForAccNo:"Please Enter Valid Account Number"  
	  },
	  bankName:{
		 required:"Please Enter Bank Name",
		 regexcheckForCFA:"Please Enter Valid Bank Name"
	  },
	  iFSCcode:{
		  required:"Please Enter IFSC Code",
		  regexcheckForClientCode:"Please Enter Valid IFSC Code"
	  },
	  mICRcode:{
		  regexcheckForAccNo:"Please Enter Valid MICR Code"
	  },
	  wetherDefaultBankAccount:{
		  required:"Please Enter Default Bank Account"
	  }
	  
  },
  
  
  submitHandler: function(form) {
	   
	   openCity($(form).find("#previous3"),'pan');
		openCity($(form).find("#saveAndNext3"),'contact');

		
  }


	


});
 

//*************** Form 3 validation  End ****************************//





//*************** Form 4 validation  start ****************************//

$.validator.addMethod('regexcheckForAddress', function(value, element, param) {
	
	var stingLength = /^[A-Za-z0-9\s]+$/;
	//var stingLength = /^[A-Za-z\s]{0,50}$/;
   
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});
$.validator.addMethod('regexcheckForPinCode', function(value, element, param) {
    var stingLength = /^[0-9\s]{1,6}$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});
$.validator.addMethod('regexcheckForMobile', function(value, element, param) {
    var stingLength = /^[0-9\s]{1,10}$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});
$.validator.addMethod('regexcheckForEmailId', function(value, element, param) {
    var stingLength = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});

$("form[name='form4']").validate({
    
	 onkeyup: false,
	  onfocusout: false ,
 rules: {
	 
	 address:{
		 required:true,
		 regexcheckForAddress:true,
	 },
	 city:{
		 required:true,
		 regexcheckForAddress:true
	 },
	 state:{
		 required:true,
		 regexcheckForAddress:true,
	 },
	 
	 country:{
		 required:true,
		 regexcheckForAddress:true
	 },
	 pincode:{
		 required:true,
		 regexcheckForPinCode:true
	 },
	 mobile:{
		 required:true,
		 regexcheckForMobile:true
	 },
	 emailId:{
		 required:true,
		 regexcheckForEmailId:true,
	 }
 },
 
 messages:{
	 
	 address:{
		 	required:"Please Enter Address",
		 	regexcheckForAddress:"Please Enter valid Address"
		 
	 },
	 city:{
		 required:"Please Enter City",
		 regexcheckForAddress:"Please Enter valid city name"
	 },
	 state:{
		 required:"Please Enter State",
		 regexcheckForAddress:"Please Enter valid state name"
	 },
	 country:{
		 required:"Please Enter Country",
		 regexcheckForAddress:"Please Enter valid Country name"
	 },
	 pincode:{
		 required:"Please Enter Pincode",
		 regexcheckForPinCode:"Please Enter valid Pincode"
	 },
	 mobile:{
		 required:"Please Enter Mobile number",
		 regexcheckForMobile:"Please Enter valid Mobile number"
	 },
	 emailId:{
		 required:"Please Enter EmailId",
		 regexcheckForEmailId:"Please Enter valid EmailId"
	 },
 },
 
 
 submitHandler: function(form) {
	   
	   openCity($(form).find("#previous4"),'bank');
		openCity($(form).find("#saveAndNext4"),'ckycdetails');

		
}
 
});



//*************** Form 4 validation  End ****************************//




//*************** Form 5 validation  start ****************************//


$.validator.addMethod('regexcheckForCKYC', function(value, element, param) {
    var stingLength = /^[A-Za-z0-9_\s]{0,14}$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});

$.validator.addMethod('regexcheckForbranch', function(value, element, param) {
    var stingLength = /^[A-Za-z0-9_\s]{0,50}$/;
	  var takeoutput= (stingLength.test($('#'+element.id).val()));   		  
	  return takeoutput;
});

$("form[name='form5']").validate({
    
	 onkeyup: false,
	  onfocusout: false ,
	  
	rules: {
		cKYC:{
			required:true
		},
		kYCFirstApplicant:{
			required:true,
			regexcheckForAddress:true
		},
		
		cKYCFirstApplicant:{
			required:true,
			regexcheckForCKYC:true,
		},
		kYCTypeSecondApplicant:{
			
			regexcheckForAddress:true
		},
		cKYCSecondApplicant:{
			
			regexcheckForCKYC:true
		},
		kYCThirdApplicant:{
			
			regexcheckForAddress:true
		},
		cKYCThirdApplicant:{
			
			regexcheckForCKYC:true
		},
		branch:{
			
			regexcheckForbranch:true
		}/*,
		status:{
			
			regexcheckForAddress:true
		},
		dividendPaymentMode:{
			
			regexcheckForAddress:true
		},
		depositoryDetails:{
			
			regexcheckForAddress:true
		},
		communicationMode:{
			regexcheckForAddress:true
		}*/
		
	},
		
	messages:{
		
		cKYC:{
			required:"Please Enter CKYC"
		},
		
		kYCFirstApplicant:{
			required:"Please Enter KYC First Applicant",
			regexcheckForAddress:"Please Enter valid KYC"
		},
		
		cKYCFirstApplicant:{
			required:"Please Enter CKYC First Applicant",
			regexcheckForCKYC:"Please Enter valid CKYC",
		},
		kYCTypeSecondApplicant:{
			
			regexcheckForAddress:"Please Enter valid KYC Second Applicant"
		},
		cKYCSecondApplicant:{
			
			regexcheckForCKYC:"Please Enter valid CKYC Second Applicant"
		},
		kYCThirdApplicant:{
			
			regexcheckForAddress:"Please Enter valid KYC Third Applicant"
		},
		cKYCThirdApplicant:{
			
			regexcheckForCKYC:"Please Enter valid CKYC Third Applicant"
		},
		branch:{
			
			regexcheckForbranch:"Please Enter valid Branch"
		},
		status:{
			
			regexcheckForAddress:"Please Enter valid Status"
		},
		dividendPaymentMode:{
			
			regexcheckForAddress:"Please Enter valid Dividend payment mode"
		},
		depositoryDetails:{
			
			regexcheckForAddress:"Please Enter valid Depository Details"
		},
		communicationMode:{
			regexcheckForAddress:"Please Enter valid Communication Mode"
		}
		
	},
	
	
	 submitHandler: function(form) {
		   
		   openCity($(form).find("#previous5"),'contact');
			openCity($(form).find("#saveAndNext5"),'image');

			
	}

});

//*************** Form 5 validation  End ****************************//






//*************** Form 6 validation  start ****************************//


$("form[name='form5']").validate({
    
	 onkeyup: false,
	  onfocusout: false ,
	  
	rules: {
		type:{
			
			regexcheckForAddress:true,
		},
		documentType:{
			
			regexcheckForAddress:true,
		}
	},
	
	messages:{
		
		type:{
			
			regexcheckForAddress:"Please Enter valid Type",
		},
		
		documentType:{
			
			regexcheckForAddress:"Please Enter valid Document Type"
		}
		
		
	}
	
});
	


