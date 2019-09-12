 document.getElementById("newPlanForm").onsubmit = function(e){
    e.preventDefault();

    // alert('hello')


    let planResultDiv = $('divForPlanResults')
    planResultDiv.html('')

    let searchForPlan = $('#newPlanForm').val();

    const formInputToSend = {
        //we get values from the form here
        newTitle: document.querySelector('#newPlanForm input[name="title"]').value,
        kcal: document.querySelector('#newPlanForm input[name="kcal"]').value,
        carbs: document.querySelector('#newPlanForm input[name="carbs"]').value,
        fat: document.querySelector('#newPlanForm input[name="fat"]').value,
        protein: document.querySelector('#newPlanForm input[name="protein"]').value, 
        diet: document.getElementById('diet').value,
        fav: document.querySelector('#newPlanForm input[name="fav"]').value,
        allergy: document.querySelector('#newPlanForm input[name="allergy"]').value
      };
   

    axios.post('http://localhost:3000/plans/create', formInputToSend)
    .then(response => {
      console.log('post successful and the response is: ', response.data );
      // debugger;
      $('#divForPlanResults').prepend(`<h4>${response.data.hits[0].recipe.label}</h4><img src='${response.data.hits[0].recipe.image}'<br><p>Calories: ${response.data.hits[0].recipe.calories}</p><form><button class="addMealFromApi">Add To The Plan</button></form>`)
      $('#divForPlanResults').prepend(`<h4>${response.data.hits[1].recipe.label}</h4><img src='${response.data.hits[1].recipe.image}'<br><p>Calories: ${response.data.hits[1].recipe.calories}</p><form><button class="addMealFromApi">Add To The Plan</button></form>`)
      $('#divForPlanResults').prepend(`<h4>${response.data.hits[2].recipe.label}</h4><img src='${response.data.hits[2].recipe.image}'<br><p>Calories: ${response.data.hits[1].recipe.calories}</p><form action="/plans/create" method="POST"><button class="addMealFromApi">Add To The Plan</button></form>`)
    })
    .catch(error => {
      console.log('Oh No! Error is: ', error);  
    })
    
        // function addMealFromApi() {
        //   axios.post('http://localhost:3000/meals/create', {
        //     title: title?,
        //     kcal: kcal?
        //   })
        //   .then(result => {
        //       console.log("Then I need to push it into       plan._menuObjects array and display success message ", result)
        //   })
        //   .catch(err => {
        //     console.log('error while adding meal from API to db:' + err)
        // })

       const addButton = document.getElementsByClassName("addMealFromApi") 
      
       function put(e){
        let print = e.currentTarget.previousSibling.innerHTML
        console.log(print)
      }
      put(addButton)
  }









 