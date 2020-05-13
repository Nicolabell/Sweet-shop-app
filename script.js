// ********** ONLINE SWEET SHOP PROJECT ********** //

// DATA OBJECTS -----------------------------------------------------


// An array object of sweets

let sweets = [
  {
  	type: 'Rhubarb & Custard',
	gWeight: 2.5,
	gCost: 0.01,
	count: 0,
	img: 'https://www.permaculture.org.uk/sites/default/files/sweets-image.jpg'
  },
  {
  	type: 'Kola Kubes',
	gWeight: 2.0,
	gCost: 0.02,
	count: 0,
	img: 'https://www.permaculture.org.uk/sites/default/files/sweets-image.jpg'	
  },
  {
  	type: 'Pear Drops',
	gWeight: 1.0,
	gCost: 0.01,
	count: 0,
	img: 'https://www.permaculture.org.uk/sites/default/files/sweets-image.jpg'
  },
  {
  	type: 'Chocolate Limes',
	gWeight: 3.0,
	gCost: 0.03,
	count: 0,
	img: 'https://www.permaculture.org.uk/sites/default/files/sweets-image.jpg'
  },
  {
  	type: 'Aniseed Twists',
  	gWeight: 2.7,
	gCost: 0.03,
	count: 0,
	img: 'https://www.permaculture.org.uk/sites/default/files/sweets-image.jpg'
  },
  {
  	type: 'Everton Mints',
  	gWeight: 3.0,
	gCost: 0.04,
	count: 0,
	img: 'https://www.permaculture.org.uk/sites/default/files/sweets-image.jpg'
  },
  {
	type: 'Fruit BonBons',
	gWeight: 2.0,
	gCost: 0.02,
	count: 0,
	img: 'https://www.permaculture.org.uk/sites/default/files/sweets-image.jpg'
  }

];



// DOM ELEMENTS -----------------------------------------------------


// Print sweets as ul items to the DOM
const mq = window.matchMedia( "(min-width: 1500px)" );



function printSweets(array) {
	var list = document.createElement('ul');
	list.classList.add("sweetie");

	for(let i = 0; i < array.length; i++) {

    // Create the list item:
       let item = document.createElement('li');
  

	// Create input item:
       let input = document.createElement("INPUT");
       input.setAttribute("type", "number");
       input.setAttribute("id", "count");
       input.setAttribute("value", array[i].count);
       input.classList.add("usercount");

    // Create image for item:
        let img = document.createElement('img'); 
        img.src = `${array[i].img}`
        img.classList.add("sweetImg");

    // Set contents:
       item.appendChild(img);
       if(mq.matches) {
        item.appendChild(document.createElement('br'));
         }
       item.appendChild(document.createTextNode(` ${array[i].type} `)); 
        if(mq.matches) {
        item.appendChild(document.createElement('br'));
         }
       item.appendChild(input); //Add input field to list item
      
    // Add it to the list:
       list.appendChild(item); //Add list item to UL
   }

    // Return the constructed list:
    return list;
}

// Add the contents of sweets data as options in the list:
document.getElementById('sweets').appendChild(printSweets(sweets));




// Get the input fields that have been changed in the DOM and create an array:

// 1. Selects all the user data from the DOM:
let domItemContainer = document.getElementsByClassName('usercount'); 
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
let eachWeight = 0;
let eachCost = 0;
let costAllSweets = 0;


//Loop through and add up all the total costs to the costAllSweets variable
function allSweetsCost() {
	 for(var i = 0; i < sweets.length; i++) {
	 	console.log(parseInt(costAllSweets));
	 	eachWeight = countArray[i].value * sweets[i].gWeight;
		eachCost = parseFloat(eachWeight) * sweets[i].gCost;
		costAllSweets += parseFloat(eachCost);
	}
	return(costAllSweets);
	console.log(`The total sweets cost ${costAllSweets}`);
	console.log(parseFloat(costAllSweets));
};



//Loops through to total weight of order
		
function allSweetsWeight() {
	for(var i = 0; i < sweets.length; i++) {
		let each = countArray[i].value * sweets[i].gWeight;
		weightAllSweets += each;
	 }
		console.log(`The total order weight is ${weightAllSweets}`);
		if(weightAllSweets < 40) {
		message.innerHTML =`<p>Min order weight = 40g. Current weight = ${weightAllSweets}g;  <b>Please add more sweets!</b></p>`;

		return weightAllSweets;
	}
 	

// Calc postage cost based on weight
function postageCost(cost) {
  	if(cost > 40 && cost <= 250) { 
		 postage = 1.50;
		 message.innerHTML =`<p>Sweets: <b>£${costAllSweets}</b>  p&p:  <b>£${postage}</b></p>`;
		} else if(cost > 250 && cost <= 500){
		  postage = 2.00;
          message.innerHTML =`<p>Sweets: <b>£${costAllSweets}</b>  p&p:  <b>£${postage}</b></p>`
      } else if(cost > 500) {
      	postage = 2.50;
      	message.innerHTML =`<p>Sweets: <b>£${costAllSweets}</b>  p&p:  <b>£${postage}</b></p>`
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
     if(weightAllSweets > 40) {
     message.innerHTML +=`<p>Total + p&p: <b>£${totalCost}</p></b>`; //parseflat fixed this
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
let messageToLoved;

confirm.addEventListener('click', function (event) {
	if(gift.checked == true) {
	  messageToLoved = prompt("Add a message to your loved one");
    } else {
	  alert("You've ordered this stuff!");
    };

    if(messageToLoved !== null) {
    alert("You've ordered this stuff!");
    }

});


// When reset button is clicked everything is cleared

reset.addEventListener('click', function (event) {
	weightAllSweets = 0;
	postage = 0;
	costAllSweets = 0;
	gift.checked = false;
	message.innerHTML = "<p><b>Have another go</b> - add sweets and use preview to calculate!</p>";
	
	for(var i = 0; i < sweets.length; i++) {
		countArray[i].value = 0;
	}

});















