	function validateAPY(form) {
		//alert("Inside validation");
		var lApyStartDate = document.getElementById("idApyStartDate");
		var lIdCalendar = document.getElementById("idStartDateCalendar");
		var lMonthlyPensionRequired = document.getElementById("idMonthlyPensionRequired");
//		var lIdRupee = document.getElementById("idMonthlyPensionRequiredRupee");
		var lInvestmentFrequency = document.getElementById("idInvestmentFrequency");
		var lLifeExpectancyDIV = document.getElementById("idLifeExpectancyDIV");
		
		var errApy=0;
		
		//alert("Inside validation 2 new");
		
		
		lMonthlyPensionRequired.style.border = "1px solid #ccc";
//		lIdRupee.style.border = "1px solid #ccc";
		lApyStartDate.style.border = "1px solid #ccc";
		lInvestmentFrequency.style.border = "1px solid #ccc";
        lLifeExpectancyDIV.style.border = "1px solid #ccc";
		
		//alert("Inside validation 3");
		
		document.getElementById('alertapystartdate').innerHTML="";
		//alert("Inside validation 4-1");
		document.getElementById('alertif').innerHTML="";
		document.getElementById('alertmonthlypension').innerHTML="";
        document.getElementById('alertLifeExpectancy').innerHTML="";


		/*if (!hasValue(lLifeExpectancyDIV.value)) {
			alert("in if1");
            document.getElementById('alertLifeExpectancy').innerHTML="Please Update Life Expectancy";
            lLifeExpectancyDIV.style.border = "2px solid red";
            errApy=1;
        } else {*/
        if (!hasValue(lLifeExpectancyDIV.value)) {
        
            /*var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
            var returl = "/clientFamilyMember/" + selectedClientId;
            getClientData("GET", "", returl, checkSuccess);
            function checkSuccess(data){
            	alert("new");
            	alert(data);
                if (data['lifeExpectancy'] < 0 || data['lifeExpectancy'] === 0 || data['lifeExpectancy'] === null) {
                    alert("in else1");*/
                	document.getElementById('alertLifeExpectancy').innerHTML="Please Update Life Expectancy";
                    lLifeExpectancyDIV.style.border = "2px solid red";
                    errApy=1;
               /* }*/
           /* }*/
        }


		var strUser = lMonthlyPensionRequired.options[lMonthlyPensionRequired.selectedIndex].value;
		if (strUser=="") {
			//alert("in if2");
			document.getElementById('alertmonthlypension').innerHTML="Please enter Monthly Pension Required";
			lMonthlyPensionRequired.style.border = "2px solid red";
			errApy=1;
		}
		
		
		
		if (!hasValue(lApyStartDate.value)) {
			//alert("in if3");
			document.getElementById('alertapystartdate').innerHTML="Please enter Start Date";
			lApyStartDate.style.border = "2px solid red";
			errApy=1;
		}else{
			window.user_dt = moment(lApyStartDate.value,'DD/MM/YYYY');
			
			if(!window.user_dt.isValid()){
				//alert("in if4");
				document.getElementById('alertapystartdate').innerHTML="Start Date is not a valid date";
				lApyStartDate.style.border = "2px solid red";
				errApy=1;
			}else if(!isDateBetwenRange(window.client_dob , new Date(), window.user_dt.toDate())){
				//alert("in else3");
				document.getElementById('alertapystartdate').innerHTML="Start Date should be in between client dob & today";
				lApyStartDate.style.border = "2px solid red";
				errApy=1;
			}
		}
		
		/*if (hasValue(lMonthlyPensionRequired.value)){
			lMonthlyPensionRequired.value = lMonthlyPensionRequired.value.replace(/,/g, '');
			if (lMonthlyPensionRequired.value == 0){
				document.getElementById('alertmonthlypension').innerHTML="Value cannot be 0";
				lMonthlyPensionRequired.style.border = "2px solid red";			
//		    	lIdRupee.style.border = "2px solid red";
				errApy=1;	
			}
			else {
				var num = lMonthlyPensionRequired.value;
				//alert("num: " + num);
				//return false;
				if (!isDecimal(num)){
					document.getElementById('alertmonthlypension').innerHTML="Please enter a positive value not starting with 0";
					lMonthlyPensionRequired.style.border = "2px solid red";			
//					lIdRupee.style.border = "2px solid red";
					errApy=1;		
				}
				else {
					var n = Number(num).toFixed(2);
				//	alert("n: " + n);
					//return false;
					lMonthlyPensionRequired.value = n;
				}
			}
		}
		else {
			if (!hasValue(lMonthlyPensionRequired.value)) {
				document.getElementById('alertmonthlypension').innerHTML="Please enter Monthly Pension Required";
				lMonthlyPensionRequired.style.border = "2px solid red";
//				lIdRupee.style.border = "2px solid red";
				errApy=1;
			}	
		}*/
		
		//alert("after monthly pension");
		//return false;
		
		var investmentFrequency = lInvestmentFrequency.options[lInvestmentFrequency.selectedIndex].value;
		//alert('Investment Frequency: '+investmentFrequency);
		if (investmentFrequency==""){
			//alert("in if5");
			document.getElementById('alertif').innerHTML="Please enter Investment Frequency";
			lInvestmentFrequency.style.border = "2px solid red";
			errApy=1;
		}
		
		
		//alert(errApy);
		
		if (errApy==1){
			//alert("Error");
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		}else{
			//alert('Validation Successful');
			return true;
		}
	}