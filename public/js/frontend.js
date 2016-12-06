console.log(window.location.origin);
$(document).ready(function() {
	$('.col-single-article').click(function() {
		var articleID = $(event.target).attr('data-obj-id');
		console.log(articleID);
		window.location = (window.location.origin + '/detail?articleID=' + articleID);
	});

	$('.btn-save-note').click(function() {
		var articleIDArray = window.location.pathname.split('=');

		var data:{
			username: $('#username').val().trim(),
			q1: $('#q1').text().trim(),
			q2: $('#q2').text().trim(),
			q3: $('#q3').text().trim(),
			a1: $('#sympathy').val().trim(),
			a2: $('#antipathy').val().trim(),
			a3: $('#examples').val().trim(),
			articleID: articleIDArray[1];
		}
		data = $.param(data);
		$.post(window.location.origin + '/submit?' + data, function(err, data) {

		});
	});
});

