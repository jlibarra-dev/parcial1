const req = (url) => {
    let prom = new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function () {
            if (req.status == 200) {
                let response = JSON.parse(req.response);
                resolve(response);
            } else {
                reject("Sucedio un error al cargar los datos.");
            }
        };
        req.send();
    });
    return prom;
};

var numCarrito = 0;
var carrito = [];
var total = 0;
function agregarProducto() {
    numCarrito += 1;
    const items = document.querySelector(".numItems");
    const text = items.childNodes[1];
    text.nodeValue = numCarrito + " items";
}

function borrarCarrito() {
    carrito = [];
    const items = document.querySelector(".numItems");
    const text = items.childNodes[1];
    text.nodeValue = "0 items";
    cargarElementos();
}

function verCanasta() {
    const titleHTML = document.querySelector(".foodType");
    titleHTML.innerText = "Order Detail";
    var element = document.querySelector(".productos");
    var parent = element.parentNode
    parent.removeChild(element);
    element = document.createElement("div");
    element.classList.add("row");
    element.classList.add("productos");
    parent.appendChild(element);
    const prods = document.querySelector(".productos");
    //Table
    const table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("striped");
    //Thead
    const thead = document.createElement("thead");
    //Tr
    const tr = document.createElement("tr");
    //Ths
    const th1 = document.createElement("th");
    th1.innerText = "Item";
    const th2 = document.createElement("th");
    th2.innerText = "Qty.";
    const th3 = document.createElement("th");
    th3.innerText = "Description";
    const th4 = document.createElement("th");
    th4.innerText = "Unit Price";
    const th5 = document.createElement("th");
    th5.innerText = "Amount";
    table.append(thead);
    thead.append(tr);
    tr.append(th1);
    tr.append(th2);
    tr.append(th3);
    tr.append(th4);
    tr.append(th5);
    //Tbody
    const tbody = document.createElement("tbody");
    table.append(tbody);
    prods.append(table);
    for (var i = 0; i < carrito.length; i++) {
        const tr1 = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.innerText = carrito[i].item;
        const td1 = document.createElement("td");
        td1.innerText = carrito[i].quantity;
        const td2 = document.createElement("td");
        td2.innerText = carrito[i].description;
        const td3 = document.createElement("td");
        td3.innerText = carrito[i].unitPrice;
        const td4 = document.createElement("td");
        td4.innerText = "$" + (parseFloat((carrito[i].unitPrice).split("$")[1]) * carrito[i].quantity).toFixed(2);
        tr1.append(th1);
        tr1.append(td1);
        tr1.append(td2);
        tr1.append(td3);
        tr1.append(td4);
        tbody.append(tr1);
    }
    //Calcular total
    total = 0;
    for (var i = 0; i < carrito.length; i++) {
        total += parseFloat((carrito[i].unitPrice).split("$")[1]) * carrito[i].quantity;
    }
    const text = document.createElement("p");
    text.innerText = "Total: $" + total.toFixed(2);
    text.style.fontWeight = "bold";
    prods.appendChild(text);
    const buttonCancel = document.createElement("button");
    buttonCancel.classList.add("btn");
    buttonCancel.classList.add("btn-danger");
    buttonCancel.innerText = "Cancel";
    buttonCancel.style.margin = "0px 10px 0px 1000px"
    buttonCancel.dataset.target = "#exampleModal";
    buttonCancel.dataset.toggle = "modal";
    prods.appendChild(buttonCancel);
    const buttonConfirm = document.createElement("button");
    buttonConfirm.classList.add("btn");
    buttonConfirm.classList.add("btn-success");
    buttonConfirm.innerText = "Confirm order";
    buttonConfirm.onclick = function () {
        for (var i = 0; i < carrito.length; i++) {
            console.log(carrito[i]);
        }
    }
    prods.appendChild(buttonConfirm);
    //<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    //    Launch demo modal
    //</button>
}

function cargarElementos(tipoComida) {
    var comida = 0;
    var title = "Burgers";
    if (tipoComida == "tacos") {
        comida = 1;
        title = "Tacos";
    }
    else if (tipoComida == "salads") {
        comida = 2;
        title = "Salads";
    }
    else if (tipoComida == "desserts") {
        comida = 3;
        title = "Desserts";
    }
    else if (tipoComida == "drinks") {
        comida = 4;
        title = "Drinks";
    }
    const titleHTML = document.querySelector(".foodType");
    titleHTML.innerText = title;
    var element = document.querySelector(".productos");
    var parent = element.parentNode
    parent.removeChild(element);
    element = document.createElement("div");
    element.classList.add("row");
    element.classList.add("productos");
    parent.appendChild(element);

    req(
        "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
    ).then((valorProm) => {
        const prods = document.querySelector(".productos");
        for (var i = 0; i < valorProm[comida].products.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("col-3");
            const img = document.createElement("img");
            img.src = valorProm[comida].products[i].image;
            img.style.width = "250px";
            img.style.height = "200px";
            img.style.alignSelf = "center";
            //Card body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            //Title
            const title = document.createElement("h5");
            title.classList.add("card-title");
            title.innerText = valorProm[comida].products[i].name;
            // Text-Desc
            const textDesc = document.createElement("p");
            textDesc.classList.add("card-text");
            textDesc.innerText = valorProm[comida].products[i].description;
            // Text-Price
            const textPrice = document.createElement("p");
            textPrice.classList.add("card-text");
            textPrice.innerText = "$" + valorProm[comida].products[i].price;
            textPrice.style.fontWeight = "bold";
            card.appendChild(img);
            //Button
            const button = document.createElement("button");
            button.classList.add("btn");
            button.classList.add("btn-dark");
            button.innerText = "Add to car";
            button.onclick = function () {
                agregarProducto();
                item = carrito.find(item => item.description === button.parentNode.childNodes[0].innerText);
                if (item == undefined) {
                    carrito.push({ "item": carrito.length + 1, "quantity": 1, "description": button.parentNode.childNodes[0].innerText, "unitPrice": button.parentNode.childNodes[2].innerText });
                }
                else {
                    item.quantity += 1;
                }
            }
            //Append a Card Body
            cardBody.append(title);
            cardBody.append(textDesc);
            cardBody.append(textPrice);
            cardBody.append(button);
            card.appendChild(cardBody);
            prods.appendChild(card);
        }

    });
}

cargarElementos();