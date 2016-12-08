console.log(window.location.origin);
$(document).ready(function() {
	$('.col-single-article').click(function() {
		var articleID = $(event.target).attr('data-obj-id');
		console.log(articleID);
		window.location = (window.location.origin + '/detail?articleID=' + articleID);
	});

	$('.btn-save-note').click(function() {
		var articleIDArray = window.location.href.split('=');
		console.log(articleIDArray);
		var data = {
			username: $('#username').val().trim(),
			q1: $('#q1').text().trim(),
			a1: $('#sympathy').val().trim(),
			q2: $('#q2').text().trim(),
			a2: $('#antipathy').val().trim(),
			q3: $('#q3').text().trim(),
			a3: $('#examples').val().trim(),
			articleID: articleIDArray[1]
		}
		data = $.param(data);
		window.location = window.location.origin + '/submit?' + data;
		console.log(window.location);
	});
	$('.btn-show-notes').click(function() {
		var articleIDArray = window.location.href.split('=');
		console.log(articleIDArray);
		articleIDArray.reverse();
		var data = {
			articleID: articleIDArray[0],
			showNotes: true
		}
		data = $.params(data);
		window.location = (window.location.origin + '/shownotes?' + data);
	});

});

