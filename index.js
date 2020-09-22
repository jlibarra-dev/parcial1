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

document.querySelector(".burgers").addEventListener("click", prueba);



function prueba() {
    req(
        "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
    ).then((valorProm) => {
        /*
        <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
*/
        const prods = document.querySelector(".productos");
        for (var i = 0; i < valorProm[0].products.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("col-3");
            card.style.width = "18rem";
            const img = document.createElement("img");
            img.src = valorProm[0].products[i].image;
            img.style.width = "100px";
            img.style.height = "100px";
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const title = document.createElement("div");
            title.classList.add("card-title");
            title.innerText = valorProm[0].products[i].name;
            card.appendChild(img);
            card.appendChild(title);
            prods.appendChild(card);
        }
    });
}