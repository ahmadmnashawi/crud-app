let Product;

if (localStorage.getItem("Product")) {
  Product = JSON.parse(localStorage.getItem("Product"));
} else {
  Product = []
}

// عناصر الإدخال
let title = document.getElementById("title");
let price = document.getElementById("Price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let btncreat = document.getElementById("btncreat");
let search = document.getElementById("search");

// حالات
let mood = "create";
let tmp = null;

// عرض المنتجات
function getProducts() {
  let content = "";

  for (let i = 0; i < Product.length; i++) {
    content += `
      <tr>
        <td>${Product[i].id}</td>
        <td>${Product[i].title}</td>
        <td>${Product[i].price}</td>
        <td>${Product[i].taxes}</td>
        <td>${Product[i].ads}</td>
        <td>${Product[i].discount}</td>
        <td>${Product[i].total}</td>
        <td>${Product[i].category}</td>
        <td><button onclick="updateProduct(${i})" class="btn-update">update</button></td>
        <td><button onclick="deleteTask(${i})" class="btn-delete">delete</button></td>
      </tr>
    `;
  }

  document.getElementById("bodd").innerHTML = content;

  if (Product.length > 0) {
    document.getElementById("div").innerHTML =
      `<button class="btn btnd" onclick="deleteAll()">Delete All (${Product.length})</button>`;
  } else {
    document.getElementById("div").innerHTML = "";
  }
}

getProducts();

// حساب الإجمالي
function getTotal() {
  if (price.value === "") {
    total.innerHTML = "";
    total.style.background = "red";
    return 0;
  }

  let result =
    +price.value +
    +taxes.value +
    +ads.value -
    +discount.value;

  total.innerHTML = result;
  total.style.background = "green";

  return result;
}

// إنشاء أو تحديث منتج
btncreat.onclick = function () {
  if (title.value === "" || price.value === "") {
    alert("please fill all fields");
    return;
  }

  let newProduct = {
    id: Product.length + 1,
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: getTotal(),
    category: category.value,
  };

  if (mood === "create") {
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        Product.push({ ...newProduct,id:Product.length + 1 });
      }
    } else {
      Product.push(newProduct);
    }
  } else {
    Product[tmp] = newProduct;
    mood = "create";
    btncreat.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("Product", JSON.stringify(Product));
  clearData();
  getProducts();
};

// تنظيف الحقول
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
}

// حذف عنصر
function deleteTask(id) {
  Product.splice(id, 1);
  localStorage.setItem("Product", JSON.stringify(Product));
  getProducts();
}

// تحديث منتج
function updateProduct(id) {
  title.value = Product[id].title;
  price.value = Product[id].price;
  taxes.value = Product[id].taxes;
  ads.value = Product[id].ads;
  discount.value = Product[id].discount;
  category.value = Product[id].category;

  getTotal();

  count.style.display = "none";
  btncreat.innerHTML = "Update";
  mood = "update";
  tmp = id;
}

// حذف الكل
function deleteAll() {
  Product = [];
  localStorage.removeItem("Product");
  getProducts();
}

// البحث
function searchb() {
  let content = "";
  let valueSearch = search.value.toLowerCase();

  for (let i = 0; i < Product.length; i++) {
    if (Product[i].title.toLowerCase().includes(valueSearch)) {
      content += `
        <tr>
          <td>${Product[i].id}</td>
          <td>${Product[i].title}</td>
          <td>${Product[i].price}</td>
          <td>${Product[i].taxes}</td>
          <td>${Product[i].ads}</td>
          <td>${Product[i].discount}</td>
          <td>${Product[i].total}</td>
          <td>${Product[i].category}</td>
        </tr>
      `;
    }
  }

  document.getElementById("bodd").innerHTML = content;
}