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


let activeCodes = [
  {
    code: "SWEETS10",
    percent: 10
  },
  {
    code: "SWEETS20",
    percent: 20
  },
  {
    code: "20in2020",
    percent: 20
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
       input.setAttribute("label", array[i].type);
       input.classList.add("usercount");

    // Create image for item:
       let img = document.createElement('img'); 
       img.src = `${array[i].img}`
       img.alt = `Picture of ${array[i].type}`;
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

// Discount code box:

const discount = document.getElementById('discount');




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
		if(weightAllSweets < 40) {
		message.textContent =`Min order weight = 40g. Current weight = ${weightAllSweets.toFixed(2)}g; Please add more sweets!`;

		return weightAllSweets;
	}
 	

// Calc postage cost based on weight
function postageCost(cost) {
  	if(cost > 40 && cost <= 250) { 
		 postage = 1.50;
		 message.textContent =`Sweets: £${costAllSweets.toFixed(2)}.....p&p: £${postage}`;
		} else if(cost > 250 && cost <= 500){
		  postage = 2.00;
          message.textContent =`Sweets: £${costAllSweets.toFixed(2)}.....p&p:£${postage}`
      } else if(cost > 500) {
      	postage = 2.50;
      	message.textContent =`Sweets: £${costAllSweets.toFixed(2)}.....p&p: £${postage}`
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
     message.textContent +=`.....Total + p&p: £${totalCost.toFixed(2)}`; //parseflote fixed this
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

  for(var i = 0; i < sweetsOrdered.length; i++) {
   // update sweet count
   let newCount = parseFloat(countArray[i].value);
   sweetsOrdered[i].count = newCount;
   // if order is greater than 0 display to user
   if(sweetsOrdered[i].count > 0) {
    let sweetObj = {};
    sweetObj["Sweet"] = sweetsOrdered[i].type;
    sweetObj["Qty"] = sweetsOrdered[i].count;
    orderDetails.push(sweetObj);
   };
 
  };


};

// Discount code function

function discountCode() {
  let discounted = 0;
  let discountTrue = false;

activeCodes.forEach((item) => {
  console.log(item.code);
   if(discount.value === item.code) {
    discountTrue = true;
    discounted = (totalCost/100) * item.percent;
    totalCost = totalCost - discounted;
    message.textContent +=`.....Total with ${item.percent}% discount: £${totalCost.toFixed(2)}`;
    return;
  };
    
});

if (discountTrue) {
  console.log("Discount code applied");
    return;
  } else if(discount.value === "add code here") {
    return;
  } else {
    alert("Sorry - that was not a valid discount code");
    discount.value = "add code here";
  }
  
};



// UI CONTROLLER



//When preview button is clicked the calculation is made

preview.addEventListener('click', function (event) {
	orderDetails = [];
  weightAllSweets = 0;
	postage = 0;
	costAllSweets = 0;
	allSweetsCost();
	allSweetsWeight();
	costALL();
  discountCode()
	orderList();

});



// When confirm order is clicked - an alert to confirm, etc
let messageToLoved;

confirm.addEventListener('click', function (event) {
  orderDetails = [];
  weightAllSweets = 0;
  postage = 0;
  costAllSweets = 0;
  allSweetsCost();
  allSweetsWeight();
  costALL();
  discountCode()
  orderList();
  orderDetails.push({totalCost});



  if(weightAllSweets < 40) {
    alert("You need to order more than 40g of sweets before completing your order.");
   } else {
    if(gift.checked === true) {
	   messageToLoved = prompt("Add a message to your loved one");
     orderDetails.push(messageToLoved);
    }
   alert(`You are ordering ${JSON.stringify(orderDetails, null, 4)}`);
   //Code to submit order data + message data will go here post proof of concept

 }
 

});


// When reset button is clicked everything is cleared

reset.addEventListener('click', function (event) {
	orderDetails = [];
  weightAllSweets = 0;
	postage = 0;
	costAllSweets = 0;
	gift.checked = false;
	message.textContent = "Have another go - add sweets and use preview to calculate!";
	
	for(var i = 0; i < sweets.length; i++) {
		countArray[i].value = 0;
	}

});















