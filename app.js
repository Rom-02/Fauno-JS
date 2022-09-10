let productsStore = document.getElementById("productsStore");

let prodStoreBeds = [
    {
        id:"one",
        name:"Bed Sure",
        price: "5.530,85$",
        desc:"Cama para gatos de interior o perros pequeños, lavable. Cama redonda de franela súper suave, fondo Oxford antideslizante, impresión de moneda, gris.",
        img:"img/dog-bed-1.png"
    }, 
    {
        id:"two",
        name:"Moises Wepets",
        price: "9.820,00$",
        desc:"Cama de color gris, tamaño mediano, confeccionado con materiales suaves al tacto. De fácil lavado para mantener la higiene de tu mascota y tu hogar.",
        img:"img/dog-bed-2.png"    
    }, 
    {
        id:"three",
        name:"Aspen Pet Oval",
        price: "7.975,00$",
        desc:"Cama para gatos y perros, con paredes tipo nido rellenas de poliéster alto para promover la seguridad. Lavable a máquina.",
        img:"img/dog-bed-4.png"
    }
];

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
    return (productsStore.innerHTML = prodStoreBeds
        .map((bedItems) => {
            let { id, name, price, desc, img } = bedItems;
            let search = basket.find((bedItems) => bedItems.id === id) || []
            return `
        <section id=product-id-${id} class="products-img-store">
                <article class="box-store">
                    <picture class="dog-bed">
                        <img src=${img} alt="cama redonda para mascotas de color gris">
                    </picture>
                    <div class="dog-bed-text">
                        <h2 class="dog-bed-title">${name}</h2>
                        <p class="dog-bed-body">${desc}</p>
                        <div class="add"> 
                            <h3 class="dog-bed-price">${price}</h3>
                            <div class="minus-plus" id="minus-plus">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">
                                ${search.item === undefined? 0: search.item} 
                                </div>
                                <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        `;
    })

    .join(""));     
};

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }   else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);

    Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        style: {
          background: "rgba(21, 150, 48, 0.50)",
        }
      }).showToast();
};


let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search.item === 0) return; 
    else {
        search.item -= 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);

    Toastify({
        text: "Producto removido del carrito",
        duration: 1000,
        style: {
          background: "rgba(255, 0, 0, 0.50)",
        }
      }).showToast();
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation =()=>{
    let cartIcon = document.getElementById("cart-amount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};

calculation()
