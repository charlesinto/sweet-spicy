window.onload = () => {
    setUpView();
}
let setUpView = () => {
    goToShop();
    loadCart();
}
let goToShop = () => {
    Array.from(document.getElementsByClassName('go-to-shop')).forEach(btn => {
        btn.addEventListener('click',(e)=> {
            e.stopPropagation();
            window.location.href = window.origin;
        })
    })
    Array.from(document.getElementsByClassName('check')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            bookOrder();
        })
    })

}
let bookOrder = () => {
    let status = -1
    if(localStorage.getItem('token')){
        blockUi();
        let request = JSON.parse(localStorage.getItem('cart'))
        let items = {request};
        fetch('/api/v1/orders',{
            method: 'POST',
            headers: {
                'content-type':'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                items: request,
                token: localStorage.getItem('token')
            })
            
            }
        )
        .then(res =>{status = res.status;  return res.json()} )
        .then(res => {
            if(status === 201){
                unBlockUI();
                alert('Order successfully Posted')
            }
        })
        .catch(err => console.log(err))    
    }else{
        alert('please log in')
    }
}
let empytCart = () => {
    Array.from(document.getElementsByClassName('empty-cart')).forEach(item => {
        item.style.display = "flex"
    })
    Array.from(document.getElementsByClassName('order-summary')).forEach(item => {
        item.className = 'hide-summary'

    })
    resetFormOnCartEmpty();
}
let loadCart = () => {
    window.cart = JSON.parse(localStorage.getItem("cart"));
    if(!cart){
        empytCart()
        

    }
    else if( cart.length > 0){

        
        let totalQuanity = 0;
        let totalAmount = 0;
        cart.forEach(item => {
            let orderItem = document.createElement('div');
            orderItem.className = "order-item"
            orderItem.id = item.itemid;
            let itemName = document.createElement('div');
            itemName.className = "item-name item"
            itemName.innerText = item.itemname;
            orderItem.appendChild(itemName);
            let range = document.createElement('div');
            range.className = "range"
            let arrow1 = document.createElement('div')
            arrow1.className = "back-arrow arrow";
            arrow1.appendChild(document.createTextNode('\u3008'));
            range.appendChild(arrow1);
            let orderQuantity = document.createElement('div');
            orderQuantity.className = "item-quantity"
            let itemQuantity = document.createElement('input');
            itemQuantity.name = "order-quantity"
            itemQuantity.value = item.quantity;
            itemQuantity.type ="number";
            itemQuantity.min = 1;
            orderQuantity.appendChild(itemQuantity);
            range.appendChild(orderQuantity);
            let arrow2 = document.createElement('div')
            arrow2.className = "front-arrow arrow";
            arrow2.appendChild(document.createTextNode('\u3009'));
            range.appendChild(arrow2);
            orderItem.appendChild(range);
            let itemAmount = document.createElement('div');
            itemAmount.className = "item-amount item";
            let span1 = document.createElement('span')
            span1.id = "amount-symbol"
            span1.innerText = "\u20A6";
            let span2 = document.createElement('span')
            span2.className = "price";
            span2.innerText = item.quantity * item.unit_price;
            itemAmount.appendChild(span1);
            itemAmount.appendChild(span2);
            orderItem.appendChild(itemAmount);
            let removeBtn = document.createElement('div');
            removeBtn.className = "remove-item";
            let btn = document.createElement('button');
            btn.innerText = "x";
            removeBtn.appendChild(btn);
            orderItem.appendChild(removeBtn);

            document.getElementsByClassName('orders')[0].appendChild(orderItem);
            totalQuanity += parseInt(item.quantity);
            totalAmount += parseInt(item.quantity * item.unit_price);
        })
        loadData() 
        userFucntions();
    }else{
        empytCart();
    }
}
let userFucntions = () => {
    removeItem();
    increaseQuantity();
    decreaseQuantity();
}
let decreaseQuantity = () => {
    Array.from(document.getElementsByClassName('front-arrow')).forEach(btn => {
        btn.addEventListener('click',(e)=>{
            e.stopPropagation();
            let input = e.target.parentNode.parentNode.children[1].children[1].children[0]
            console.log(e)
            let id = parseInt(e.target.parentNode.parentNode.id)
            let currentValue = parseInt(input.value);
            if(currentValue > 0){
                input.value = currentValue - 1;
                updateAmountOrdered(e,currentValue, currentValue -1)
                updateItemCount(currentValue,parseInt(input.value))
            }
            updateCart(id,"SUBTRACT")
            
        })
    })
}
let updateAmountOrdered = (e,currentValue, nextValue) => {
    e.target.parentNode.parentNode.children[2].innerText = `\u20A6` + (parseInt(e.target.parentNode.parentNode.children[2].innerText.substr(1)) / currentValue) * nextValue
}
let increaseQuantity = () => {
    Array.from(document.getElementsByClassName('back-arrow')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let currentValue = 0;
            let itemid = parseInt(e.target.parentNode.parentNode.id);
            Array.from(e.target.nextSibling.children).forEach(input => {
                let currentValue =parseInt(input.value)
                input.value = currentValue + 1
                updateAmountOrdered(e,currentValue, currentValue + 1);
                updateItemCount(currentValue, parseInt(input.value) )
            })
            updateCart(itemid, "ADD")
        })
    })
}
let updateItemCount = (currentValue, nextValue) => {
    let value = document.getElementById('totalQuantity').innerText
    document.getElementById('totalQuantity').innerText = value - currentValue + nextValue
}
let updateCart = (id, action) => {
    switch(action){
        case 'ADD':
            cart.forEach(item => {
                if(item.itemid == id){
                    item.quantity++;
                }
            })
            break;
        case 'SUBTRACT':
            cart.forEach(item => {
                if(item.itemid == id){
                    if(item.quantity > 0){
                        item.quantity--
                    }
                }
            })
            break;
        default:

    }
    localStorage.setItem('cart',JSON.stringify(cart));
    loadData();
}

let resetFormOnCartEmpty = () => {
    document.getElementById('check-btn').className = 'remove-btn'
    document.getElementById('checkout').className = 'checkout-items resetCart-area'
    document.getElementById('shortInfo').className = 'remove-info'
    document.getElementsByClassName('orders')[0].style.display = "none";
}

let removeItem = () => {
    Array.from(document.getElementsByClassName('remove-item')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentNode.parentNode.id;
            e.target.parentNode.parentNode.style.display = "none";
            rebuildData(id)
        })
    })
}

let rebuildData = (id) => {
    let index = 0;
    for(i = 0; i < cart.length ; i++){
        index = i;
        if(cart[i].itemid === parseInt(id)){
            break;
        }
    }
    localStorage.removeItem('cart');
    cart.splice(index, 1);
    localStorage.setItem('cart',JSON.stringify(cart));
    if(cart.length == 0){
        empytCart();
    }
    loadData();
}

let loadData = () => {
    console.log('rebuild data')
   let totalQuanity = 0;
   let totalAmount = 0;
   cart.forEach(item => {
       totalQuanity += parseInt(item.quantity);
       totalAmount += parseInt(item.unit_price * item.quantity);
   })
   document.getElementById('totalQuantity').innerText = totalQuanity;
    Array.from(document.getElementsByClassName('check')).forEach(btn => {
        btn.innerText = `Checkout \u20A6  ${totalAmount}`
    })
    Array.from(document.getElementsByClassName('totalAmount')).forEach(span => {
        span.innerText = ` ${totalAmount}`
    })
}