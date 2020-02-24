
	
	$(".portfoliomax").click(function(){
	
		$("#idClient").empty();
		$("#idClient").load("plan/pm/viewPortfolioTracker.html");
		$("#idpmHeading").html("Portfolio Tracker");
		$("#dashbord").css("height","485px");
		
});
/** slideshow for asset maturity **/

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active1", "");
  }
  slides[slideIndex-1].style.display = "block";  
  if(slideIndex<=3){
  dots[slideIndex-1].className += " active1";
  }
}

	
/** slideshow for goal planned **/

/*var slideIndex1 = 1;
showSlides1(slideIndex1);*/
var slideIndex1=1;
function plusSlides1(n) {
  showSlides1(slideIndex1 += n);
}

function currentSlide1(n) {
  showSlides1(slideIndex1 = n);
}

function showSlides1(n) {
	
  var i;
  var slides1 = document.getElementsByClassName("mySlides1");
  var dots1 = document.getElementsByClassName("dot1");
  if (n > slides1.length) {slideIndex1 = 1}    
  if (n < 1) {slideIndex1 = slides1.length}
  for (i = 0; i < slides1.length; i++) {
      slides1[i].style.display = "none";  
  }
  for (i = 0; i < dots1.length; i++) {
      dots1[i].className = dots1[i].className.replace(" active2", "");
  }
  console.log("slides1.length "+slides1.length);
  console.log("n "+n);
  console.log("slideIndex1 "+slideIndex1);

  slides1[slideIndex1-1].style.display = "block";  
  dots1[slideIndex1-1].className += " active2";
}



/** slideshow for  assset maturity**/

var slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
  showSlides2(slideIndex2 = n);
}

function showSlides2(n) {
  var i;
  var slides2 = document.getElementsByClassName("mySlides2");
  var dots2 = document.getElementsByClassName("dot2");
  if (n > slides2.length) {slideIndex2 = 1}    
  if (n < 1) {slideIndex2 = slides2.length}
  for (i = 0; i < slides2.length; i++) {
      slides2[i].style.display = "none";  
  }
  for (i = 0; i < dots2.length; i++) {
      dots2[i].className = dots2[i].className.replace(" active2", "");
  }
  slides2[slideIndex2-1].style.display = "block";  
  dots2[slideIndex2-1].className += " active2";
}


/** slideshow for Insurance**/

var slideIndex3 = 1;
showSlides3(slideIndex3);

function plusSlides3(n) {
  showSlides3(slideIndex3 += n);
}

function currentSlide3(n) {
  showSlides3(slideIndex3 = n);
}

function showSlides3(n) {
  var i;
  var slides3 = document.getElementsByClassName("mySlides3");
  var dots3 = document.getElementsByClassName("dot3");
  if (n > slides3.length) {slideIndex3 = 1}    
  if (n < 1) {slideIndex3 = slides3.length}
  for (i = 0; i < slides3.length; i++) {
      slides3[i].style.display = "none";  
  }
  for (i = 0; i < dots3.length; i++) {
      dots3[i].className = dots3[i].className.replace(" active2", "");
  }
  slides3[slideIndex3-1].style.display = "block";  
  dots3[slideIndex3-1].className += " active2";
}

var riskScore=[];
var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var serviceurl = "getRiskProfileScore/"+selectedClientId ;
getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);

