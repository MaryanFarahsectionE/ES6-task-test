const products = [
  { id: 1, name: "Washing Machine", price: 1500, category: "Appliances" },
  { id: 2, name: "Laptop", price: 2500, category: "Electronics" },
  { id: 3, name: "Microwave", price: 800, category: "Appliances" },
  { id: 4, name: "Smartphone", price: 1000, category: "Electronics" },
  { id: 5, name: "Refrigerator", price: 1800, category: "Appliances" },
  { id: 6, name: "Television", price: 1300, category: "Electronics" },
];

function fetchProducts() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.random() < 0.9) {
        resolve(products); 
      } else {
        reject("Failed to fetch products."); 
      }
    }, 1000);
  });
}

async function processProducts() {
  try {
    const fetchedProducts = await fetchProducts(); 

    const filteredProducts = [];
    for (let i = 0; i < fetchedProducts.length; i++) {
      if (fetchedProducts[i].price > 1000 && fetchedProducts[i].category === "Appliances") {
        filteredProducts.push(fetchedProducts[i]);
      }
    }

    const mappedProducts = [];
    for (let i = 0; i < fetchedProducts.length; i++) {
      mappedProducts.push([fetchedProducts[i].name, fetchedProducts[i].category]);
    }

    const reducedProducts = {};
    for (let i = 0; i < fetchedProducts.length; i++) {
      reducedProducts[fetchedProducts[i].id] = {
        name: fetchedProducts[i].name,
        price: fetchedProducts[i].price,
        category: fetchedProducts[i].category,
      };
    }

    const lessThanEqualTo1000 = [];
    const greaterThan1000 = [];
    for (let i = 0; i < fetchedProducts.length; i++) {
      if (fetchedProducts[i].price <= 1000) {
        lessThanEqualTo1000.push(fetchedProducts[i]);
      } else {
        greaterThan1000.push(fetchedProducts[i]);
      }
    }
    const combinedProducts = lessThanEqualTo1000.concat(greaterThan1000); 

    const productsWithDiscount = [];
    for (let i = 0; i < fetchedProducts.length; i++) {
      let product = fetchedProducts[i];
      product.hasDiscount = product.price > 2000 ? true : false;
      productsWithDiscount.push(product);
    }

    let foundProduct = null;
    for (let i = 0; i < fetchedProducts.length; i++) {
      if (fetchedProducts[i].name === "Refrigerator") {
        foundProduct = fetchedProducts[i]; 
        break;
      }
    }

    let foundIndex = -1;
    for (let i = 0; i < fetchedProducts.length; i++) {
      if (fetchedProducts[i].name === "Television") {
        foundIndex = i; 
        break;
      }
    }

    let hasExpensiveProduct = false;
    for (let i = 0; i < fetchedProducts.length; i++) {
      if (fetchedProducts[i].price > 3000) {
        hasExpensiveProduct = true; 
        break;
      }
    }

    let allAreElectronics = true;
    for (let i = 0; i < fetchedProducts.length; i++) {
      if (fetchedProducts[i].category !== "Electronics") {
        allAreElectronics = false; 
        break;
      }
    }

    displayResults({
      filteredProducts: filteredProducts,
      mappedProducts: mappedProducts,
      reducedProducts: reducedProducts,
      combinedProducts: combinedProducts,
      productsWithDiscount: productsWithDiscount,
      foundProduct: foundProduct,
      foundIndex: foundIndex,
      hasExpensiveProduct: hasExpensiveProduct,
      allAreElectronics: allAreElectronics,
    });
  } catch (error) {
    console.log("Error:", error);
    document.getElementById("error-message").innerText = error; 
  }
}

function displayResults(results) {
  document.getElementById("filtered").innerText = JSON.stringify(
    results.filteredProducts,
    null,
    2
  );
  document.getElementById("mapped").innerText = JSON.stringify(
    results.mappedProducts,
    null,
    2
  );
  document.getElementById("reduced").innerText = JSON.stringify(
    results.reducedProducts,
    null,
    2
  );
  document.getElementById("combined").innerText = JSON.stringify(
    results.combinedProducts,
    null,
    2
  );
  document.getElementById("discount").innerText = JSON.stringify(
    results.productsWithDiscount,
    null,
    2
  );
  document.getElementById("found").innerText = JSON.stringify(
    results.foundProduct,
    null,
    2
  );
  document.getElementById("foundIndex").innerText = results.foundIndex;
  document.getElementById("hasExpensive").innerText = results.hasExpensiveProduct;
  document.getElementById("allElectronics").innerText = results.allAreElectronics;
}

processProducts();
