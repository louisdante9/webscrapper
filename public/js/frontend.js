console.log(window.location.origin);
$(document).ready(function() {
	$('.col-single-article').click(function() {
		var objID = $(event.target).attr('data-obj-id');
		console.log(objID);
		window.location = (window.location.origin + '/detail?objID=' + objID);
	});
});