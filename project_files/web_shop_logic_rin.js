const data = {
    store: {
        flag: {
            price: 50,
            stock: 5,
            bought: 0, //literally just to see if the item was bought before, for checking for bonuses
        },
        clover: {
            price: 75,
            stock: 8,
            bought: 0,
        },
        star: {
            price: 65,
            stock: 6,
            bought: 0,
        },
        boot: {
            price: 100,
            stock: 6,
            bought: 0,
        },
    },
    cart: {
        flag: {
            number: 0,
            calcPrice: 0 //calc for calculated
        },
        clover: {
            number: 0,
            calcPrice: 0
        },
        star: {
            number: 0,
            calcPrice: 0
        },
        boot: {
            number: 0,
            calcPrice: 0
        },
        finalPrice: {
            number: 0,
        },
    },
    money: {
        number: 14265, //shiny rocks are the money
    },
};

document.addEventListener("DOMContentLoaded", loaded); //unlike window.onload this thing reads HTML first and only then loads all the additional stuff.

function loaded() {
    console.log(data.store.flag.bought)
    document.getElementById("money").innerHTML = data.money.number; //money. goes back because it's inside this function
    document.getElementById("flag-price").innerHTML = "Price: " + data.store.flag.price; // bro it took me whole day to realise that I needed constData for this nah
    document.getElementById("flag-stock").innerHTML = "Stock: " + data.store.flag.stock;
    if (data.store.flag.stock === 0) {
        document.getElementById("flag-stock").innerHTML = "Out of Stock";
    }
    document.getElementById("clover-price").innerHTML = "Price: " + data.store.clover.price;
    document.getElementById("clover-stock").innerHTML = "Stock: " + data.store.clover.stock;
    if (data.store.clover.stock === 0) {
        document.getElementById("clover-stock").innerHTML = "Out of Stock";
    }
    document.getElementById("star-price").innerHTML = "Price: " + data.store.star.price;
    document.getElementById("star-stock").innerHTML = "Stock: " + data.store.star.stock;
    if (data.store.star.stock === 0) {
        document.getElementById("star-stock").innerHTML = "Out of Stock";
    }
    document.getElementById("boot-price").innerHTML = "Price: " + data.store.boot.price;
    document.getElementById("boot-stock").innerHTML = "Stock: " + data.store.boot.stock;
    if (data.store.boot.stock === 0) {
        document.getElementById("boot-stock").innerHTML = "Out of Stock";
    }
    console.log("Loaded");
}

//buy products functions below
function buyProduct1() {
    if (data.store.flag.stock > 0) {
    data.store.flag.stock -= 1;
    data.cart.flag.number += 1;
    data.cart.flag.calcPrice = data.cart.flag.number*data.store.flag.price; // multiplying function
        data.store.flag.bought = 1; // changes from 0 to 1 whereas in database it's 0. when you can see if it === 1
    }
    cart();
    cartText1();
    loaded();
    buyOnclick();
}

function buyProduct2() {
    if (data.store.clover.stock > 0) {
        data.store.clover.stock -= 1;
        data.cart.clover.number += 1;
        data.cart.clover.calcPrice = data.cart.clover.number*data.store.clover.price; // multiplying function
        data.store.clover.bought = 1;
    }
    cart();
    cartText2();
    loaded();
    buyOnclick();
}

function buyProduct3() {
    if (data.store.star.stock > 0) {
        data.store.star.stock -= 1;
        data.cart.star.number += 1;
        data.cart.star.calcPrice = data.cart.star.number*data.store.star.price; // multiplying function
        data.store.star.bought = 1;
    }
    cart();
    cartText3();
    loaded();
    buyOnclick();

}

function buyProduct4() {
    if (data.store.boot.stock > 0) {
        data.store.boot.stock -= 1;
        data.cart.boot.number += 1;
        data.cart.boot.calcPrice = data.cart.boot.number*data.store.boot.price; // multiplying function
        data.store.boot.bought = 1;
    }
    cart();
    cartText4();
    loaded();
    buyOnclick();

}

// cart functions below
function cart() {

 data.cart.finalPrice.number = data.cart.flag.calcPrice+data.cart.clover.calcPrice+data.cart.star.calcPrice+data.cart.boot.calcPrice; // calculating the real final price
    document.getElementById("total-price").innerHTML = data.cart.finalPrice.number + " ShinyStones";
    console.log("Updated cart");
}

//separating them so text shows up not at the same time
function cartText1(){
    document.getElementById("cart-text").innerHTML = data.cart.flag.number + " Flags. ShinyStones*" + data.store.flag.price + " = " +  data.cart.flag.calcPrice + " ShinyStones";
}
function cartText2() {
    document.getElementById("cart-text2").innerHTML = data.cart.clover.number + " Patches. ShinyStones*" + data.store.clover.price + " = " +  data.cart.clover.calcPrice + " ShinyStones";
}
function cartText3() {
    document.getElementById("cart-text3").innerHTML = data.cart.star.number + " Awards. ShinyStones*" + data.store.star.price + " = " +  data.cart.star.calcPrice + " ShinyStones";
}
function cartText4() {
    document.getElementById("cart-text4").innerHTML = data.cart.boot.number + " Boots. ShinyStones*" + data.store.boot.price + " = " +  data.cart.boot.calcPrice + " ShinyStones";
}


//button for purchase. purchase onclick
function purchase(){
    //take the money
    data.money.number -= data.cart.finalPrice.number;
    document.getElementById("money").innerHTML = data.money.number;

    //if al 4 were bought, show pop up div
    const popUp =document.getElementById("pop-up");
    if((data.store.flag.bought === 1)&&(data.store.boot.bought === 1)&&(data.store.star.bought === 1)&&(data.store.clover.bought === 1)){
        if(popUp.style.display === "none" || popUp.style.display === ""){
            popUp.style.display = "block";
        }
    }

    //clearing the cart
    data.cart.finalPrice.number = 0;
    for(let product in data.cart){
        data.cart[product].number = 0;
    }
    document.getElementById("total-price").innerHTML = "ShinyStones"
    document.getElementById("cart-text").innerHTML = "";
    document.getElementById("cart-text2").innerHTML = "";
    document.getElementById("cart-text3").innerHTML = "";
    document.getElementById("cart-text4").innerHTML = "";
    showItem1();
}


//function that show the purchase button only after buy button is clicked. buyProduct onclick extra feature within.
function buyOnclick() {
    //this code to show divs. add else{display = none} so they will disappear again.
    const purchaseButton = document.getElementById("purchase-button"); //the const, don't forget it, it's basically a new variable
    if (purchaseButton.style.display === "none" || purchaseButton.style.display === "") {
        purchaseButton.style.display = "block"; //doesn't work if without the === "" thing above
    }
}

//okay button makes pop up div disappear
function okayButton(){
    const popUp =document.getElementById("pop-up");
    if(popUp.style.display === "block"){
        popUp.style.display = "none";
    }

    //code below makes the button for pond visible, after clicking purchase button
    const headerButton = document.getElementById("header-button");
    /*the const, don't forget it, it's basically a new variable*/
    if(headerButton.style.display === "none" || headerButton.style.display === ""){
        headerButton.style.display = "block";
    }
}


