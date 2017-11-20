// globally set the rating variable
let rating = 0;


// on page load call materialize functions && get dynamic inventory
$('.parallax').parallax();
$(".button-collapse").sideNav();


$.get('/api/road', function(data) {
	createCards(data, "road");
});


// change rating value based off of Star clicks
$('#roadInventory').on('click', '.material-icons', function() {
	let star = $(this).data('star');
	
	switch (star) {
		case 'r_star1':
			$('.rating1').html('star');
			$('.rating2').html('star_border');
			$('.rating3').html('star_border');
			$('.rating4').html('star_border');
			$('.rating5').html('star_border');
			rating = 1;
			break;

		case 'r_star2':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star_border');
			$('.rating4').html('star_border');
			$('.rating5').html('star_border');
			rating = 2;
			break;

		case 'r_star3':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star');
			$('.rating4').html('star_border');
			$('.rating5').html('star_border');
			rating = 3;
			break;

		case 'r_star4':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star');
			$('.rating4').html('star');
			$('.rating5').html('star_border');
			rating = 4;
			break;

		case 'r_star5':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star');
			$('.rating4').html('star');
			$('.rating5').html('star');
			rating = 5;
			break;
	}
})

// submit rating for bicycle
$('#roadInventory').on('click', '#roadSubmitRating', function() {

	let _id = $(this).attr('data-id');

	$.ajax({
		url: `/api/road/${rating}/${_id}`,
		type: 'PUT'
	})
	.done(function(data) {
		window.location = '/road';		
	})
})





