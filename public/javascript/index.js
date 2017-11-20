// on page load call materialize functions
$('.parallax').parallax();
$(".button-collapse").sideNav();
$('select').material_select();


// these functions will be used on all bicycle category pages
function createCards(data, category) {

	$('.dataResults').html(`<strong>${data.length} Results<strong>`);
	$(`#${category}Inventory`).empty();

	data.forEach((item, index) => {
		let avgRating = 'Null';
		let users = '0';

		if (item.rating.length !== 0) {
			users = item.rating.length;
			avgRating = calculateRating(item.rating);
		} else {
			users = '0';
			avgRating = 'Null';
		}

		let bikeCard = 
			`<div class="col s12 m6 l4">
			  <div class="card">
			    <div class="card-image">
			      <img class="activator" id="${category + index}" src="${item.image}">			      
			      <a href="https://www.trekbikes.com${item.link}" target="_blank" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">shopping_cart</i></a>
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
			      	<button class="btn center waves-effect waves-light teal lighten-1" data-id="${item._id}" id="${category}SubmitRating">Submit Rating</button>
			     </div>
			    </div>
			  </div>
			</div> `
	$(`#${category}Inventory`).append(bikeCard);
	})
}


// these functions will be used on all category pages
function calculateRating(array) {
	let total = 0;
	array.forEach((number) => {
		total += number;
	})
	let average = total/array.length;
	return average.toFixed(1);
}


function inventorySort(argument, category) {

	$.ajax({
		url: `/api/${category}/${argument}`,
		type: 'GET',
	})
	.done(function(data) {
		createCards(data, category);
	})
}






