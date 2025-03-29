import { menuArray } from './data.js'

const saleItems = document.getElementById('container')

document.addEventListener('click', e => {
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    if(e.target.id === 'complete-order-btn'){
        handleCompleteClick()
    }
})

let shoppingBasketArr = []

function handleAddClick(id) {
    const targetItemObj = menuArray.find(item => item.id === Number(id))
    
    if (shoppingBasketArr.length <= 2 && !shoppingBasketArr.includes(targetItemObj)) {
        shoppingBasketArr.push(targetItemObj)
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

    console.log(totalCost)
    return Math.round(totalCost * 100) / 100

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
                <h4 class="total-item-price">${itemsTotal(shoppingBasketArr)}</h4>
            </div>

            <button class="complete-order-btn" id="complete-order-btn" aria-label="Complete order">
                <h4>Complete Order<h4>
            </button>

        </div>
    </div>
    `
})

function render(main, basket) {
    main = saleItemsGenerator(menuArray)
    basket = shoppingBasketArr.length > 0 ? basketItemGenerator() : ''
    saleItems.innerHTML = (main + basket)
}

render()