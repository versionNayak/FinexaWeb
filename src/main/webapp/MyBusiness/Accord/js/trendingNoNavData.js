var nextFetch=0;
//  Calendar js
$(document).ready(function() {
    var currentDate = new Date();
    
    //------------------------------
    //serviceurl = "getSchemeListNoNavData/";
    serviceurl = "getSchemeListTrendingNoNavData/"+ nextFetch;
    
	getClientData("GET", "", serviceurl, onSuccess);

	function onSuccess(data) {
		//alert(data.isin);
		
		//dataTbale creation
		//==================
		$('#idTable').dataTable();
		$('#idTable').dataTable().fnDestroy();
		$("#idTbody").empty();
		
		/*$('th:nth-child(1)').text("Isin");
		$('th:nth-child(2)').text("Scheme Name");
		$('th:nth-child(3)').text("Asset Class");
		$('th:nth-child(4)').text("NAV Value");*/
		
		
		$.each(data, function (index, navList) {
			$("#idTbody").append('<tr>' +
			'<td >' + navList.schemeCode +  '</td>' +
			'<td >' + navList.isinGrowth +  '</td>' +
			'<td>' + navList.isinReinvestment + '</td>' +
			'<td>' + navList.schemeName + '</td>' +
			'<td>' + navList.currentNav + '</td>' +
			'<td class="hidden"><input type="text" id="idSchemeCode" name="schemeCode"  value="' + navList.schemeCode + '" readonly="readonly"></td>' +
			'</tr>');
		});

	
		//=====dataTable styling=====
		$('#idTable').dataTable(
				{
					
					"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
					//"pageLength": 10,
					"pagingType": "full_numbers"
					
				}
		);
		$('#idTable_paginate').css('margin-left',-100);
		//=========================================
		hideLoader();
		
	}
	//--------------------------
    
    
    function generateCalendar(d) {
        function monthDays(month, year) {
            var result = [];
            var days = new Date(year, month, 0).getDate();
            for (var i = 1; i <= days; i++) {
                result.push(i);
            }
            return result;
        }
        Date.prototype.monthDays = function() {
            var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            return d.getDate();
        };
        var details = {
            // totalDays: monthDays(d.getMonth(), d.getFullYear()),
            totalDays: d.monthDays(),
            weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        };
        var start = new Date(d.getFullYear(), d.getMonth()).getDay();
        var cal = [];
        var day = 1;
        for (var i = 0; i <= 6; i++) {
            cal.push(['<tr>']);
            for (var j = 0; j < 7; j++) {
                if (i === 0) {
                    cal[i].push('<td>' + details.weekDays[j] + '</td>');
                } else if (day > details.totalDays) {
                    cal[i].push('<td>&nbsp;</td>');
                } else {
                    if (i === 1 && j < start) {
                        cal[i].push('<td>&nbsp;</td>');
                    } else {
                        cal[i].push('<td class="day' + day + '" id="idDay' + day + '">' + day++ + '</td>');
                    }
                }
            }
            cal[i].push('</tr>');
        }
        cal = cal.reduce(function(a, b) {
            return a.concat(b);
        }, []).join('');
        $('#table').append(cal);
        $('#month').text(details.months[d.getMonth()]);
        $('#year').text(d.getFullYear());

    }
    $('#left').click(function() {
        $('#table').text('');
        if (currentDate.getMonth() === 0) {
            currentDate = new Date(currentDate.getFullYear() - 1, 11);
            generateCalendar(currentDate);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            generateCalendar(currentDate);
        }
    });
    $('#right').click(function() {
        $('#table').html('<tr></tr>');
        if (currentDate.getMonth() === 11) {
            currentDate = new Date(currentDate.getFullYear() + 1, 0);
            generateCalendar(currentDate);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            generateCalendar(currentDate);
        }
    });
    generateCalendar(currentDate);
    //alert("currentDate " + currentDate);
    var counter = 0;

    $("#addrow").on("click", function() {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td>2</td>';
        cols += '<td>3</td>';
        cols += '<td>3</td>';

        newRow.append(cols);
        $("table.order-list").append(newRow);
        counter++;
    });
    
  //-------------------------------
    
	$("table.order-list").on("click", "tr", function (e) {
		findid=$(this).find("#idIsin").val();
		findScheme=$(this).find("#idSchemeName").val();
		
		$("#idIsinText").html("<b>"+ findid + "</b>");
		$("#idSchemeNameText").html("<b>" + findScheme + "</b>");
		
		// For Re-Color the digits of Calender
		for(var i=1; i<=31 ; i++){
			$("#idDay"+i).css({"background-color": "white", "color" : "black" });
		}
		
		// For Coloring of date whose NAV value are NOT available
		var day = currentDate.getDate();
		var num=0;
		var findNav;
		for(var i = 1; i<=7; i++) {
			findNav = $(this).find("#idDayVal"+i).val();
			if(findNav == 0) {
				num = day - i;
				//$("day"+num).addclass(calenderColor);
				//$("idDay"+num).css({"background-color": "red"});
				$("#idDay"+num).css({"background-color": "red", "color" : "white" });
			}
		}
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");
	}); 
    
 //----------------------------------
	$("#idDownload").on("click", function(event) {
		//alert(fileFormat);
	  // window.location=ClientServiceUrl+"clientRecord/"+fileFormat+"/downloadClientTemplate";
		//idImportClientRecordForm


	    	
	    	
//	    	if (fileFormat == "excel") {
//	    		fname = "ImportClientRecordsTemplate.xls"; 
//	    	} else if (fileFormat == "csv") {
//	    		fname = "ImportClientRecordsTemplate.csv"; 
//	    	}
//			var downloadURL = ClientServiceUrl+'clientRecord/'+fileFormat+'/downloadClientTemplate';
	    	
	    	var downloadURL = ClientServiceUrl+'TrendingNoNAVData/downloadExcel';
		
	 		var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			var xhr = new XMLHttpRequest();
			xhr.open( "GET", downloadURL, true);
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			xhr.responseType = "blob";
			xhr.onload = function(jqXHR,data) {
				if(jqXHR.status == 401){
		        	var error,error_description;
		        	error = jqXHR.responseJSON.error_description;
		        	error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
		        	if(error === error_description){
		        		msg = "Your session has expired.Please log in again"
		        		bootbox.alert({
				        	 message: msg,
				        	 callback: function () {
					         window.location = "../index.html";
				         }
				      })
		        	}
		        	if(error === "unauthorized"){
		        		msg = "Full authentication is required to access this resource",
		        		bootbox.alert({
				        	 message: msg
				      })
		        	}	
		        } else if(xhr.status === 200){
				//Download start
				// IE
				if (window.navigator.msSaveOrOpenBlob)
	            {
					console.log("IE")
					 var blob = new Blob([xhr.response], {type: 'application/vnd.ms-word'});
	                window.navigator.msSaveOrOpenBlob(blob, fileName);
	          
	           a.click();
	            }
	          else //Chrome and safari
	           {
	           var filename = "Trending_Schemes_No_NAV.xls"; 
	       	   console.log("Chrome and safari")
	       	   var url = window.URL.createObjectURL(xhr.response);  
					   a.href = url;
					   a.download = filename;
					   a.click();
					   window.URL.revokeObjectURL(url);
	            }
		      }
				//Download End
	     	};
				xhr.send(); 	

	    
	});

    
});



//$('#tableID').tableExport({type:'excel',escape:'false'});

