
// let product1 = {
//     img: "",
//     title: "",
//     price: 0,
//     description: ""
// }
// let product2 = {
//     img: "",
//     title: "",
//     price: 0,
//     description: ""
// }
// let product3 = {
//     img: "",
//     title: "",
//     price: 0,
//     description: ""
// }
// let product4 = {
//     img: "",
//     title: "",
//     price: 0,
//     description: ""
// }
// let product5 = {
//     img: "",
//     title: "",
//     price: 0,
//     description: ""
// }


// let massive = [];
// massive.push(product1, product2, product3, product4);

// let card_cont = document.getElementById(`cards`);
// let cards = card_cont.getElementsByClassName(`card`);

// for (let i = 0; i < massive.length; i++) {
//     const product = massive[i];
//     const card = cards[i];
//     product.img = card.querySelector('.card__img').src;
//     product.title = card.querySelector('.card__title').innerText;
//     product.price = card.querySelector('.card__price').innerText;
//     product.description = card.querySelector('.card__description').innerText;
// }
// console.log(massive);


// POP UP WINDOW 
let btn  = document.querySelector('h1');
let closi  = document.querySelector(".popup-window__close");
let windowPopUp = document.querySelector('.popup-window');
btn.onclick = function(){
    windowPopUp.style.display ="block";
    container.style.filter = "blur(5px)";
    
}
closi.onclick = function(){
    windowPopUp.style.display ="none";
    container.style.filter = "blur(0px)";

}


// MAKE A CART

let cartLink = document.querySelector(".cartItems");
let cart = document.querySelector(".cart");
let cartContainer = document.querySelector('.cart__container');
let counterIndicator = document.querySelector('[data-counterIndicator]');
let ProdCount = 0;
let closeCart = document.querySelector(".cart__close");

// Open the cart
cartLink.addEventListener ("click", ()=>{
    cart.classList.toggle('open');
    document.body.classList.toggle('active');
})

// Close the cart
closeCart.addEventListener ("click", ()=>{
    cart.classList.remove('open');
    document.body.classList.remove('active');
})

document.addEventListener("click", (e)=>{
    
    if (e.target.hasAttribute('data-addCartBtn')){
        let currentCard = e.target.closest('.card');

        let product = {
            articul: currentCard.dataset.articul,
            title: currentCard.querySelector('.card__title').innerText,
            price: currentCard.querySelector('.card__price').innerText,
            count: 1,
            img: currentCard.querySelector('.card__img>img').src
        }

        localStorage.setItem('product', JSON.stringify(product));

        let curentProductInCart = cartContainer.querySelector(`[data-articul="${product.articul}"]`);
        if(curentProductInCart){
            let dataCounter = curentProductInCart.querySelector('[data-counter]');
            dataCounter.value = parseInt(dataCounter.value)+product.count;
            

        }
        else {
            let productInCartHTML = 
    `<div class="cart__product" data-articul="${product.articul}">
        <div class="cart__product-remove">
            Видалити
        </div>
        <div class="cart__prroduct-photo">
            <img src="${product.img}" alt="Item" width="130" height="150">
        </div>
        <div class="cart__product-info">
            <div class="cart__product-title">
                ${product.title}
            </div>
            <div class="cart__product-price">
                ${product.price}
            </div>
            <div class="cart__product-actions">
                <button data-action="minus">-</button>
                <input type="text" name="" value="${product.count}" data-counter>
                <button data-action="plus">+</button>
            </div>
            <div class="cart__product-summary">
            
            </div>
        </div>
    </div>`;

cartContainer.insertAdjacentHTML('beforeend', productInCartHTML);

        }

    }

    /*Меняем количество товаров в корзине*/
    if(e.target.closest('.cart__product')){
        let cardCounter = e.target.closest('.cart__product').querySelector('[data-counter]');
        /*Если нажали на минус*/
        if(e.target.dataset.action==='minus'){
       /*Если товаров больше 1*/
       if(cardCounter.value>1){
        cardCounter.value = --cardCounter.value;
       

       }
        /*Если товаров меньше*/
       else{
        cardCounter.closest('.cart__product').remove();
        
       }
       }
        /*Если нажали на плюс*/
        if(e.target.dataset.action==='plus'){
         cardCounter.value = ++cardCounter.value;
       
        }
        if(e.target.classList.contains('cart__product-remove')){
        e.target.closest('.cart__product').remove();
        }
        
     
    }

    let cartItem = cartContainer.querySelector('.cart__product');
    let cartMessage = cartContainer.querySelector('.cart__message');
    let cartTitle = cartContainer.querySelector('.cart__title');
    let cartBottom = cartContainer.querySelector('.cart__bottom');
    if(cartItem){
        

        cartMessage.classList.add('WithProduct');
        cartTitle.classList.add('WithProduct');
        cartBottom.classList.add('WithProduct');
    }
    else {
        cartMessage.classList.remove('WithProduct');
        cartTitle.classList.remove('WithProduct');
        cartBottom.classList.remove('WithProduct');
    }
        calcAndPrintSumCart();
        inputCountChange();
        countChange();
    cartContainer.addEventListener('click', (e)=>{
        let removeButton = e.target.closest('.cart__product-remove');
        
        if (removeButton){
            removeButton.closest('.cart__product').remove();

        }
        
    });


    


    })

    function calcAndPrintSumCart(){
        const totalPriceContainer = document.querySelector('.cart__summary');
        const itemInCard = document.querySelectorAll('.cart__product');
        let totalCartSum = 0;
        
        itemInCard.forEach(function(card){
            const thisCardCount = card.querySelector('[data-counter]');
            const thisCardPrice = card.querySelector('.cart__product-price');
            const thisCardSummary = card.querySelector('.cart__product-summary');
            const thisCardSum   = parseFloat(thisCardCount.value)* parseFloat(thisCardPrice.innerText);
            thisCardSummary.innerText = thisCardSum + ' грн.';
            totalCartSum = totalCartSum+thisCardSum;
        });
        totalPriceContainer.innerText = 'До сплати ' + totalCartSum + ' грн.';
        
    }
    function inputCountChange(){
        const allCounterInput = document.querySelectorAll('[data-counter]');
        allCounterInput.forEach(function(input){
        input.oninput = function(){
        if(parseInt(input.value)<0){
            input.value= 0; 
        }
        else if(input.value=='-'){
            input.value= 0;        }
        }
        
        })
};
function countChange(){
    let countInCart = 0;
    let allCard = document.querySelectorAll('.cart__product');
    allCard.forEach(function(e){
        let thisCounter = e.querySelector('[data-counter]');
        countInCart = countInCart + parseInt(thisCounter.value);
    });
    console.log('Total count in cart:', countInCart);
    counterIndicator.innerText = countInCart > 0 ? countInCart : "";
}



