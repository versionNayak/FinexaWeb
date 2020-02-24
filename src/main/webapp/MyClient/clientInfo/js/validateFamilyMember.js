	function validateFamilyMember(form) {
	
   //alert("Inside validation family member");
  // return false;
//	alert("Validation family member 2");
	
		
	
	var lFirstName = document.getElementById("idFMFirstName");
	var lMiddleName = document.getElementById("idFMMiddleName");
	var lLastName = document.getElementById("idFMLastName");
	var lRelation = document.getElementById("idFMRelation");
	var lOtherRelation = document.getElementById("idFMOtherRelation");
	var lPan = document.getElementById("idFMPan");
	var lIdBdate = document.getElementById("idFMBdate");
	var lAadhar = document.getElementById("idFMAadhar");
	var lIdCalendar = document.getElementById("idFMDobCalendar");
	//var lLifeExpectancy = document.getElementById("idFMLifeExpectancy");
	var lRetiredFlag = document.getElementsByName("idFMRetired");
	//var lRetiredGroup = document.getElementById("idRetiredGroup");
	var lRetirementAge = document.getElementById("idRetirementAge");
/*	
    var lPanExists = document.getElementById("idPanExists");
	var lAadharExists = document.getElementById("idAadharExists");
*/	
	var lDependentFlag = document.getElementsByName("idFMDependent");
	//var ldependentGroup = document.getElementById("idFMDependentGroup");



	var errFM = 0;
	//alert("Inside validation family member 3");

	lFirstName.style.border = "1px solid #ccc";
	lMiddleName.style.border = "1px solid #ccc";
	lLastName.style.border = "1px solid #ccc";
	lPan.style.border = "1px solid #ccc";
	lRelation.style.border = "1px solid #ccc";
	lOtherRelation.style.border = "1px solid #ccc";
	lIdBdate.style.border = "1px solid #ccc";
	lIdCalendar.style.border = "1px solid #ccc"; 
	document.getElementById("idFMRetired").style.border = "none";
	//lRetiredGroup.style.border = "1px solid #ccc";
	document.getElementById("idRetirementAge").style.border = "none";
	lAadhar.style.border = "1px solid #ccc";
	//ldependentGroup.style.border = "none";



//	alert("Inside validation family member 4");

	document.getElementById('alertfname').innerHTML="";
	document.getElementById('alertmname').innerHTML="";
	document.getElementById('alertlname').innerHTML="";
	document.getElementById('alertrelation').innerHTML="";
	document.getElementById('alertpan').innerHTML="";
	document.getElementById('alertotherrelation').innerHTML="";
	document.getElementById('alertbdate').innerHTML="";
	document.getElementById('alertretirementage').innerHTML="";
	document.getElementById('alertretired').innerHTML="";
	document.getElementById('alertaadhar').innerHTML="";
	document.getElementById('alertdependent').innerHTML="";
	document.getElementById("alertotherrelation").innerHTML="";
	

	
	
	
//	alert("lAadhar.value "+lAadhar.value);
//	alert("lPan.value "+lPan.value);
	
	/*if((lFirstName.value =="" || lFirstName.value== null ){
		alert("lFirstName.value =="" || lFirstName.value== null");
		
	}
	
	if((lMiddleName.value =="" || lMiddleName.value== null ){
		alert("lMiddleName.value =="" || lMiddleName.value== null");
		
	}
	if(lLastName.value=="" || lLastName.value== null){
		alert("lMiddleName.value ");
	}
	
	if(lIdBdate.value=="" || lIdBdate.value== null)
	{
		alert("lIdBdate.vale");
	}
	
	if(lpan.vale=="" || lpan.vale== null) {
		alert("lpanaaa.vale");
	}
	if(lAadhar.value.value=="" || lAadhar.value.value== null) {
		alert("lpanbbbbbb.valebbb");
	}
	if(llRelation.value=="" lRelation.value== null) {
		alert("lpan.valecccccc");
	}
*/
	if (sessionStorage.getItem("FAMILY_ADD_CLIENT") == "YES"){
	if((lFirstName.value =="" || lFirstName.value== null) && (lMiddleName.value=="" || lMiddleName.value== null) && (lLastName.value=="" || lLastName.value== null) &&
	(lIdBdate.value=="" || lIdBdate.value== null) && (lPan.value=="" || lPan.value== null)  &&
	(lAadhar.value=="" || lAadhar.value== null) && (lRelation.value=="" || lRelation.value==null))	
		{
		  //alert("gghhgh");
		return true;
		}
	}
	//&& (lRelation.value=="" || lRelation.value==null)
	
//	alert("Inside validation family member 5");
	
	//Validate first name
	
	
	
	//alert("First name: " + lFirstName.value);
	
	if (!hasValue(lFirstName.value)){
//		alert("inside fname");
		document.getElementById('alertfname').innerHTML="Please enter  first name of family member";
		lFirstName.style.border = "2px solid red";
		errFM=1;
		}	
	else {
//		alert("inside fname: "+ lFirstName.value);
		var chkAlpha = isCharForName(lFirstName.value);
//		alert("inside fname after ischar");
		if (!chkAlpha){
//			alert("inside fname 2");
			document.getElementById('alertfname').innerHTML="Please enter only alphabets for first name";
			lFirstName.style.border = "2px solid red";
			errFM=1;
		}
	}
	//Validate middle name
//	alert("After fname");
	
	if (hasValue(lMiddleName.value)){
		//alert("inside mname");
		if (!isCharForName(lMiddleName.value)){
			document.getElementById('alertmname').innerHTML="Please enter only alphabets for middle name";
			lMiddleName.style.border = "2px solid red";
			errFM=1;
		}
	}
//	alert("After mname");
	//Validate last name
	if (!hasValue(lLastName.value)){
//		alert("inside fname");
		//document.getElementById('alertlname').innerHTML="Please enter last name of family member";
		//lLastName.style.border = "2px solid red";
		//errFM=1;
		} else {
			if (hasValue(lLastName.value)){
				//alert("inside lname");
				if (!isCharForName(lLastName.value)){
					document.getElementById('alertlname').innerHTML="Please enter only alphabets for last name";
					lLastName.style.border = "2px solid red";
					errFM=1;
				}
			}
		}
	
//	alert("After lname");

	//Validate date of birth

	if (!hasValue(lIdBdate.value)){
//		alert("inside bdate null");
		document.getElementById('alertbdate').innerHTML="Please enter date of birth";
		lIdBdate.style.border = "2px solid red";
		lIdCalendar.style.border = "2px solid red";
		errFM=1;
		}	
	else {
		
		var lDOBStr = lIdBdate.value;
//		alert("Dob String: " + lDOBStr);
		var day = lDOBStr.slice(0,2);
		var month = lDOBStr.slice(3,5);
		var year = lDOBStr.slice(6);
		var shortDate  = year.concat("-", month, "-", day);
//		alert ("Shortdate: " + shortDate);
		var lDOB = new Date(shortDate);
		var chkDate=0;
//		alert("Before validate date");
		chkDate=validateDOB(lDOBStr);
//		alert("After validate date");
			if (chkDate==0){
//				alert("Invalid date");
				document.getElementById('alertbdate').innerHTML="Please enter a valid date";
				lIdBdate.style.border = "2px solid red";
				lIdCalendar.style.border = "2px solid red";
				errFM=1;
			}
			else {
				if (!isPastDate(lDOBStr)){
//					alert("Future Date");
					document.getElementById('alertbdate').innerHTML="Date of birth cannot be a future date";
					lIdBdate.style.border = "2px solid red";
					lIdCalendar.style.border = "2px solid red";
					errFM=1;
				}
			}
	}

//		alert("After bdate");


	//Validate Pan no.
	//alert("lPan.value "+lPan.value);
	if (hasValue(lPan.value)){
			var panVal = lPan.value;
			var chkPan = validatePan(panVal);
			//alert("chkPan "+chkPan);
			if (!chkPan) {
				document.getElementById('alertpan').innerHTML="Please enter a valid PAN no. Valid format is AAAAA9999A.";
				lPan.style.border = "2px solid red";
				errFM=1;
			}
/*			
 *				if (lPanExists.value == "Y"){
				//	alert("Pan is not unique");
					document.getElementById('alertpan').innerHTML="PAN no. is not unique.";
					lPan.style.border = "2px solid red";
					errPan=1;			
				}
*/	
	}
	
//	alert("After pan");
	//Validate Aadhar no.
//	alert("lPan.value "+lAadhar.value);
	if (hasValue(lAadhar.value)){
//		alert("Aadhar 1");
		
			var chkAadhar = validateAadhar(lAadhar.value);
		//	alert("chkAadhar "+chkAadhar);
			if (chkAadhar==1){
		//		alert("Plase enter only digits");
				document.getElementById('alertaadhar').innerHTML="Please enter digits 0-9 for Aadhar no.";
				lAadhar.style.border = "2px solid red";
				errFM=1;
			}
				
			else{
				if (chkAadhar==2){
			//		alert("Plase enter only digits");
					document.getElementById('alertaadhar').innerHTML="You have to enter 12 digits for Aadhar no.";
					lAadhar.style.border = "2px solid red";
					errFM=1;
				}
			   
/*			    	
 					if (lAadharExists.value == "Y"){
			    		document.getElementById('alertaadhar').innerHTML="Aadhar no. is not unique";
			    		lAadhar.style.border = "2px solid red";
			    		errAadhar=1;
			    	}
*/
			    
			}
	}
	
//	alert("After Aadhar");
	//Validate Relation
	//alert("lRelation.value "+lRelation.value);
	if (!hasValue(lRelation.value)){
		document.getElementById('alertrelation').innerHTML="Please enter relationship";
		lRelation.style.border = "2px solid red";
		errFM=1;
	}
	else{		
	  if(lRelation.value==8) {
		if (!hasValue(lOtherRelation.value)){
			document.getElementById('alertotherrelation').innerHTML="Please enter relationship";
			lOtherRelation.style.border = "2px solid red";
			errFM=1;
		}
		else {
			if (!isChar(lOtherRelation.value)){
				document.getElementById('alertotherrelation').innerHTML="Please enter only alphabets";
				lOtherRelation.style.border = "2px solid red";
				errFM=1;
			}
		}
	} 
}
	

	//Validate Retired
/*	
 	if ( ( form.fmRetired[0].checked == false ) && ( form.fmRetired[1].checked == false ) )
	{
	//	alert(form.fmRetired[0].checked +"   "+form.fmRetired[1].checked );
		document.getElementById('alertretired').innerHTML="&nbsp;Please enter retired flag";
		//document.getElementById("idRetired").style.border = "2px solid red";
		lRetiredGroup.style.border = "2px solid red";
		lRetiredGroup.style.borderRadius = "7px";
		errRetired=1;
	}
*/		
		if((document.getElementById('idFMRetiredN').checked) && (document.getElementById('idFMDependentN').checked)) {
		//	alert("Retired No")
			if (!hasValue(lRetirementAge.value)) {
				document.getElementById('alertretirementage').innerHTML="Please enter expected retirement age";
				//lRetirementAge.style.border = "2px solid red";
				lRetirementAge.style.border = "2px solid red";
				errFM=1;
				}
			else{
				if (!isNumeric(lRetirementAge.value)){
					document.getElementById('alertretirementage').innerHTML="Please enter only number";
					lRetirementAge.style.border = "2px solid red";
					errFM=1;
				}
				else{
					if(lRetirementAge.value<0){
						document.getElementById('alertretirementage').innerHTML="Age should be positive value";
						lRetirementAge.style.border = "2px solid red";
						errFM=1;
					}
				
				else{
			
					currentage=calculateAgeYears(lIdBdate.value);
				//	alert(currentage+" "+lRetirementAge.value);
					if(lRetirementAge.value<currentage){
						//alert(lRetirementAge.value+"is less");
						document.getElementById('alertretirementage').innerHTML="Retirementage should be greater than current age";
						lRetirementAge.style.border = "2px solid red";
						errFM=1;
					}
						
				}
			}
				
				
			}
		}
	
/*	
 	if ( ( form.fmDependent[0].checked == false ) && ( form.fmDependent[1].checked == false ) )
	{
	//	alert(form.fmDependent[0].checked +"   "+form.fmDependent[0].checked );
		document.getElementById('alertdependent').innerHTML="&nbsp;Please enter dependent flag";
		ldependentGroup.style.border  = "2px solid red";
		ldependentGroup.style.borderRadius = "7px";
		errdependent=1;
	}
*/	
	
	/*if (!hasValue(lLifeExpectancy.value)){
		//alert("inside lfe expectancy");
		document.getElementById('alertlifeexpectancy').innerHTML="Please enter life expectancy";
		lLifeExpectancy.style.border = "2px solid red";
		errLifeExpectancy=1;
	}*/	

	
//	alert("After other relation");
	
/*if((lFirstName.value == "" || lFirstName.value== null) && (lMiddleName.value== "" || lMiddleName.value== null) && (lLastName.value== "" || lLastName.value== null) &&
(lIdBdate.value== "" || lIdBdate.value== null) && (lPan.value== "" || lPan.value== null) && (lRelation.value=="" || lRelation.value==null) &&
(lAadhar.value== "" || lAadhar.value== null))	
{
					
	return true;
}*/
				
//	else{
	
	
	/*alert("errFname "+errFname);
	alert("errMname "+errMname);
	alert("errLname "+errLname);
	alert("errRelation "+errRelation);
	alert("errOtherRelation "+errOtherRelation);
	alert("errBdate "+errBdate);
	alert("errPan "+errPan);
	alert("errRetirementAge "+errRetirementAge);
	alert("errRetired "+errRetired);
	alert("errdependent "+errdependent);*/
//	alert("After focus");
	//return false;

		if (errFM==1){
	//	alert("Error");
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		}
		else{
			return true;
		}
	//}
}