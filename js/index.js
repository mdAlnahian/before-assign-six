
const getSearchInfo = () => {
  const searchField = document.getElementById("search-box");
  const searchText = searchField.value;
  const err = document.getElementById('err')
  if(searchText === ''){
      err.innerText='👩‍🍳plz write something to get your fav dishh😋'
  }
  else{
        err.style.display="none"
          const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
          fetch(url)
            .then((res) => res.json())
            .then((data) => getValues(data.meals));

          searchField.value = "";
  }


};
// getSearchInfo();

const getValues=(meals)=>{
  // console.log(meals)

  const container = document.getElementById("container");
  container.textContent = "";

   const err = document.getElementById("err2");

  if (!meals) {
     err.innerText = "Oops! no result Matches😣";
    // console.log("no result found");
  } else {
       err.innerText = `Yes!👨‍🍳 ${meals.length} result found 😋`;
        // err.style.display = "none";
    for (const meal of meals) {
    //   console.log(meal);
      // console.log(meal.length)
      const div = document.createElement("div");
      div.classList.add("container-element");
      div.innerHTML = `
                      <div class="col">
                        <div class="card">
                        <img src="${
                          meal.strMealThumb
                        }" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text"> ${meal.strInstructions.slice(
                              0,
                              200
                            )}</p>

                                <div class="buttons">
                            <button onclick="moreInfoData(${
                              meal.idMeal
                            })" type="button" class="btn btn-success">More Details</button>
                        </div>
                        </div>
                    
                        </div>
                    </div>
        `;
      container.appendChild(div);
    }
  }
}

const moreInfoData=(idMeal)=>{
    const err =document.getElementById('err2')
    err.style.display = "none";
    // console.log(idMeal)
    const url = ` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal} `;
    fetch(url)
      .then((res) => res.json())
      .then((data) => innerMainInfo(data.meals[0]));
}

const innerMainInfo=(details)=>{
    // console.log(details);
    const largeInfoContainer = document.getElementById("large-container");
    largeInfoContainer.textContent="";
    const div = document.createElement('div')
    div.innerHTML = `
                    <div class="card" "style="width:15rem" ;>
            <img src="${details.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${details.strMeal}</h5>
                <h6> Food Category: ${details.strCategory}</h6>
                <p class="card-text">${details.strInstructions.slice(
                  0,
                  200
                )}</p>
                <p class=""> ${details.strSource}  </p>
                <a href="${
                  details.strYoutube
                }" class="btn btn-primary">Watch video</a>
            </div>
            </div>
    
    `;
    largeInfoContainer.appendChild(div);
}