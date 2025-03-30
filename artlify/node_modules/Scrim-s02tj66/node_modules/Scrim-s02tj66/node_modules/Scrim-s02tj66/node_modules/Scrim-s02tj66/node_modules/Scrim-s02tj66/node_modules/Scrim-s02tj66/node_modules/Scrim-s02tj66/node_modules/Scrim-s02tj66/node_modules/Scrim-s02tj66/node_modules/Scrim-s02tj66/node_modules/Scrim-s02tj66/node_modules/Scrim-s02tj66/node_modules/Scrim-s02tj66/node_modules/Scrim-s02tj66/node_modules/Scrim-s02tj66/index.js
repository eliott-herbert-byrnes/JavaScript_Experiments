import { menuArray } from './data.js'

const saleItems = document.getElementById('container')

document.addEventListener('click', e => {
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    
    const completeOrderBtn = e.target.closest('#complete-order-btn');
    if (completeOrderBtn) {
        handleCompleteClick();
    }

    if(e.target.id === 'complete-form-btn'){
        console.log(e.target.id)
        handleCompleteForm()
    }
})

let shoppingBasketArr = []

function handleAddClick(id) {
    const targetItemObj = menuArray.find(item => item.id === Number(id))
    
    if (shoppingBasketArr.length <= 2 && !shoppingBasketArr.includes(targetItemObj)) {
        shoppingBasketArr.push(targetItemObj)
    } else if (shoppingBasketArr.length > 2) {
        throw new Error('Basket is full!')
    } else {
        throw new Error('Item is already in basket!')

    }

    render()

}

function handleRemoveClick(id) {
    const index = shoppingBasketArr.findIndex(item => item.id === Number(id))

    if (index !== -1){
        shoppingBasketArr.splice(index, 1)
    }

    render()
}

function itemsTotal(shoppingBasketArr){
    const totalCost = shoppingBasketArr.reduce((acc, elm) => {
        return acc + elm.price
    }, 0)

    return Math.round(totalCost * 100) / 100

}

function generateReceipt(){
    return `    
    <div class="receipt-container" id="receipt-container">
        <h4>Thanks ${document.getElementById('fname').value}, your order is on the way!</h4>
    </div>
    `
}

function handleCompleteForm(){
    const nameInput = document.getElementById('fname');
    const name = nameInput ? nameInput.value : 'there';

    document.getElementById('form-container').classList.add('hidden');
    shoppingBasketArr = [];

    const receipt = generateReceipt(name)
    saleItems.innerHTML = receipt;
}

function generateFormMarkup(){
    return `    
    <div class="form-container hidden" id="form-container">
        <form class="form-pay">
            <div class="form-title">
                <h3>Enter Details</h3>
            </div>
            <input type="text" id="fname" placeholder="Enter your name" required>   
            <input type="number" id="fnumber" maxlength="16" placeholder="Enter your card number" required>   
            <input type="number" id="fcvv" maxlength="3" placeholder="CVV" required>   
            <input type="email" id="femail" pattern=".+@example\.com" placeholder="Enter your email" required>   
            <button class="complete-form-btn" aria-label="pay" id="complete-form-btn" type="button">
                <h4 id="complete-form-btn">Pay</h4>
            </button>
        </form>
    </div>
    `
}


function handleCompleteClick(){
    document.getElementById('form-container').classList.toggle('hidden');
}

const saleItemsGenerator = ((items) => {
    return items.map(item => {
        const { name, description, price, id } = item
        return `
        <div class="sale-item">
            <div class="sale-item-content">
                <div class="sale-image-container">
                    <img src="images/${id}.png" alt="" class="sale-image">
                </div>

                <div class="sale-text-container">
                    <div class="sale-item-desc">
                    <h3>${name}</h3>
                    <h4>${description.join(', ')}</h4>
                    <h4>$${price}</h4>
                    </div>
                </div>

                <button class="ellipse-button" aria-label="Add item" data-add="${id}">
                +
                </button>
            </div>
        </div>
        `
    })
})

function generateBasketItem(item){
        const { name, price, id } = item
        return `
        <div class="basket-items-container-ind">
            <h6> ${name} </h6>
            <h6 class="basket-item-remove" data-remove="${id}">remove</h6>
            <h6 class="basket-item-price">$${price}<h6>
        </div>
        ` 
}

const basketItemGenerator = (() => {
    return `
    <div id ="basket-hidden" class="basket-hidden">
        <div class="basket">
            <div class="basket-title">
                <h3>Basket</h3>
            </div>

            <div class="basket-items-container">
            ${shoppingBasketArr.map(generateBasketItem).join('')}

            </div>

            <hr>

            <div class="basket-total-container">
                <h4>Total</h4>
                <h4 class="total-item-price">$${itemsTotal(shoppingBasketArr)}</h4>
            </div>

            <button class="complete-order-btn" id="complete-order-btn" aria-label="Complete order">
                <h4>Complete Order</h4>
            </button>

        </div>
    </div>
    `
})

function render(main, basket, form) {
    main = saleItemsGenerator(menuArray)
    basket = shoppingBasketArr.length > 0 ? basketItemGenerator() : ''
    form = generateFormMarkup()
    saleItems.innerHTML = (main + basket + form)
}

render()