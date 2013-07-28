$(function() {
	$("#datepicker").datepicker({ minDate: +1, maxDate: "+14D" });
	$.datepicker.setDefaults( {dateFormat: "yy-mm-dd"});
});