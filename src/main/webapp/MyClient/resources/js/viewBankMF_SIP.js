$(document).ready(function(){
	/*for select MF*/
	$("#changewidth").on('change',function(){
	
	var selectval= $("#changewidth").val();

	
	$("#changewidth").attr('title',selectval);
	});
	
$("#changewidth").on('focusin',function(){
	
	$(this).css("width","auto");
	
});

$("#changewidth").on('focusout',function(){
	
	$(this).css("width","15.7em");
	
});

/*for select Scheme*/



$("#selectscheme").on('change',function(){
	
	var selectval1= $("#selectscheme").val();

	
	$("#selectscheme").attr('title',selectval1);
	});
	
$("#selectscheme").on('focusin',function(){
	
	$(this).css("width","auto");
	
});

$("#selectscheme").on('focusout',function(){
	
	$(this).css("width","15.7em");
	
});

	
	$(".form-section-container").css("padding","none");
	
	var myCounter = 0;
			$(".addCF").click(function(){
				myCounter++;
				$(".customFields").append('<tr><td style="width:22%" id="dateinput"><p id="datepicker" style="width:100%;margin-top:10px" class="input-group date" data-date-format="dd-mm-yyyy"><input class="form-control" id="customFieldDate" value="" style="font-size:14px;height:29px" type="text" placeholder="DD/MM/YYYY"/><span class="input-group-addon calendar-icon-container" style="height:5px;padding:0px 3px 0px 3px"><i class="glyphicon calendar-icon-theme"></i></span></p></td><td id="appended2" style="margin-left:0.2em"><input type="text" style="height:29px" value="" id="customField1" class="form-control" readonly/></td><td id="appended3" style="margin-left: 0.2em"><input type="text" style="height:29px" id="customField2" class="form-control"/></td><td id="appended4" style="margin-left: 0.3em"><input type="text" style="height:29px" id="customField3" class="form-control"/></td><td style="width:12%" id="appended5" style="margin-left:0.3em"><select id="customFielddrop" class="form-control" id="investmd" style="width:87px; margin-top:-15px;font-size:14px;position:absolute;z-index:1;height:29px"><option value="Yes">Yes</option><option value="No">No</option></select> </td><td id="appended6" style="margin-left: 0.2em;"><input type="text" style="height:29px" id="customField4" class="form-control" readonly/></td><td id="appended7" style="width:11%;margin-left: .3em;"><button href="javascript:void(0);" style="height:29px;font-size:14px;padding-top:4px;" class="remCF form-control">Remove</button></td></tr> ');
			});
			$(".customFields").on('click','.remCF',function(){
				$(this).parent().parent().remove();
			});
			$("#datepicker").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
			$("#customFieldDate").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker();
	
	
	
	
	
	
	
	
	
	
	

	$("#dataloan tr").click(function(){
	$(this).addClass("selected").siblings().removeClass("selected"); 
	 });
	
$("#mutualfnd" ).focus(function() {
	
$(this).css( "z-index", "1" );
$("#selectscheme").css( "z-index", "0" );
});

$("#dateofInvestment").datepicker({
		 format: "dd/mm/yyyy",
        todayHighlight: true,
        todayBtn: true
    });
	
	$(".datepicker-icon2").on("click", function () {
	       
	      $(this).closest(".input-group").find("input").trigger("focus");
    });
	
	

 $( "#selectscheme" ).focus(function() {
	$( this ).css( "z-index", "1" );
       });

$( "#investmd" ).focus(function() {
$("#mutualfnd").css( "z-index", "0" );
$("#selectscheme").css( "z-index", "0" );
});

	
	// $("[data-toggle=\"tooltip\"]").tooltip();

   /* $("#idBdate").datepicker({
        format: "dd/mm/yyyy",
        todayHighlight: true,
        todayBtn: true
    });
    $(".datepicker-icon").on("click", function () {
	       
	      $(this).closest(".input-group").find("input").trigger("focus");
    });
   */

	
(function($, window, document, undefined) {
	'use strict';

	var jRange1 = function() {
		return this.init.apply(this, arguments);
	};
	jRange1.prototype = {
		defaults: {
			onstatechange: function() {},
      ondragend: function() {},
      onbarclicked: function() {},
			isRange: false,
			showLabels: true,
			showScale: true,
			step: 1,
			format: '%s',
			theme: 'theme-green',
			width: 300,
			disable: false,
			snap: false
		},
		template: '<div class="slider-container">\
			<div class="back-bar">\
                <div class="selected-bar">\
				<div class="orange-highlight"></div>\
			   <div class="green-highlight"></div>\
			   <div class="blue-highlight"></div>\
			   <div class="purple-highlight"></div>\
			   <div class="red-highlight"></div>\
			 </div>\
                <div class="pointer low"></div><div class="pointer-label low">123456</div>\
                <div class="pointer high"></div><div class="pointer-label high">456789</div>\
                <div class="clickable-dummy"></div>\
            </div>\
            <div class="scale"></div>\
		</div>',
		init: function(node, options) {
			this.options       = $.extend({}, this.defaults, options);
			this.inputNode     = $(node);
			this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + ',' + this.options.from : '' + this.options.from);
			this.domNode       = $(this.template);
			this.domNode.addClass(this.options.theme);
			this.inputNode.after(this.domNode);
			this.domNode.on('change', this.onChange);
			this.pointers      = $('.pointer', this.domNode);
			this.lowPointer    = this.pointers.first();
			this.highPointer   = this.pointers.last();
			this.labels        = $('.pointer-label', this.domNode);
			this.lowLabel      = this.labels.first();
			this.highLabel     = this.labels.last();
			this.scale         = $('.scale', this.domNode);
			this.bar           = $('.selected-bar', this.domNode);
			this.clickableBar  = this.domNode.find('.clickable-dummy');
			this.interval      = this.options.to - this.options.from;
			this.render();
		},
		render: function() {
			// Check if inputNode is visible, and have some width, so that we can set slider width accordingly.
			if (this.inputNode.width() === 0 && !this.options.width) {
				console.log('jRange1 : no width found, returning');
				return;
			} else {
				this.options.width = this.options.width || this.inputNode.width();
				this.domNode.width(this.options.width);
				this.inputNode.hide();
			}

			if (this.isSingle()) {
				this.lowPointer.hide();
				this.lowLabel.hide();
			}
			if (!this.options.showLabels) {
				this.labels.hide();
			}
			this.attachEvents();
			if (this.options.showScale) {
				this.renderScale();
			}
			this.setValue(this.options.value);
			},
		isSingle: function() {
			if (typeof(this.options.value) === 'number') {
				return true;
			}
			return (this.options.value.indexOf(',') !== -1 || this.options.isRange) ?
				false : true;
		},
		attachEvents: function() {
			this.clickableBar.click($.proxy(this.barClicked, this));
			this.pointers.on('mousedown touchstart', $.proxy(this.onDragStart, this));
			this.pointers.bind('dragstart', function(event) {
				event.preventDefault();
			});
		},
		onDragStart: function(e) {
			if ( this.options.disable || (e.type === 'mousedown' && e.which !== 1)) {
				return;
			}
			e.stopPropagation();
			e.preventDefault();
			var pointer = $(e.target);
			this.pointers.removeClass('last-active');
			pointer.addClass('focused last-active');
			this[(pointer.hasClass('low') ? 'low' : 'high') + 'Label'].addClass('focused');
			$(document).on('mousemove.slider touchmove.slider', $.proxy(this.onDrag, this, pointer));
			$(document).on('mouseup.slider touchend.slider touchcancel.slider', $.proxy(this.onDragEnd, this));
		},
		onDrag: function(pointer, e) {
			e.stopPropagation();
			e.preventDefault();

			if (e.originalEvent.touches && e.originalEvent.touches.length) {
				e = e.originalEvent.touches[0];
			} else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
				e = e.originalEvent.changedTouches[0];
			}

			var position = e.clientX - this.domNode.offset().left;
			this.domNode.trigger('change', [this, pointer, position]);
		},
		onDragEnd: function(e) {
			this.pointers.removeClass('focused')
				.trigger('rangeslideend');
			this.labels.removeClass('focused');
			$(document).off('.slider');
		  this.options.ondragend.call(this, this.options.value);
		},
		barClicked: function(e) {
			if(this.options.disable) return;
			var x = e.pageX - this.clickableBar.offset().left;
			if (this.isSingle())
				this.setPosition(this.pointers.last(), x, true, true);
			else {
				var firstLeft      	= Math.abs(parseFloat(this.pointers.first().css('left'), 10)),
						firstHalfWidth 	= this.pointers.first().width() / 2,
						lastLeft 			 	= Math.abs(parseFloat(this.pointers.last().css('left'), 10)),
						lastHalfWidth  	= this.pointers.first().width() / 2,
						leftSide        = Math.abs(firstLeft - x + firstHalfWidth),
						rightSide       = Math.abs(lastLeft - x + lastHalfWidth),
						pointer;

				if(leftSide == rightSide) {
					pointer = x < firstLeft ? this.pointers.first() : this.pointers.last();
				} else {
					pointer = leftSide < rightSide ? this.pointers.first() : this.pointers.last();
				}
				this.setPosition(pointer, x, true, true);
			}
			this.options.onbarclicked.call(this, this.options.value);
		},
		onChange: function(e, self, pointer, position) {
			var min, max;
			min = 0;
			max = self.domNode.width();

			if (!self.isSingle()) {
				min = pointer.hasClass('high') ? parseFloat(self.lowPointer.css("left")) + (self.lowPointer.width() / 2) : 0;
				max = pointer.hasClass('low') ? parseFloat(self.highPointer.css("left")) + (self.highPointer.width() / 2) : self.domNode.width();
			}

			var value = Math.min(Math.max(position, min), max);
			self.setPosition(pointer, value, true);
		},
		setPosition: function(pointer, position, isPx, animate) {
			var leftPos, rightPos,
				lowPos = parseFloat(this.lowPointer.css("left")),
				highPos = parseFloat(this.highPointer.css("left")) || 0,
				circleWidth = this.highPointer.width() / 2;
			if (!isPx) {
				position = this.prcToPx(position);
			}
			if(this.options.snap){
				var expPos = this.correctPositionForSnap(position);
				if(expPos === -1){
					return;
				}else{
					position = expPos;
				}
			}
			if (pointer[0] === this.highPointer[0]) {
				highPos = Math.round(position - circleWidth);
			} else {
				lowPos = Math.round(position - circleWidth);
			}
			pointer[animate ? 'animate' : 'css']({
				'left': Math.round(position - circleWidth)
			});
			if (this.isSingle()) {
				leftPos = 0;
			} else {
				leftPos = lowPos + circleWidth;
				rightPos = highPos + circleWidth;
			}
			var w = Math.round(highPos + circleWidth - leftPos);
			this.bar[animate ? 'animate' : 'css']({
				'width': Math.abs(w),
				'left': (w>0) ? leftPos : leftPos + w
			});
			this.showPointerValue(pointer, position, animate);
			this.isReadonly();
		},
		correctPositionForSnap: function(position){
			var currentValue = this.positionToValue(position) - this.options.from;
			var diff = this.options.width / (this.interval / this.options.step),
				expectedPosition = (currentValue / this.options.step) * diff;
			if( position <= expectedPosition + diff / 2 && position >= expectedPosition - diff / 2){
				return expectedPosition;
			}else{
				return -1;
			}
		},
		// will be called from outside
		setValue: function(value) {
			var values = value.toString().split(',');
			values[0] = Math.min(Math.max(values[0], this.options.from), this.options.to) + '';
			if (values.length > 1){
				values[1] = Math.min(Math.max(values[1], this.options.from), this.options.to) + '';
			}
			this.options.value = value;
			var prc = this.valuesToPrc(values.length === 2 ? values : [0, values[0]]);
			if (this.isSingle()) {
				this.setPosition(this.highPointer, prc[1]);
			} else {
				this.setPosition(this.lowPointer, prc[0]);
				this.setPosition(this.highPointer, prc[1]);
			}
		},
		renderScale: function() {
			var s = this.options.scale || [this.options.from, this.options.to];
			var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
			var str = '';
			for (var i = 0; i < s.length; i++) {
				str += '<span style="left: ' + i * prc + '%">' + (s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '') + '</span>';
			}
			this.scale.html(str);

			$('ins', this.scale).each(function() {
				$(this).css({
					marginLeft: -$(this).outerWidth() / 2
				});
			});
		},
		getBarWidth: function() {
			var values = this.options.value.split(',');
			if (values.length > 1) {
				return parseFloat(values[1]) - parseFloat(values[0]);
			} else {
				return parseFloat(values[0]);
			}
		},
		showPointerValue: function(pointer, position, animate) {
			var label = $('.pointer-label', this.domNode)[pointer.hasClass('low') ? 'first' : 'last']();
			var text;
			var value = this.positionToValue(position);
			// Is it higer or lower than it should be?

			if ($.isFunction(this.options.format)) {
				var type = this.isSingle() ? undefined : (pointer.hasClass('low') ? 'low' : 'high');
				text = this.options.format(value, type);
			} else {
				text = this.options.format.replace('%s', value);
			}

			var width = label.html(text).width(),
				left = position - width / 2;
			left = Math.min(Math.max(left, 0), this.options.width - width);
			label[animate ? 'animate' : 'css']({
				left: left
			});
			this.setInputValue(pointer, value);
		},
		valuesToPrc: function(values) {
			var lowPrc = ((parseFloat(values[0]) - parseFloat(this.options.from)) * 100 / this.interval),
				highPrc = ((parseFloat(values[1]) - parseFloat(this.options.from)) * 100 / this.interval);
			return [lowPrc, highPrc];
		},
		prcToPx: function(prc) {
			return (this.domNode.width() * prc) / 100;
		},
		isDecimal: function() {
			return ((this.options.value + this.options.from + this.options.to).indexOf(".")===-1) ? false : true;
		},
		positionToValue: function(pos) {
			var value = (pos / this.domNode.width()) * this.interval;
			value = parseFloat(value, 10) + parseFloat(this.options.from, 10);
			if (this.isDecimal()) {
				var final = Math.round(Math.round(value / this.options.step) * this.options.step *100)/100;
				if (final!==0.0) {
					final = '' + final;
					if (final.indexOf(".")===-1) {
						final = final + ".";
					}
					while (final.length - final.indexOf('.')<3) {
						final = final + "0";
					}
				} else {
					final = "0.00";
				}
				return final;
			} else {
				return Math.round(value / this.options.step) * this.options.step;
			}
		},
		setInputValue: function(pointer, v) {
			// if(!isChanged) return;
			if (this.isSingle()) {
				this.options.value = v.toString();
			} else {
				var values = this.options.value.split(',');
				if (pointer.hasClass('low')) {
					this.options.value = v + ',' + values[1];
				} else {
					this.options.value = values[0] + ',' + v;
				}
			}
			if (this.inputNode.val() !== this.options.value) {
				this.inputNode.val(this.options.value)
					.trigger('change');
				this.options.onstatechange.call(this, this.options.value);
			}
		},
		getValue: function() {
			return this.options.value;
		},
		getOptions: function() {
			return this.options;
		},
		getRange: function() {
			return this.options.from + "," + this.options.to;
		},
		isReadonly: function(){
			this.domNode.toggleClass('slider-readonly', this.options.disable);
		},
		disable: function(){
			this.options.disable = true;
			this.isReadonly();
		},
		enable: function(){
			this.options.disable = false;
			this.isReadonly();
		},
		toggleDisable: function(){
			this.options.disable = !this.options.disable;
			this.isReadonly();
		},
		updateRange: function(range, value) {
			var values = range.toString().split(',');
			this.interval = parseInt(values[1]) - parseInt(values[0]);
			if(value){
				this.setValue(value);
			}else{
				this.setValue(this.getValue());
			}
		}
	};

	var pluginName = 'jRange1';
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(option) {
		var args = arguments,
			result;

		this.each(function() {
			var $this = $(this),
				data = $.data(this, 'plugin_' + pluginName),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('plugin_' + pluginName, (data = new jRange1(this, options)));
				$(window).resize(function() {
					data.setValue(data.getValue());
				}); // Update slider position when window is resized to keep it in sync with scale
			}
			// if first argument is a string, call silimarly named function
			// this gives flexibility to call functions of the plugin e.g.
			//   - $('.dial').plugin('destroy');
			//   - $('.dial').plugin('render', $('.new-child'));
			if (typeof option === 'string') {
				result = data[option].apply(data, Array.prototype.slice.call(args, 1));
			}
		});

		// To enable plugin returns values
		return result || this;
	};

})(jQuery, window, document);


