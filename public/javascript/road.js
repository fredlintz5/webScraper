
function createCards(data) {
	data.forEach((item) => {
		let users = item.rating.length;
		let avgRating = calculateRating(item.rating);
		let bikeCard = 
			`<div class="col s12 m4 l3">
			  <div class="card">
			    <div class="card-image">
			      <img class="activator" src="${item.image}">			      
			      <a href="https://www.trekbikes.com${item.link}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">shopping_cart</i></a>
			    </div>
			    <div class="card-content white-text teal lighten-2">
			      <p>${item.text}</p>
			      <p>${item.price}</p>
			    </div>
			    <div class="card-reveal">
			      <span class="card-title grey-text text-darken-4">
			      	<i class="material-icons right">close</i>
			      </span>
			      <br>
			      <br>
			      <div class="center">
				      <h5>Rated: ${avgRating} stars</h5>
				      <p> by ${users} customer(s)</p>
			      </div>
			      <div class="center stars">
						<span><i class="material-icons rating1" data-star="r_star1">star_border</i></span>
						<span><i class="material-icons rating2" data-star="r_star2">star_border</i></span>
						<span><i class="material-icons rating3" data-star="r_star3">star_border</i></span>
						<span><i class="material-icons rating4" data-star="r_star4">star_border</i></span>
						<span><i class="material-icons rating5" data-star="r_star5">star_border</i></span>
			      </div>
			      <br>
			      <div class="center">
			      	<button class="btn center waves-effect waves-light teal lighten-1" id="submitRating">Submit Rating</button>
			     </div>
			    </div>
			  </div>
			</div> `
	$('#roadInventory').append(bikeCard);
	})
}

function calculateRating(array) {
	let total = 0;
	array.forEach((number) => {
		total += number;
	})
	let average = total/array.length;
	return average;
}


// on page load call materialize functions && get dynamic inventory
$('.parallax').parallax();
$(".button-collapse").sideNav();

$.get('/api/road', function(data) {
	createCards(data);
});


// change rating value based off of clicks
$('#roadInventory').on('click', '.material-icons', function() {
	let star = $(this).data('star');
	
	switch (star) {
		case 'r_star1':
			$('.rating1').html('star');
			$('.rating2').html('star_border');
			$('.rating3').html('star_border');
			$('.rating4').html('star_border');
			$('.rating5').html('star_border');
			break;

		case 'r_star2':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star_border');
			$('.rating4').html('star_border');
			$('.rating5').html('star_border');
			break;

		case 'r_star3':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star');
			$('.rating4').html('star_border');
			$('.rating5').html('star_border');
			break;

		case 'r_star4':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star');
			$('.rating4').html('star');
			$('.rating5').html('star_border');
			break;

		case 'r_star5':
			$('.rating1').html('star');
			$('.rating2').html('star');
			$('.rating3').html('star');
			$('.rating4').html('star');
			$('.rating5').html('star');
			break;
	}
})




