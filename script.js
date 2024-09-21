let carinhos = 0;
let lontramor = 0;
let handsPurchased = 0;
let autoClickInterval = null;
let autoCPS = 0.2; 
let firstClick = true;

// contadores de produto
let snacksPurchased = 0;
let toysPurchased = 0;
let towelsPurchased = 0;
let poolPurchased = 0;
let tripPurchased = 0;
let sofaPurchased = 0;
let pebblesPurchased = 0;
let bathtubPurchased = 0;
let adventurePurchased = 0;
let castlePurchased = 0;

const products = [
    { name: "hands", baseCPS: 0.2, cost: 10, counter: () => handsPurchased },
    { name: "snacks", baseCPS: 0.4, cost: 20, counter: () => snacksPurchased },
    { name: "toys", baseCPS: 0.6, cost: 30, counter: () => toysPurchased },
    { name: "towels", baseCPS: 0.8, cost: 50, counter: () => towelsPurchased },
    { name: "pool", baseCPS: 1.0, cost: 70, counter: () => poolPurchased },
    { name: "trip", baseCPS: 1.2, cost: 100, counter: () => tripPurchased },
    { name: "sofa", baseCPS: 1.5, cost: 200, counter: () => sofaPurchased },
    { name: "pebbles", baseCPS: 1.8, cost: 300, counter: () => pebblesPurchased },
    { name: "bathtub", baseCPS: 2.0, cost: 400, counter: () => bathtubPurchased },
    { name: "adventure", baseCPS: 2.5, cost: 600, counter: () => adventurePurchased },
    { name: "castle", baseCPS: 3.0, cost: 1000, counter: () => castlePurchased }
];

// Clique na lontra
document.getElementById("lontra").addEventListener("click", function() {
    if (firstClick) {
        this.src = "lontraidle.png"; 
        firstClick = false; 
    }

    let clickCarinhos = 1;

    if (handsPurchased > 0 && Math.random() < 0.25) {
        clickCarinhos = 2; // Chance de 25% de ganhar 2 carinhos
    }

    carinhos += clickCarinhos;
    document.getElementById("carinho-counter").textContent = Math.floor(carinhos);

    if (Math.random() < 0.25) {
        lontramor++;
        document.getElementById("lontramor-counter").textContent = lontramor;
    }
});

// Função para atualizar carinhos a cada segundo
function autoCarinho() {
    carinhos += autoCPS * handsPurchased;

    const displayedCarinhos = Math.floor(carinhos);
    document.getElementById("carinho-counter").textContent = displayedCarinhos;

    if (displayedCarinhos > 0) {
        if (Math.random() < 0.25) { // 25% de chance
            lontramor++;
            document.getElementById("lontramor-counter").textContent = lontramor;
        }
    }
}

// Atualiza os botões dos produtos
function updateProductButtons() {
    products.forEach((product, index) => {
        // Desbloqueia o produto se o anterior tiver 25 comprados
        if (index === 0 || products[index - 1].counter() >= 5) {
            document.querySelector(`[data-product="${product.name}"]`).disabled = false;
        }
    });
}

// Clique na lontra
document.getElementById("lontra").addEventListener("click", function() {
    let clickCarinhos = 1;

    if (handsPurchased > 0 && Math.random() < 0.25) {
        clickCarinhos = 2; // Chance de 25% de ganhar 2 carinhos
    }

    carinhos += clickCarinhos;
    document.getElementById("carinho-counter").textContent = Math.floor(carinhos);

    if (Math.random() < 0.25) {
        lontramor++;
        document.getElementById("lontramor-counter").textContent = lontramor;
    }
});

// Compra de produtos
document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", function() {
        const productName = this.getAttribute("data-product");
        const product = products.find(p => p.name === productName);

        if (lontramor >= product.cost) {
            lontramor -= product.cost;
            document.getElementById("lontramor-counter").textContent = lontramor;

            // Incrementar contador de compras do produto e atualizar autoCPS
            if (productName === "hands") {
                handsPurchased++;
                autoCPS += product.baseCPS;
            } else if (productName === "snacks") {
                snacksPurchased++;
                autoCPS += product.baseCPS;
            } else if (productName === "toys") {
                toysPurchased++;
                autoCPS += product.baseCPS; 
            } else if (productName === "towels") {
                towelsPurchased++;
                autoCPS += product.baseCPS; 
            } else if (productName === "pool") {
                poolPurchased++;
                autoCPS += product.baseCPS; 
            } else if (productName === "trip") {
                tripPurchased++;
                autoCPS += product.baseCPS; 
            } else if (productName === "sofa") {
                sofaPurchased++;
                autoCPS += product.baseCPS; 
            } else if (productName === "pebbles") {
                pebblesPurchased++;
                autoCPS += product.baseCPS; 
            } else if (productName === "bathtub") {
                bathtubPurchased++;
                autoCPS += product.baseCPS;
            } else if (productName === "adventure") {
                adventurePurchased++;
                autoCPS += product.baseCPS;
            } else if (productName === "castle") {
                castlePurchased++;
                autoCPS += product.baseCPS; 
            }

            document.getElementById(`${product.name}-counter`).textContent = product.counter();

            if (!autoClickInterval) {
                autoClickInterval = setInterval(autoCarinho, 1000); // Chama a função a cada segundo
            }

            updateProductButtons();
        } else {
            alert("Você precisa de mais lontramores para comprar este item.");
        }
    });
});


// Inicializa a atualização de botões no início
updateProductButtons();