function onSuccess(data) {
	if(data.riskProfileScore!=null){
	riskScore.push(parseInt(data.riskProfileScore));
	}
    
}
console.log("riskScore outside"+riskScore);	




		   Highcharts.chart('idRisk', {

    chart: {
        type: 'gauge',
	
       
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
	
		
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
               
			   },
            
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 10,

       

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: '<b>Risk Score</b>',
		 style:{

                    fontSize: '9px'
                }       
			
        },
        plotBands: [{
            from: 0,
            to: 3.5,
            color: '#3a3a4f' 
			
        }, {
            from: 3.5,
            to: 7,
            color: '#95ceff'
        }, {
            from: 7,
            to: 10,
            color: '#f7a35c',
			fill:'#f7a35c'
        }]
    },

    series:[{
            name: 'Score',
            data: riskScore,
            dataLabels: {
                formatter: function () {
                    var kmh = this.y;
                    if(kmh > 0 & kmh < 3.4){
                        
                    return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 3.4 & kmh < 7){
                        
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 7 & kmh < 10){
                        
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
                    }
                    
                    
                },
               
            },
           
        }]


});
	$(document).ready(function(){
$(function () {
	serviceurl = "clientGoalList/"+selectedClientId;
	 getClientData("GET", "", serviceurl, onSuccessGoalData);
	  function onSuccessGoalData(data) {
		 console.log("len "+data.length);
	     var i=1;
	     var html="";
	     var i=1;
	    
		  $.each(data, function (index, goal) {
			  var sip="",lumpsum="";
			  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMMYYYY');
			  if(goal.sip!=null){
				  sip=goal.sip;
			  }
			  if(goal.lumpsum!=null){
				  lumpsum=goal.lumpsum;
			  }
			  if(i%2!=0){
			  console.log("i odd "+i);
			  html+='<div class="mySlides1 fade"><div style="width:230px"><table class="" style="width: 97%;margin-top: -118px;">';
			  } 
			  html+='<hr/><tr>' +
			  '<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">' + goal.description + '</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>' +
			  '</tr>'+
			  '<tr style="font-size: 12px">'+
			  '<td class="">Start</td>'+
			  '<td class="">SIP</td>'+
			  '<td class="">Lumpsum</td>'+
			  '</tr>'+
			  '<tr style="font-size: 12px;">'+
			  '<td class="resulttopbrdr"><b>'+startYearMonth+'</b></td>'+
			  '<td class="resulttopbrdr"><b>'+sip+'</b></td>'+
			  '<td class="resulttopbrdr"><b>'+lumpsum+'</b></td>'+
			  '</tr>';
			  if(i%2==0){
				  console.log("i even"+i);
				  html+='</table></div></div>';
			   }
			  i++;
		
		  });
		  if(i%2==0){
			  html+='</table></div></div>';
		  }
		 html+='<a class="prev1" onclick="plusSlides1(-1)">&#10094;</a><a class="next1" onclick="plusSlides1(1)">&#10095;</a>';
		 console.log(html);
		 $("#idGoalPlanned").html(html);
		 
		
		  console.log("slideIndex1 "+slideIndex1);
		  showSlides1(slideIndex1);
		  console.log("end ");
		 
	  }
	     serviceurl = "clientGoalList/"+selectedClientId;
		 getClientData("GET", "", serviceurl, onSuccessGoalDataList);
		  function onSuccessGoalDataList(data) {
		
			  
		      console.log("len "+data.length);
		      $("#idGoalList").empty();
			  $.each(data, function (index, goal) {
			 
			  var sip="",lumpsum="";
			  if(goal.sip!=null){
				  sip=goal.sip;
			  }
			  if(goal.lumpsum!=null){
				  lumpsum=goal.lumpsum;
			  }
			  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM-YY');
               $("#idGoalList").append('<tr>' +
				  '<td>' + goal.priority + '</td>' +
				  '<td>' + goal.lookupGoalTypeName + '</td>' +
				  '<td>' + goal.description + '</td>' +
				  '<td>' + startYearMonth + '</td>' +
				  '<td>' + sip + '</td>' +
				  '<td>' + lumpsum + '</td>' +
                '</tr>');
				});		 
				 
		       }
        $('#clientdashbarGraph').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['CurrentAA(%)', 'RecommendedAA(%)']
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                  align: 'right',
        x: -5,
        verticalAlign: 'bottom',
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#ececec',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y+'%' +'<br/>'+
                        'Total: '+ this.point.stackTotal+'%';
                }
            },
            plotOptions: {
				series: {
        events: {
            legendItemClick: function() {
              return false;
            }
        }
    },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        formatter: function() {
                            if (this.y === 0) {
                                return null;
                            } else {
                                return this.y+'%';
                            }
                        }
                    }
                }
            },
					
           series: [{
        name: 'Alternatives',
            data: [10,9],
			color:"#3a3a4f"
    }, {
        name: 'Equity',
            data: [8,9],
			color:"#95ceff"
    },  {
        name: 'Fixed Income',
            data: [9,11],
			color:"#f7a35c"
    },{
        name: 'Cash/Liquid',
            data: [9,18],
			color:"#90ed7d"
		   }]
        });
    });
    
	});
	
	
	
	/*max button code*/
	

	/** code for max window Portfolio tracker **/
	
	var modal = document.getElementById("idPoportfolio");

// Get the button that opens the modal
var btn = document.getElementById("idmaxportfolio");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
	/** code for max window Goals Planned**/
	
	var modal1 = document.getElementById("idPopgoalplanned");

// Get the button that opens the modal
var btn1 = document.getElementById("idmaxgoalplanned");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}


/** code for max window Asset Maturity**/
	
	var modal2 = document.getElementById("idPopasset");

// Get the button that opens the modal
var btn2 = document.getElementById("idmaxasset");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}
	
	
	/** code for max window Insurance maturity **/
	
	var modal3 = document.getElementById("idPopinsurance");

// Get the button that opens the modal
var btn3 = document.getElementById("idmaxInsurance");

// Get the <span> element that closes the modal
var span3 = document.getElementsByClassName("close3")[0];

// When the user clicks the button, open the modal 
btn3.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal3.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span3.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal3.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}
$(document).ready(function() {
	$("#top-nav-bar").show();
	selectedClientId = 	sessionStorage.getItem("SELECTED_CLIENT_ID");
	//alert(selectedClientId);
	if (selectedClientId != 0 && selectedClientId != null && selectedClientId != 'udefined')
	{
		getClientData("GET", "", "clientMaster/"+selectedClientId, onAgeSuccess);
		function onAgeSuccess(data) {			
			console.log("data.age "+data.age);
			console.log("retirement status: " +data.retiredFlag);
			//alert("client dob: " + data.birthDate);
			sessionStorage.setItem("SELECTED_CLIENT_DOB", data.birthDate);
			sessionStorage.setItem("SELECTED_CLIENT_LIFE_EXP", data.lifeExpectancy);		
			sessionStorage.setItem("SELECTED_CLIENT_RETIREMENT_STATUS", data.retiredFlag);
			if(data.age>=18){
				$('#idGuardian').hide();
				$('#idGuardianContact').hide();
			}else{
				$('#idGuardian').show();
				$('#idGuardianContact').show();
			}
		}
	}
	
});
