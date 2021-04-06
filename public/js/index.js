const order = document.getElementById('order');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const buttonPurchase = document.getElementById('button1');
const buttonUpdate = document.getElementById('button2');
const buttonDelete = document.getElementById('button3');


const purchaseFunction = () => {
    const cost = Number(quantity.value) * Number(price.textContent);
        fetch('/api/v1/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cost: cost,
            })
        })
        .then((res) => res.json())
        .then(
            order.textContent = `You spent ${cost}`
        );

}


buttonPurchase.addEventListener('click', purchaseFunction);

const updateFunction = () => {
    const cost = Number(quantity.value) * Number(price.textContent);
        fetch('/api/v1/items/3', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: '3',  
              cost: cost,
            })
        })
        .then((res) => res.json())
        .then(
            order.textContent = `You changed how much you spent to ${cost}`
        );


}


buttonUpdate.addEventListener('click', updateFunction);

const deleteFunction = () => {
    
        fetch('/api/v1/items/4', {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then(
            order.textContent = `You saved money by cancelling your order!`
        );
}


buttonDelete.addEventListener('click', deleteFunction);

