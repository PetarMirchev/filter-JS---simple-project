const data = [
    {
      id: 1,
      name: "Invicta Men's Pro Diver",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 66,
      cat: "Dress",
    },
    {
      id: 11,
      name: "Invicta Men's Pro Diver 2",
      img: "https://m.media-amazon.com/images/I/81i+ZQzbncL._AC_UL480_FMwebp_QL65_.jpg",
      price: 77,
      cat: "Dress",
    },
    {
      id: 2,
      name: "Timex Men's Expedition Scout ",
      img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
      price: 40,
      cat: "Sport",
    },
    {
      id: 3,
      name: "Breitling Superocean Heritage",
      img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
      price: 200,
      cat: "Luxury",
    },
    {
      id: 4,
      name: "Casio Classic Resin Strap ",
      img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
      price: 16,
      cat: "Sport",
    },
    {
      id: 5,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
      price: 150,
      cat: "Casual",
    },
    {
      id: 6,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/71SEd7XDFhL._AC_UL480_FMwebp_QL65_.jpg",
      price: 74,
      cat: "Casual",
    },
    {
      id: 7,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/71Mn7chOq9L._AC_UL480_FMwebp_QL65_.jpg",
      price: 79,
      cat: "Casual",
    },
    {
      id: 8,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UL480_FMwebp_QL65_.jpg",
      price: 74,
      cat: "Casual",
    },
    {
      id: 9,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/71ThumECxuL._AC_UL480_FMwebp_QL65_.jpg",
      price: 100,
      cat: "Casual",
    },
    {
      id: 10,
      name: "Garmin Venu Smartwatch 2",
      img: "https://m.media-amazon.com/images/I/71ThumECxuL._AC_UL480_FMwebp_QL65_.jpg",
      price: 50,
      cat: "Casual",
    },
    {
      id: 12,
      name: "Garmin Venu Smartwatch 22 ",
      img: "https://m.media-amazon.com/images/I/71SEd7XDFhL._AC_UL480_FMwebp_QL65_.jpg",
      price: 105,
      cat: "Casual",
    },
  ];




//***************************************************************************************************** */



//connect to class in HTML
const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");


// logic for render products form data up
const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts.map( 
        (product) => 
        `
      <div class="product">
        <img src=${product.img} 
          alt="" />
          <span class="name">${product.name}</span>
          <span class="priceText">$${product.price}</span>
      </div>
        `
        ).join("")
}

displayProducts(data);


//****************************************************************************************************** */

searchInput.addEventListener("keyup", (e) => {
    // console.log(e.target.value.toLowerCase());
    const value = e.target.value.toLowerCase();


    //logic to show filter result, is empty show all or is not include this letter/symbol show no data
        if (value){
            displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1 ))     
            // const s = 'pepi'  --> undefined
            // s.indexOf('i')  --> 3
            //s.indexOf('o')  --> -1 //not include this letter/symbol --> -1  -->  no data to show
        } else {
            displayProducts(data);
        }
        
});


//******************************************************************************************************* */

// function for categories 
const setCategories = () => {
    const allCats = data.map(item => item.cat);
    //console.log(allCats); //Array(10) [ "Dress", "Dress", "Sport", "Luxury", "Sport", "Casual", "Casual", "Casual", "Casual", "Casual" ]
    // filter duplicated items, add 'All' & return Array
    const categories = [ 'All', ...allCats.filter((item,i) => {
      return allCats.indexOf(item) === i
    }), ]; 
    //console.log(categories); //Array(5) [ "All", "Dress", "Sport", "Luxury", "Casual" ]

    categoriesContainer.innerHTML = categories.map(cat => 
      `
      <span class="cat">${cat}</span>
      `
      ).join("");  // --->  <span class="cat">All</span>....


      //click Categories Text & return Text (All, Sport.....)
      categoriesContainer.addEventListener("click", (e) => {
        // console.log(e.target.textContent); //Sport, Luxury, Casual, Luxury...
        const selectedCat =  e.target.textContent;

        //if ar select All will display all 'data', else (:) will filter the data to the selected Category
        selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter((item) => item.cat === selectedCat))
      });
};
setCategories();


//********************************************************************************************************************* */

//price filter logic (similar to categories function logic) -- >slider<  important to be used only in small SHOPS!
const setPrice = () => {

  const priceList = data.map((item) => item.price);

  //Math.min(2,5)  --> 2
  //Math.max(2,5)  --> 5
  const minPrice = Math.min(...priceList); // spreed operator(...) is used for Array data, if is not used will back NaN
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice; 
  priceRange.value = maxPrice;// set default to MAX to show All products in beginning
  priceValue.textContent = "$" + maxPrice;//display the price in side of the bar

  //filter price logic data bees on selected $
  priceRange.addEventListener("input", (e) => {
      priceValue.textContent = "$" + e.target.value;

      //call function to render the data products bees on selected $
      displayProducts(data.filter ((item) => item.price <= e.target.value));
  })
}

setPrice();


//******************************************************************************************************* */


