import data from './data.js'

const itemsContainer = document.getElementById('items')


// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
    // create a new div element and give it a class name
    const newDiv = document.createElement('div');
    newDiv.className = 'item'
    // create an image element
    const img = document.createElement('img');
    // this will change each time we go through the loop
    img.src = data[i].image
    img.width = 300
    img.height = 300
    // Add the image to the div
    newDiv.appendChild(img)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)
    // create a paragraph element for a description
    const desc = document.createElement('P')
    // give the paragraph text from the data
    desc.innerText = data[i].desc
    // append the paragraph to the div
    newDiv.appendChild(desc)
    // do the same thing for price
    const price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)
    // Make a button 
    const button = document.createElement('button')
    // add an  id name to the button
    button.id = data[i].name
    // creates a custom attribute called data-price. That will hold price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
}


const itemList = document.getElementById('item-list')
const itemList2 = document.getElementById('item-list2')
const itemList3 = document.getElementById('item-list3')

const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')

const form = document.getElementById('myForm');
const log = document.getElementById('log');

const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))

  var today = new Date();

  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  var dateTime = date+' '+time;

const cart = []

// handle clicks on list
itemList2.onclick = function(e) {
    // console.log("clicked list!")
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name
        removeItem(name)
    } else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        addItem(name)
    } else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name
        removeItem(name, 1)

    }
}

// add item
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems()
            return
        }
    }

    const item = { name, price, qty: 1 }
    cart.push(item)
}

// show items
function showItems() {
    const qty = getQty()
    // console.log(`You have ${qty} items in your cart`)
    cartQty.innerHTML = `Total Items: ${qty}`


    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        // console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        const {name, price, qty} = cart[i]
        itemStr += ` ${name} $${price} x ${qty} = $${(qty * price)}   `
    }
    itemList.innerHTML = itemStr
    
    itemList3.innerHTML = `$${getTotal()}`

    log.innerHTML = dateTime

    let itemStr2 = ''
    for (let i = 0; i < cart.length; i += 1) {
        
        const {name, price, qty} = cart[i]
        itemStr2 += `
        <div class="row">
            <div class="col-6" style=""><li> ${name} $${price} x ${qty} = ${(qty * price).toFixed(2)}
                </div>
                <div class="col-6">
                <div class="btn-group" role="group">
                <button class="add-one btn-success  btn-sm" style="margin: 0 5px 0 5px; padding: 0 10px 0 10px;" data-name="${name}">+</button>
                <button class="remove-one btn-danger  btn-sm" style="margin: 0 5px 0 5px; padding: 0 10px 0 10px;" data-name="${name}">-</button>
                <button class="remove  btn-sm" style="margin: 0 5px 0 5px; padding: 0 3px 0 3px;"  data-name="${name}">X</button>
                </div>
                <br>
                </div>
        </div>    
        </li><br>`
    }
    itemList2.innerHTML = itemStr2

    
    cartTotal.innerHTML = `Total Amount: <h3 style="padding-top: 15px;">$${getTotal()}</h3>`
}

function logSubmit(event) {
    log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    event.preventDefault();
}
form.addEventListener('submit', logSubmit);



// get qty
function getQty() {
    let qty = 0
    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
    }
    return qty
}

// get total
function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }

    return total.toFixed(2)
}

// remove item
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            showItems()
            return
        }
    }
}
