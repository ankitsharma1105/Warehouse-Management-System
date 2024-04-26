let Warehouse = JSON.parse(localStorage.getItem('Warehouse')) || [];

function addItem(name, quantity) {
    let existing = Warehouse.find(item => item.name === name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        Warehouse.push({ name: name, quantity: quantity });
    }
    localStorage.setItem('Warehouse', JSON.stringify(Warehouse));
    displayWarehouse();
}

function removeItem(name) {
    Warehouse = Warehouse.filter(item => item.name !== name);
    localStorage.setItem('Warehouse', JSON.stringify(Warehouse));
    displayWarehouse();
}

function displayWarehouse() {
    let tableBody = document.getElementById('table_body');
    tableBody.innerHTML = '';

    for (let item of Warehouse) {
        let row = `<tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td><button onclick="removeItem('${item.name}')">Remove</button>
    `;
        tableBody.innerHTML += row;
    }
}

document.getElementById('itemform').addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('item_name').value;
    let quantity = Number(document.getElementById('item_quantity').value);
    addItem(name, quantity);
    this.reset();
});

document.body.onload = displayWarehouse;