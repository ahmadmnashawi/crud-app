let title = document.getElementById("title")
let price =document.getElementById("Price")
let taxes =document.getElementById("taxes")
let ads =document.getElementById("ads")
let discount =document.getElementById("discount")
let count =document.getElementById("count")
let category =document.getElementById("category")
let btncreat =document.getElementById("btncreat")
let bodtab =document.getElementById("bodd")
let total = document.getElementById("total")
let search = document.getElementById("search")
let product = localStorage.product ? JSON.parse(localStorage.product) : [];
let searchmood = "title"
let mood ="creat"
let tmp;
function gettoal() {
     if(price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result
    total.style.background="green"
}else {
     total.innerHTML=""
      total.style.background="red"
}
}
gettoal()

    btncreat.onclick = function() {
    let newproduct = 
    {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(title.value!=''&&price.value!=""&&category.value!=""&&newproduct.count<100){

    
   if(mood == "create"){
    if(count.value > 1){
        for(let i=0;i<count.value;i++){
             product.push(newproduct)
        }
        
    }else {
        product.push(newproduct)
    }}else {
        product[tmp] = newproduct
        mood = "create"
        btncreat.innerHTML = "Create"
        count.style.display = "block"
    }
  cleardata() 
}
   
    localStorage.setItem("product",JSON.stringify(product))
          
            show()
        }
        function show() {
           gettoal()
            let content=""
            for(let i=0;i<product.length;i++){
                if (!product[i]) continue;
             content += `
                 <tr>
                    <td>${i}</td>
                    <td>${product[i].title}</td>
                    <td>${product[i].price}</td>
                    <td>${product[i].taxes}</td>
                    <td>${product[i].ads}</td>
                    <td>${product[i].discount}</td> 
                    <td>${product[i].total}</td>
                    <td>${product[i].category}</td>
                    <td><button onclick="Update(${i})"  class="btn btnu">update</button></td>
                    <td><button onclick="Delete(${i})" class="btn btnd">delete</button></td>
                </tr>
            `
            }
            bodtab.innerHTML = content
             if(product.length > 0 ){
        document.getElementById("div").innerHTML = `
        <button onclick="DeleteAll()" class="btnc ">Delete All (${product.length})</button>
        `
    }else {
         document.getElementById("div").innerHTML = ""
    }
        }
        show()
 function cleardata() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    gettoal()
    count.value = ""
    category.value = ""
 } 
 function Delete(i) {
    product.splice(i,1)
    localStorage.product = JSON.stringify(product)
    show()
 }
 function Update(i) {
    title.value = product[i].title
    price.value = product[i].price
    taxes.value = product[i].taxes
    ads.value = product[i].ads
    discount.value = product[i].discount
    total.innerHTML = product[i].total
    category.value = product[i].category
    count.style.display="none"
    btncreat.innerHTML = "Update"
    mood ="update"
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    
 }
 function DeleteAll() {
    product.splice(0)
    localStorage.clear()
    show()
 }
 function getsearch(id) {
     console.log(id)
    if(id == "searchbytitle") {
        searchmood = "title"
        search.placeholder = "search by title"
    }else {
         searchmood = "category"
         search.placeholder = "search by category"
    }
    search.focus()
    search.value=""
 }
 function searchdata(value) {
    let content = '';
    value = value.toLowerCase();

    for (let i = 0; i < product.length; i++) {
        if (searchmood === "title") {
            if (product[i].title && product[i].title.toLowerCase().includes(value)) {
                content += `
                    <tr>
                        <td>${i}</td>
                        <td>${product[i].title}</td>
                        <td>${product[i].price}</td>
                        <td>${product[i].taxes}</td>
                        <td>${product[i].ads}</td>
                        <td>${product[i].discount}</td> 
                        <td>${product[i].total}</td>
                        <td>${product[i].category}</td>
                        <td><button onclick="Update(${i})"  class="btn btnu">update</button></td>
                        <td><button onclick="Delete(${i})" class="btn btnd">delete</button></td>
                    </tr>
                `;
            }
        } else {
            if (product[i].category && product[i].category.toLowerCase().includes(value)) {
                content += `
                    <tr>
                        <td>${i}</td>
                        <td>${product[i].title}</td>
                        <td>${product[i].price}</td>
                        <td>${product[i].taxes}</td>
                        <td>${product[i].ads}</td>
                        <td>${product[i].discount}</td> 
                        <td>${product[i].total}</td>
                        <td>${product[i].category}</td>
                        <td><button onclick="Update(${i})"  class="btn btnu">update</button></td>
                        <td><button onclick="Delete(${i})" class="btn btnd">delete</button></td>
                    </tr>
                `;
            }
        }
    }

    bodtab.innerHTML = content;
}
