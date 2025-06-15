const buttons = document.querySelectorAll("button")

for (let x = 0; x < buttons.length; x++) {
    buttons[x].onclick = () => {        
        for (let y = 0; y < buttons.length; y++) {
            buttons[y].classList.remove("opacity")
        }
        buttons[x].classList.add("opacity")
    }
}

// Filter Burgers

function filterBurgers(productData) {
    const veganBurgers = productData.filter(item => {
        return item.vegan
    })
    showAll(veganBurgers)
}
document.querySelector(".burgers-filter").addEventListener("click", () => filterBurgers(menuOptions))

// Sum All

function sumAll(productData) {

    showAll(productData)
    document.querySelector(".container").classList.add("display-list")

    const sum = productData.reduce((acc, currentValue) => {
        return acc + currentValue.price
    }, 0)

    document.querySelector(".container").innerHTML += `
        <div class="card reduce">
            <h2>Total</h2>
            <p>${formatValues(sum)}<p>
        </div>
    `
}

document.querySelector(".sum-all").addEventListener("click", () => sumAll(menuOptions))

// Apply Discount

function applyDiscount(productData) {
    const newPrices = productData.map(product => {
        return {
            ...product,
            priceDiscount: product.price * 0.9
        }
    })

    showAll(newPrices)

    const itemPrice = document.querySelectorAll(".price")

    for(let i = 0; i < itemPrice.length; i++) {
        itemPrice[i].classList.add("price-line-through")
    }

    const itemPriceDiscount = document.querySelectorAll(".price-discount")
    for(let x = 0; x < itemPriceDiscount.length; x++) {
        itemPriceDiscount[x].style.display = "initial"
    }
}

document.querySelector(".apply-discount").addEventListener("click", () => applyDiscount(menuOptions))

// Show All

function showAll(productData) {
    document.querySelector(".container").style.display = "grid"
    document.querySelector(".container").classList.remove("display-none")
    document.querySelector(".container").innerHTML = ""
    productData.forEach(element => {
    document.querySelector(".container").innerHTML += `
        <div class="card">
            <img src="${element.src}">
            <h2>${element.name}</h2>
            <p class="price">${formatValues(element.price)}</p>
            <span class="price-discount">${formatValues(element.priceDiscount)}</span>
        </div>
    `
    });
    document.querySelector(".container").classList.remove("display-list")
}

document.querySelector(".show-all").addEventListener("click", () => showAll(menuOptions))

// Format Values

function formatValues(number) {
    return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(number)
}