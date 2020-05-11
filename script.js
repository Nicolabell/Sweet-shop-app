// ********** ONLINE SWEET SHOP PROJECT ********** //

// DATA OBJECTS -----------------------------------------------------


// An array object of sweets

let sweets = [
  {
  	type: 'Rhubarb & Custard',
	gWeight: 2.5,
	gCost: 0.01,
	count: 0
  },
  {
  	type: 'Kola Kubes',
	gWeight: 2.0,
	gCost: 0.02,
	count: 0	
  },
  {
  	type: 'Pear Drops',
	gWeight: 1.0,
	gCost: 0.01,
	count: 0
  },
  {
  	type: 'Chocolate Limes',
	gWeight: 3.0,
	gCost: 0.03,
	count: 0
  },
  {
  	type: 'Aniseed Twists',
  	gWeight: 2.7,
	gCost: 0.03,
	count: 0
  },
  {
  	type: 'Everton Mints',
  	gWeight: 3.0,
	gCost: 0.04,
	count: 0
  },
  {
	type: 'Fruit BonBons',
	gWeight: 2.0,
	gCost: 0.02,
	count: 0
  }

];



// DOM ELEMENTS -----------------------------------------------------


// Print sweets as ul items to the DOM

function printSweets(array) {
	var list = document.createElement('ul');

	for(let i = 0; i < array.length; i++) {

    // Create the list item:
       let item = document.createElement('li');
       item.classList.add("sweetie");

	// Create input item:
       let input = document.createElement("INPUT");
       input.setAttribute("type", "number");
       input.setAttribute("id", "count");
       input.setAttribute("value", array[i].count);

     // Set contents:
       item.appendChild(document.createTextNode(`${array[i].type}`));  

     // Add it to the list:
       item.appendChild(input); //Add input field to list item
       list.appendChild(item); //Add list item to UL
   }

    // Return the constructed list:
    return list;
}

// Add the contents of sweets data as options in the list:
document.getElementById('sweets').appendChild(printSweets(sweets));




// Get the input fields that have been changed in the DOM and create an array:

// 1. Selects all the user data from the DOM:
let domItemContainer = document.getElementsByTagName('input'); 
//  2. adds the users sweet count input to an array of counts
let countArray = [ ...domItemContainer]; 


// Buttons:

const preview = document.getElementById('prev');
const confirm = document.getElementById('confirm');
const reset = document.getElementById('reset');

// Message area:

let message = document.getElementById('message');

// Gift order checkbox:

const gift = document.getElementById('gift');




// SWEET CALCULATOR -------------------------------------------------
let weightAllSweets = 0;
let postage = 0;
let costAllSweets = 0;

//Loop through and add up all the total costs to the costAllSweets variable
function allSweetsCost() {
	 for(var i = 0; i < sweets.length; i++) {
		let each = countArray[i].value * sweets[i].gCost;
		costAllSweets += each; 
	}
	console.log(`The total sweets cost ${costAllSweets}`);
	message.innerText = `The total sweets cost ${costAllSweets}`;
};



//Loops through to total weight of order
		
function allSweetsWeight() {
	for(var i = 0; i < sweets.length; i++) {
		let each = countArray[i].value * sweets[i].gWeight;
		weightAllSweets += each;
	 }
		console.log(`The total order weight is ${weightAllSweets}`);
		if(weightAllSweets < 40) {
		message.innerHTML +=`<p>The minimum weight per order is 40g. Your order is currently ${weightAllSweets}g; please add more to your order</p>`;

		return weightAllSweets;
	}
 	

// Calc postage cost based on weight
function postageCost(cost) {
  	if(cost > 40 && cost <= 250) { 
		 postage = 1.50;
		 message.innerHTML +=`<p>The postage price is £${postage}</p>`;
		} else if(cost > 250 && cost <= 500){
		  postage = 2.00;
          message.innerHTML +=`<p>The postage price is £${postage}</p>`
      } else if(cost > 500) {
      	postage = 2.50;
      	message.innerHTML +=`<p>The postage price is £${postage}</p>`
      }
      else {
      	return;
      }

      return postage;

	};

	postageCost(weightAllSweets);

};

	// Calc postage plus sweets
	
function costALL() {
	totalCost = parseFloat(postage, 16) + parseFloat(costAllSweets, 10);
     if(totalCost > 0) {
     message.innerHTML +=`<p>The cost of order plus post and packaging is £${totalCost}</p>`; //parseflat fixed this
   } else {
 	   return
     }
  };


// Store order details:
//A new array is created to store the order details
//A copy of the sweets data is made


let orderDetails = [];
let sweetsOrdered = [...sweets];


//The copy of the sweets data is updated with the amounts entered via the DOM

function orderList() {

  for(var i = 0; i < sweetsOrdered.length; i++){
   // update sweet count
   let newCount = parseFloat(countArray[i].value);
   sweetsOrdered[i].count = newCount;
   // if order is greater than 0 display to user
   if(sweetsOrdered[i].count > 0) {
   	console.table(sweetsOrdered[i].type, sweetsOrdered[i].count);
   };
 
  };


};





// UI CONTROLLER



//When preview button is clicked the calculation is made

preview.addEventListener('click', function (event) {
	weightAllSweets = 0;
	postage = 0;
	costAllSweets = 0;
	allSweetsCost();
	allSweetsWeight();
	costALL();
	orderList();

});



// When confirm order is clicked - an alert to confirm, etc

confirm.addEventListener('click', function (event) {
	alert("You've ordered this stuff!");

});


// When reset button is clicked everything is cleared

reset.addEventListener('click', function (event) {
	weightAllSweets = 0;
	postage = 0;
	costAllSweets = 0;
	gift.checked = false;
	message.innerHTML = "<p>Use the calculator to add sweets to the order and calculate button to preview the price</p>";
	
	for(var i = 0; i < sweets.length; i++) {
		countArray[i].value = 0;
	}


});















