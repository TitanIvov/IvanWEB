

// 6
const products = {
    "product1": {
        "name": "Строительный клей",
        "price": 15,
        "subproducts": [ ],
        "subproperty": { }
    },
    "product2": {
        "name": "Фанера",
        "price": 100,
        "subproducts": [
            {
                "name": "3мм - 1 метр квадратный",
                "price": 100
            },
            {
                "name": "5мм - 1 метр квадратный",
                "price": 140
            },
            {
                "name": "8мм - 1 метр квадратный",
                "price": 200
            },
            {
                "name": "10мм - 1 метр квадратный",
                "price": 300
            }
        ],
        "subproperty": { }
    },
    "product3": {
        "name": "Саморезы",
        "price": 200,
        "subproducts": [ ],
        "subproperty": {
            "name": "Оцинкованные",
            "multiplier": 1.2
        }
    },
    "product4": {
        "name": "Доска",
        "price": 250,
        "subproducts": [
            {
                "name": "ель (6 метров)",
                "price": 250
            },
            {
                "name": "дуб (6 метров)",
                "price": 350
            },
            {
                "name": "бук (6 метров)",
                "price": 450
            },
        ],
        "subproperty": {
            "name": "вторичная обработка",
            "multiplier": 1.8
        }
    }
}

function loadProductsEl(productsEl) {
    for (let i = 1; i <= Object.keys(products).length; i++) {
        let productEl = document.createElement("div");
        let productRadioEl = document.createElement("input");
        
        productRadioEl.setAttribute("type", "radio");
        productRadioEl.setAttribute("id", `radio-${i}`);
        productRadioEl.setAttribute("value", `product${i}`);
        productRadioEl.setAttribute("name", "product-type");
        productEl.appendChild(productRadioEl);

        let productRadioLabelEl = document.createElement("label");
        productRadioLabelEl.setAttribute("for", `radio-${i}`);
        productRadioLabelEl.innerText = products[`product${i}`]["name"];
        productEl.appendChild(productRadioLabelEl);

        productsEl.appendChild(productEl);
    }
}

function getProductType(typeSelectEls) {
    let selectedType;

    typeSelectEls.forEach(typeSelectEl => {
        if (typeSelectEl.checked === true) {
            selectedType = typeSelectEl.value;
        }
    });
    const product = products[selectedType];

    return product;
}

function formStandartSelectOption() {
    const option = document.createElement("option");
    const name = document.createTextNode("Выберите опцию");
    option.setAttribute("value", "");
    option.appendChild(name);

    return option;
}

function loadSubproductsOptions(subproducts, subproductsSelected) {
    if (subproducts.length > 0) {
        subproductsSelected.removeAttribute("disabled");
    }
    else {
        subproductsSelected.setAttribute("disabled", "");
    }
    subproducts.forEach((subproduct) => {
        const option = document.createElement("option");
        let name = document.createTextNode(subproduct["name"]);
        option.setAttribute("value", subproduct["price"]);
        option.appendChild(name);
        subproductsSelected.appendChild(option);
    });
}

function loadSubproductProperty(subproductProperty, subproductsCheckbox, subproductsCheckboxLabel) {
    
    if (Object.keys(subproductProperty).length > 0) {
        subproductsCheckbox.removeAttribute("disabled");
        subproductsCheckbox.setAttribute("value", subproductProperty["multiplier"]);
        subproductsCheckboxLabel.innerText = subproductProperty["name"];
    }
    else {
        subproductsCheckbox.setAttribute("disabled", "");
        subproductsCheckbox.setAttribute("value", "");
        subproductsCheckboxLabel.innerText = "Нет";
    }
}

function loadSubproductEl(product) {
    let subproductsSelectEl = document.getElementById("select");
    let subproductsCheckbox = document.getElementById("property");
    let subproductsCheckboxLabel = document.getElementById("property-label");
    
    subproductsSelectEl.innerHTML = " ";
    option = formStandartSelectOption();    
    subproductsSelectEl.appendChild(option);

    let subproducts = product["subproducts"];
    loadSubproductsOptions(subproducts, subproductsSelectEl);
    
    let subproductProperty = product["subproperty"];
    loadSubproductProperty(subproductProperty, subproductsCheckbox, subproductsCheckboxLabel);
}

function changeProductType() {
    const typeSelectEls = document.getElementsByName("product-type");
    const product = getProductType(typeSelectEls);
    loadSubproductEl(product);
}

function getQuantity(quantityEl) {
    return parseInt(quantityEl.value);
}

function getProductPrice(subproductTypeEl, product) {
    let productPrice;
    if ((subproductTypeEl.getAttribute("disabled") === null) && !(subproductTypeEl.value === "")) {
        productPrice = subproductTypeEl.value;
    }
    else {
        if (product == undefined) {
            const log = document.getElementById("errorlog");
            log.style.display = "block";
            log.innerText = "Ошибка, некорректные данные";
            return;
        }
        productPrice = product["price"];
    }

    return productPrice;
}

function getProductMultiplier(subproductPropertyEl) {
    let productMultiplier;
    if (subproductPropertyEl.getAttribute("disabled") === null && subproductPropertyEl.checked) {
        productMultiplier = subproductPropertyEl.value;
    }
    else {
        productMultiplier = 1;
    }
    return productMultiplier;
}

function isResultValid(result) {
    return !(isNaN(result) || result < 0);
}

const log = document.getElementById("errorlog");
function calcResult(quantity, productPrice, productMultiplier) {
    let result = quantity * productPrice * productMultiplier;
    if (isResultValid(result)) {
        log.style.display = "none";
        return result;
    }
    else {
        log.style.display = "block";
        log.innerText = "Ошибка, введенные данные некорректны";
        return 0;
    }
}

function writeResult(result) {
    let resultEl = document.getElementById("answer");
    resultEl.innerHTML = result;
}

function calculate() {
    let quantityEl = document.getElementById("count-6");
    let typeSelectEls = document.getElementsByName("product-type");

    let product = getProductType(typeSelectEls);

    let subproductTypeEl = document.getElementById("select");
    let subproductPropertyEl = document.getElementById("property");

    let quantity = getQuantity(quantityEl);

    let productPrice = getProductPrice(subproductTypeEl, product);

    let productMultiplier = getProductMultiplier(subproductPropertyEl);

    let result = calcResult(quantity, productPrice, productMultiplier);
    writeResult(result);    
}


document.addEventListener("DOMContentLoaded", () => {
    let productsEl = document.getElementById("calc-radio-group");
    loadProductsEl(productsEl);

    let selectEl = document.getElementById("calc-radio-group");
    selectEl.addEventListener("change", changeProductType);

    let buttonEl = document.getElementById("button");
    buttonEl.addEventListener("click", calculate);
});
