function maskAmountValue(val) {
	var maskedval = Number(val).toLocaleString('en-IN');
	return maskedval;
}
function maskAmount(num) {
	var numval = $(num).val();
	numval=unmaskAmountValue(numval);
	//console.log('In maskAmount() value: ' + numval);
	if(numval!=0 || numval!=""){
	//	console.log('In maskAmount() value: ' + numval);		
		var maskednum = Number(numval).toLocaleString('en-IN');
		$(num).val(maskednum);
	}
}
function unmaskAmountValue(numval) {
	//console.log('In unmaskAmountValue(): ' + numval);
	numval = numval.replace(/,/g, '');
	return numval; 
}
$(document).ready(function(){

	$("#idGoalOptions").show();
	$(".goaldash").removeClass("activeitem");

	vClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	$("#idBody").load("plan/gp/viewGoalsDetails.html");
	$(".glidnonglid").hide();
	$(".sidenav1 a").css("border-bottom","white");
	$(".form-section-container").css("padding","18px 45px 72px 45px");
	$(".form-section-container").height("auto");
	vglideNonglideMode = 'G';// by default for every goal Glide Path will be selected
	selectedMode = 2; // by Default SIP will be selected
	lumpsumForSIP = 0;
	sessionStorage.setItem("RecommendedAssetAllocation", vglideNonglideMode);
	$(".goalsdetails").click(function(){

		$("#idBody").empty();
		$("#idBody").load("plan/gp/viewGoalsDetails.html");
		$(".sidenav1").css("height","41%");
		$(".form-section-container").css("padding","18px 45px 72px 45px");
		$(".form-section-container").height("auto");
		$(".idHeading").html("Goals Details");
		$(".glidnonglid").hide();
		$(".goaldash").removeClass("activeitem");
		$(".goalsdetails").addClass("activeitem");
		$(".riskprofile").removeClass("activeitem");
		$(".amount").removeClass("activeitem");
		$(".product").removeClass("activeitem");
		$(".yearly").removeClass("activeitem");
		$(".goalinput").removeClass("activeitem");
		$(".recommended").removeClass("activeitem");
	});
	$(".riskprofile").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/gp/viewRiskProfile.html");
		$(".form-section-container").css("padding","18px 45px 72px 45px");
		$(".form-section-container").height("auto");
		$(".sidenav1").css("height","46%");
		$(".idHeading").html("Risk Profile");
		//$("#dashbord").css("height","413px");
		$(".glidnonglid").hide();
		$(".goaldash").removeClass("activeitem");
		$(".riskprofile").addClass("activeitem");
		$(".goalsdetails").removeClass("activeitemm");
		$(".amount").removeClass("activeitem");
		$(".product").removeClass("activeitem");
		$(".yearly").removeClass("activeitem");
		$(".goalinput").removeClass("activeitem");
		$(".recommended").removeClass("activeitem");
	});
	$(".amount").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/gp/viewAmountNeeded.html");
		$(".form-section-container").css("padding","18px 45px 72px 45px");
		$(".form-section-container").height("auto");
		$(".idHeading").html("Amount Needed");
		$(".sidenav1").css("height","41%");
		$("#dashbord").css("height","485px");
		$(".amount").addClass("activeitem");
		$(".glidnonglid").hide();
		$(".goaldash").removeClass("activeitem");
		$(".goalsdetails").removeClass("activeitem");
		$(".riskprofile").removeClass("activeitem");
		$(".product").removeClass("activeitem");
		$(".yearly").removeClass("activeitem");
		$(".goalinput").removeClass("activeitem");
		$(".recommended").removeClass("activeitem");
	});
	$(".product").click(function(){
		$("#idBody").empty();
		$(".goaldash").removeClass("activeitem");
		$(".goalsdetails").removeClass("activeitem");
		$(".riskprofile").removeClass("activeitem");
		$(".amount").removeClass("activeitem");
		$(".yearly").removeClass("activeitem");
		$(".goalinput").removeClass("activeitem");
		$(".recommended").removeClass("activeitem");
		$(".product").addClass("activeitem");
		$("#idBody").load("plan/gp/viewProductRecommend.html");
		$(".form-section-container").css("padding","18px 45px 72px 45px");
		$(".form-section-container").height("auto");
		$(".idHeading").html("Product Recommendation");
		$(".sidenav1").css("height","43%");
		//$("#dashbord").css("height","485px");
		$(".glidnonglid").hide();
	});
	$(".yearly").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/gp/viewYearlyCashflows.html");
		$(".form-section-container").css("padding","18px 45px 72px 45px");
		$(".form-section-container").height("auto");
		$(".idHeading").html("Yearly Cashflows");
		$(".sidenav1").css("height","41%");
		//$("#dashbord").css("height","485px");
		$("#glidpath").hide();
		$(".glidnonglid").hide();
		$(".goaldash").removeClass("activeitem");
		$(".yearly").addClass("activeitem");
		$(".goalsdetails").removeClass("activeitem");
		$(".riskprofile").removeClass("activeitem");
		$(".amount").removeClass("activeitem");
		$(".product").removeClass("activeitem");
		$(".goalinput").removeClass("activeitem");
		$(".recommended").removeClass("activeitem");
	});
	$(".goalinput").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/gp/viewGoalInput.html");
		$(".form-section-container").css("padding","18px 45px 72px 45px");
		$(".form-section-container").height("auto");
		$(".idHeading").html("Goals Input");
		//$("#dashbord").css("height","413px");
		$(".glidnonglid").hide();
		$(".goaldash").removeClass("activeitem");
		$(".goalinput").addClass("activeitem");
		$(".goalsdetails").removeClass("activeitem");
		$(".riskprofile").removeClass("activeitem");
		$(".amount").removeClass("activeitem");
		$(".product").removeClass("activeitem");
		$(".yearly").removeClass("activeitem");
		$(".recommended").removeClass("activeitem");
	});
	$(".recommended").click(function(){

		$(".form-section-container").css("padding","18px 45px 135px 45px");
		$(".form-section-container").height("auto");
		if (vglideNonglideMode == "G") {
			$("#idBody").empty();
			$("#idBody").load("plan/gp/showGlidePath.html");
		} else {
			$("#idBody").empty();
			$("#idBody").load("plan/gp/showNonGlidePath.html");
		}
		$(".idHeading").html("Recommended Asset Allocation");
		$(".glidnonglidselection .gld1").removeClass("ui-radio");
		$(".sidenav1").css("height","41%");
		$(".glidnonglid").show();
		$(".goaldash").removeClass("activeitem");
		$(".recommended").addClass("activeitem");
		$(".goalsdetails").removeClass("activeitem");
		$(".riskprofile").removeClass("activeitem");
		$(".amount").removeClass("activeitem");
		$(".product").removeClass("activeitem");
		$(".yearly").removeClass("activeitem");
		$(".goalinput").removeClass("activeitem");
	});
	$('input:radio[name="selectglid"]').change(
			function(){

				if ($(this).val() == 'glidpthrdo') {
					$("#idBody").empty();
					$("#idBody").load("plan/gp/showGlidePath.html");
					vglideNonglideMode = "G";
				}
				else {
					$("#idBody").empty();
					$("#idBody").load("plan/gp/showNonGlidePath.html");
					vglideNonglideMode = "N";
				}
				sessionStorage.setItem("RecommendedAssetAllocation", vglideNonglideMode);//gp report don't delete
				$(".idHeading").html("Recommended Asset Allocation");
			});

	$(".humbm").click( function(){

		if($("#idGPSidenav").width() == 0){


			document.getElementById("idGPSidenav").style.width = "250px";

			$(".idGPSidenav").css("margin-right","-12px");
		}
		else{
			document.getElementById("idGPSidenav").style.width = "0";
			document.getElementById("idGPSidenav").style.right = "-79px";
			$(".idGPSidenav a").css("border-bottom","white");
			$(".idGPSidenav a").css("margin-left","14px");
			$(".idGPSidenav a").css("color","#dadada");
			$(".idGPSidenav").css("right","-60px");

		}
	});
});
function openNav1() {
	$(".sidenav1").show();
	$(".sidenav1").css("right","0px");
	document.getElementById("idGPSidenav").style.width = "250px";
	$(".sidenav1 a").css("border-bottom","1px solid #d4d4d5");
	$(".sidenav1 a").css("margin-left","0px");
	$(".sidenav1 a").css("color","white");
}
function closeNav1() {
	
	document.getElementById("idGPSidenav").style.width = "0";
	$(".sidenav1 a").css("border-bottom","white");
	$(".sidenav1 a").css("margin-left","14px");
	$(".sidenav1 a").css("color","#dadada");
	$(".sidenav1").css("right","-55px");
}

function getDataUri(url, callback) {
    var image = new Image();	
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size	
        canvas.getContext('2d').drawImage(this, 0, 0);	
        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));	
        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };	
    image.src = url;
}