function showHide(orange,green,blue,purple,red,width,color){
	
	if(orange){
		$(".orange-highlight").show();
		if(color=='orange')
			$(".orange-highlight").css("width",width+"px");
		else
			$(".orange-highlight").css("width","60px");
	}
	else{
		 $(".orange-highlight").hide();
		 $(".orange-highlight").css("width","0px");
	}
	if(green){
		$(".green-highlight").show();
		if(color=='green')
			$(".green-highlight").css("width",width+"px");
		else
		 $(".green-highlight").css("width","60px");
	}
	else{
		 $(".green-highlight").css("width","0px");
		 $(".green-highlight").hide();
	}
	if(blue){
		$(".blue-highlight").show();
		if(color=='blue')
			 $(".blue-highlight").css("width",width+"px");
		else
	    $(".blue-highlight").css("width","60px");
	}
	else{
		 $(".blue-highlight").css("width","0px");
		 $(".blue-highlight").hide();
	}
	if(purple){
		$(".purple-highlight").show();
		if(color=='purple')
			 $(".purple-highlight").css("width",width+"px");
		else
	    $(".purple-highlight").css("width","60px");
	}
	else{
		 $(".purple-highlight").css("width","0px");
		 $(".purple-highlight").hide();
	}
	if(red){
		$(".red-highlight").show();
		if(color=='red')
			 $(".red-highlight").css("width",width+"px");
		else
	    $(".red-highlight").css("width","60px");
	}
	else{
		 $(".red-highlight").css("width","0px");
		 $(".red-highlight").hide();
	}	
}

		
	$(document).ready(function(){
		
	 $("#data tr").click(function(){
	  $(this).addClass("selected").siblings().removeClass("selected"); 
	 });
        
		 $('.simple-slider').jRange1({
                from: 100000,
                to:600000,
                step: 10000,
                scale: ["100,000","200,000","300,000","400,000","500,000","600,000"],
               
                width: 300,
                showLabels: false
            });
			
			$( ".simple-slider" ).change(function() {
			
             var rangesValues = $( ".simple-slider" ).val(); 
             $("#currentvalue").val(rangesValues) ;
			 var stripe_width = rangesValues;
			
             $(".stripe").css("width", ""+stripe_width+"%");
			 var stripewidth = $(".stripe").width();
			 
						 	  
		if(rangesValues == 100000){
			showHide(false,false,false,false,false,0,'');
	     }
			  
		else if(rangesValues > 100000 && rangesValues <= 200000) {
			var width=(rangesValues-100000)/100000*60;	
			showHide(true,false,false,false,false,width,'orange'); 
		}
		else if(rangesValues > 200000 && rangesValues <= 300000){
				 var width=(rangesValues-200000)/100000*60;			 
				showHide(true,true,false,false,false,width,'green'); 
		}
				
		else if(rangesValues > 300000 && rangesValues <= 400000){
					
			 var width=(rangesValues-300000)/100000*60;			 
				
			showHide(true,true,true,false,false,width,'blue'); 
		 }
				
				else if(rangesValues > 400000 && rangesValues <= 500000){
						
				 var width=(rangesValues-400000)/100000*60;			 
				showHide(true,true,true,true,false,width,'purple'); 

						
	
					
			
		        }
          else if((rangesValues > 500000 && rangesValues <= 600000)  && !(rangesValues < 500000))
		  
		  {
				 
									 var width=(rangesValues-500000)/100000*60;			 	
		                            showHide(true,true,true,true,true,width,'red'); 
			      
		        }

				} );



	
		
         });
		


   
	
});

