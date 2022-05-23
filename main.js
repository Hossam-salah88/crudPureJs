let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let adds = document.querySelector("#adds");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let creat = document.querySelector("#submit");
let table = document.querySelector("#table");
let mode = "creat";
let productIndex;

//==================== get total ==============

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +adds.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = " ";
    total.style.background = "#B20600";
  }
}

//=================== creat product =================

let productData;

if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}

creat.onclick = function (e) {
  e.preventDefault();
  let newProduct = {
    id: productData.length + 1,
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    adds: adds.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // =================== Count ===========================
  if (mode === "creat") {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        productData.push(newProduct);
      }
    } else {
      productData.push(newProduct);
    }
  } else {
    productData[productIndex] = newProduct;
    creat.innerHTML = "creat";
    count.style.display = "block";
    mode = "creat";
  }

  localStorage.setItem("product", JSON.stringify(productData));
  showData();
  clearData();
};
showData();
// ==================== clear Data from inputs ======================

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  adds.value = "";
  discount.value = "";
  total.innerHTML = " ";
  count.value = "";
  category.value = "";
  total.style.background = "#B20600";
}

// ================== input data in the dom ================

function showData() {
  let productUi = productData.map((pro) => {
    return `
    <tr>
      <td>${pro.id}</td>
      <td>${pro.title}</td>
      <td>${pro.price}</td>
      <td>${pro.taxes}</td>
      <td>${pro.adds}</td>
      <td>${pro.discount}</td>
      <td>${pro.total}</td>
      <td>${pro.category}</td>
      <td><button onclick="updateProduct(${pro.id})" id="updata">updata</button></td>
      <td><button onclick="deletItem(${pro.id})" id="delet">delet</button></td>
    </tr>
    `;
  });

  table.innerHTML = productUi;
  let deleteAll = document.querySelector("#deletAll");

  if (productData.length > 0) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }
  getTotal();
}

// =================== Delet Item =====================

function deletItem(id) {
  let deletConfarm = window.confirm(
    "Are you Sure to delete this record or Not ?"
  );
  let chosenItem = productData.find((pro) => pro.id === id);
  let index = productData.indexOf(chosenItem);

  if (index != -1 && deletConfarm == true) {
    productData.splice(index, 1);
    localStorage.product = JSON.stringify(productData);
    showData(productData);
  }
}

// ====================== Delete All ===========================

function deleteAll() {
  localStorage.clear();
  productData.splice(0);
  showData();
}

// ===================== Update Product =========================
function updateProduct(id) {
  let chosenItem = productData.find((pro) => pro.id === id);
  let index = productData.indexOf(chosenItem);

  productIndex = index;

  title.value = productData[index].title;
  price.value = productData[index].price;
  taxes.value = productData[index].taxes;
  discount.value = productData[index].discount;
  getTotal();
  count.style.display = "none";
  category.value = productData[index].category;
  creat.innerHTML = "Update";
  mode = "Update";
  scroll({
    top: 0,
  });
}

// ======================= Search =====================

let searchMode = "title";

let searchInput = document.querySelector("#search");

function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  searchInput.placeholder = "Search By " + searchMode;
  searchInput.focus();
  searchInput.value = "";
  showData();
}

function searchProduct(value) {
  let tableProduct = " ";
  for (let id = 0; id < productData.length; id++) {
    if (searchMode == "title") {
      if (productData[id].title.includes(value.toLowerCase())) {
        tableProduct += `
        <td>${id}</td>
        <td>${productData[id].title}</td>
        <td>${productData[id].price}</td>
        <td>${productData[id].taxes}</td>
        <td>${productData[id].adds}</td>
        <td>${productData[id].discount}</td>
        <td>${productData[id].total}</td>
        <td>${productData[id].category}</td>
        <td><button onclick="updateProduct(${
          id + 1
        })" id="updata">updata</button></td>
        <td><button onclick="deletItem(${
          id + 1
        })" id="delet">delet</button></td>
      </tr>
      </tr>
        `;
      }
    } else {
      if (productData[id].category.includes(value.toLowerCase())) {
        tableProduct += `
        <td>${id}</td>
        <td>${productData[id].title}</td>
        <td>${productData[id].price}</td>
        <td>${productData[id].taxes}</td>
        <td>${productData[id].adds}</td>
        <td>${productData[id].discount}</td>
        <td>${productData[id].total}</td>
        <td>${productData[id].category}</td>
        <td><button onclick="updateProduct(${
          id + 1
        })" id="updata">updata</button></td>
        <td><button onclick="deletItem(${
          id + 1
        })" id="delet">delet</button></td>
      </tr>
      </tr>
        `;
      }
    }
  }
  table.innerHTML = tableProduct;
}
