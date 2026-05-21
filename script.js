// Object to hold items added to the cart
let orderCart = {};
let totalAmount = 0;

// Function to handle clicking "Add to order"
function addToOrder(itemName, price, inputId) {
    const qtyInput = document.getElementById(inputId);
    const quantity = parseInt(qtyInput.value);

    // Validate that input is a valid positive number
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    // If item already exists in cart, update quantity, otherwise add new
    if (orderCart[itemName]) {
        orderCart[itemName].quantity += quantity;
    } else {
        orderCart[itemName] = {
            price: price,
            quantity: quantity
        };
    }

    // Reset input box back to empty
    qtyInput.value = "";

    // Refresh UI updates
    updateOrderDOM();
}

// Function to update the Right Panel display and Recalculate Total
function updateOrderDOM() {
    const orderListContainer = document.getElementById("order-list");
    orderListContainer.innerHTML = ""; 
    totalAmount = 0;

    // Loop through everything currently inside the cart object
    for (let item in orderCart) {
        const itemTotal = orderCart[item].price * orderCart[item].quantity;
        totalAmount += itemTotal;

        // Create a card box for the item in the list
        const listItem = document.createElement("div");
        listItem.className = "border rounded p-3 mb-2 d-flex justify-content-between align-items-center bg-light";
        listItem.innerHTML = `
            <h4 class="m-0">${item}</h4>
            <span class="text-success fw-bold">Qty: ${orderCart[item].quantity}</span>
        `;
        orderListContainer.appendChild(listItem);
    }

    document.getElementById("total-price").innerText = totalAmount;
}

// Function to process payment logic and throw alerts
function processPayment() {
    const cashInput = document.getElementById("cash-tendered");
    const cashAmount = parseFloat(cashInput.value);

    if (totalAmount === 0) {
        alert("Your cart is empty. Please add items to your order first.");
        return;
    }

    if (isNaN(cashAmount) || cashAmount < 0) {
        alert("Please enter a valid amount of cash.");
        return;
    }

    // CHECK FOR THE ERROR SHOWN 
    if (cashAmount < totalAmount) {
        alert("Not enough balance. Please try again.");
        return;
    }

    // Success state
    const change = cashAmount - totalAmount;
    alert(`Payment Successful!\nTotal: ${totalAmount} PHP\nCash Paid: ${cashAmount} PHP\nChange: ${change} PHP`);
    
    // Clear state for next customer
    orderCart = {};
    cashInput.value = "";
    updateOrderDOM();
}