Highcharts.chart('idcaa1', {
       chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
	},
	legend: {
		
        verticalAlign: 'middle',
        align: 'right',
		layout: 'vertical'
		
	},
    title: {
        text: ''
	},
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
    plotOptions: {
        pie: {
		size:150,
            allowPointSelect: true,
            cursor: 'pointer',
           // colors: pieColors,
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.1f} %',
                distance: -15,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
				}
			},
			showInLegend: true
		}
	},
    series: [{
        name: 'Amount',
		 innerSize: '50%',
        data: [
            { name: 'Total Amount Invested', y: 20, color: '#95ceff' },
            { name: 'Total Returns as on Date', y: 10.25, color:'#f7a35c' },
           
			
		]
	}]
});

   Highcharts.chart('stdgraph', {
		title: {
			text: '<b>Portfolio Value As on Date</b>'
		},
		xAxis: {
			categories: ['Apr-16','Jun-16','Aug-16','Oct-16','Dec-16','Feb-17','Apr-17','Jun-17','Aug-17','Oct-17','Dec-17','Feb-18','Apr-18','Jun-18','Aug-18','Oct-18','Dec-18','Feb-19','Apr-19','Jun-19','Aug-19','Oct-19','Dec-19','Feb-20','Apr-20','Jun-20','Aug-20','Oct-20','Dec-20','Feb-21','Apr-21','Jun-21','Aug-21','Oct-21','Dec-21','Feb-22','Apr-22','Jun-22','Aug-22','Oct-22','Dec-22','Feb-23','Apr-23','Jun-23','Aug-23','Oct-23','Dec-23','Feb-24','Apr-24','Jun-24','Aug-24','Oct-24','Dec-24','Feb-25','Apr-25','Jun-25','Aug-25','Oct-25','Dec-25']
		},
		tooltip: {
			headerFormat: '<b>{series.name}</b><br />',
		},
		series: [{
			name:"Portfolio Value",
			color:'#58ACFA',
			data:[500000,510000,520000,530000,540000,550000,560000,570000,580000,590000,600000,610000,620000,630000,640000,650000,660000,670000,680000,690000,700000,710000,720000,730000,740000,750000,760000,770000,780000,790000,800000,810000,820000,830000,840000,850000,860000,870000,880000,890000,900000,910000,920000,930000,940000,950000,960000,970000,980000,990000,1000000,1010000,1020000,1030000,1040000,1050000,1060000,1070000,1080000]
		}]
	});