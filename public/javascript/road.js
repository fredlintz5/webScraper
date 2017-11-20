// globally variables
let rating = 0;
let card;

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


// setting the card value here allows me to dynamically re-open the card 
// so the user can see the newly updated rating after submitting
$('#roadInventory').on('click', '.activator', function() {
	card = $(this).attr('id');
})


// submit rating for bicycle
$('#roadInventory').on('click', '#roadSubmitRating', function() {

	let _id = $(this).attr('data-id');

	$.ajax({
		url: `/api/road/${rating}/${_id}`,
		type: 'PUT'
	})
	.done(function() {

		Materialize.toast('Rating Submitted!', 3500);

		// reload the page with newly submitted ratings, and open card
		// so user can see newly calculated rating
		$.get('/api/road', function(data) {
			createCards(data, 'road');
			$(`#${card}`).click();
		});	
	})	
})




