$('.hidden_file_input').hide();
$('.logo_toggle .btn-off').click(function(){

	$('.hidden_file_input').trigger('click');
});

$(".hidden_file_input").change(function(){
     var filename = $(".hidden_file_input").val();
	$('.filename').text(filename);
  });


$('.header_toggle .btn-off').click(function(){

	$('.cust_headers').show();
});


$('.header_toggle .btn-on').click(function(){

	$('.cust_headers').hide();
});



$('.footer_toggle .btn-off').click(function(){

	$('.cust_footers').show();
});


$('.footer_toggle .btn-on').click(function(){

	$('.cust_footers').hide();
});


$('.header').click(function(){
	$(this).find('.header_format span').hide();
	$(this).find('.header_input').show().focus();
})

$('.header2').click(function(){
	$(this).find('.header_format span').hide();
	$(this).find('.header_input1').show().focus();
})

$('.cust_footers .header3').click(function(){
	$(this).find('.header_format span').hide();
	$(this).find('.h_input1').show().focus();
})




$('.dis_toggle .btn-off').click(function(){

	$('.disclaimer_inputs').show();
});


$('.dis_toggle .btn-on').click(function(){

	$('.disclaimer_inputs').hide();
});