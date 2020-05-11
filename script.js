//stuff to do next - create a loop back in that generates a new array of objects based on the changed DOM stuff


// DATA OBJECT


// An array object of sweets

let sweets = [
	{
		type: 'Rhubarb & Custard',
		gWeight: 2.5,
		gCost: 0.01,
		count: 9
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
		count: 13
	},
	{
		type: 'Everton Mints',
		gWeight: 3.0,
		gCost: 0.04,
		count: 2
	},
	{
		type: 'Fruit BonBons',
		gWeight: 2.0,
		gCost: 0.02,
		count: 5
	}

];


// print sweets as ul items

function printSweets ( array ) {


    var list = document.createElement('ul');

	for (let i = 0; i < array.length; i++) {

        // Create the list item:
        let item = document.createElement('li');
        
		// Create input item:
        let input = document.createElement("INPUT");
        input.setAttribute("type", "number");
        input.setAttribute("id", "count");
        input.setAttribute("value", array[i].count);

        // Set contents:
        item.appendChild(document.createTextNode(`Sweet: ${array[i].type}`));  //add the full output of what you want to see as HTML with the object values in https://www.w3schools.com/js/js_htmldom_nodes.aspere

        // Add it to the list:
        item.appendChild(input); //Add input field to list item
        list.appendChild(item); //Add list item to UL
    }

    // Finally, return the constructed list:
    return list;
}

// Add the contents of options[0] to #foo:
document.getElementById('sweets').appendChild(printSweets(sweets));




// DOM ELEMENTS -----------------------------------------------------

// want to get the cost and weight based on the changes in the dom, so the formulas might be on a new data object thats returned from the DOM? could spread into an array

// probably a function that loops to create new array? push items to array?

//---Trying to create an array of the counts 

let domItemContainer = document.getElementsByTagName('input');  //brings back the li into the dom
let countArray = [ ...domItemContainer]; // adds the dom to an array


console.log(countArray);


console.log(countArray[5].value * sweets[5].gCost);


// SWEET CALCULATOR -------------------------------------------------

// Variables to capture totals 

let sweetOrder;



//Loop through and add up all the total costs to the costAllSweets variable
function allSweetsCost () {
	let costAllSweets = 0;
	 for (var i = 0; i < sweets.length; i++){
		let each = countArray[i].value * sweets[i].gCost;
		costAllSweets += each;
	}
	console.log(`The total is cost ${costAllSweets}`);

};

//Loops through to total weight of order

let weightAllSweets = 0;

function allSweetsWeight () {
  for (var i = 0; i < sweets.length; i++){
  let each = countArray[i].value * sweets[i].gWeight;
  weightAllSweets += each;
  }
  console.log(`The total weight is ${weightAllSweets}`);
  if ( weightAllSweets < 40 ) {
  console.log(`You need to add more to your order`)
}
 	

    // Calc postage cost based on weight


	function postageCost ( cost ) {
		if (cost > 40 && cost <= 250) {
			console.log(`the price is 150`);
		  } else if ( cost > 250 && cost <= 500 ){
		  	console.log(`the price is 200`);
		  } else if ( cost > 500) {
		  	console.log(`the price is 250`);
		  } else {
		  	console.log(`You need to add more to your order`);
		  }
	};
	postageCost(weightAllSweets);

};

allSweetsWeight();


//

// UI CONTROLLER


















