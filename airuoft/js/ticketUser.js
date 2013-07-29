function checkValid() {
	$(function(){
		var expField = $("#expiry")[0];
		var expVal = expField.value;
		if (!(expVal.length === 4)) {
			expField.setCustomValidity("Expiry date must be in MMYY format");
		} else {
			var month = expVal.substring(0, 2);
			var year = expVal.substring(2, 4);
			if (!((typeof parseInt(month)) == 'number' && (typeof parseInt(year)) == 'number')){
				expField.setCustomValidity("invalid month/year");
				return false
			}
			if (month > 0 && month < 13){
				year = parseInt(year) + 2000;
				expDate = new Date(year, month, 0);
				today = new Date();
				if (expDate >= today) {	
					expField.setCustomValidity(""); // all is well, clear error message
					return true;
				} else {
					expField.setCustomValidity("Card has expired");
					return false
				}
			} else {
				expField.setCustomValidity("invalid month");
				return false
			}
		} else{
			expField.setCustomValidity("Need to be 4 digits: MMYY");
			return false
		}
	});
}
function checkfirstName(){
	var field = $("#first")[0];
	var fieldValue = field.value;
	if (typeof fieldValue == 'string' && fieldValue.length < 17){
		field.setCustomValidity("");
		return false;
	} else{
		field.setCustomValidity("First Name can only contain letters");
		return true
	}
}
function checklastName(){
	var field = $("#last")[0];
	var fieldValue = field.value;
	if (typeof fieldValue == 'string' && fieldValue.length < 17){
		field.setCustomValidity("");
		return false;
	} else{
		field.setCustomValidity("Last Name can only contain letters");
		return true
	}
}
function checkNum(){
	var field = $("#creditcardnumber")[0];
	var fieldValue = field.value;
	if (typeof parseInt(fieldValue) == 'number' && fieldValue.length === 16 ){
		field.setCustomValidity("");
		return false;
	} else {
		field.setCustomValidity("Credit Card Number needs to contain 16 digits");
		return true
	}
}