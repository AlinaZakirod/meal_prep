 document.getElementById("newPlanForm").onsubmit = function(e){
    e.preventDefault();

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
   

    axios.post('/plans/create', formInputToSend)
    .then(response => {
      console.log('post successful and the response is: ', response.data );
      // debugger;
      $('#divForPlanResults').prepend('<div id="mealResultBoxOne" class="mealResultBox" style="width:30%; display:inline;float:left"></div>')
      $('#mealResultBoxOne').append(`<h4>${response.data.hits[0].recipe.label}</h4><img class ="newmealImage" src='${response.data.hits[0].recipe.image}'<br><p>Calories: ${response.data.hits[0].recipe.calories}</p><form><form><button class="addMealFromApi">Add To The Plan</button></form>`)

      $('#divForPlanResults').prepend('<div id="mealResultBoxTwo" class="mealResultBox" style="width:30%; display:inline;float:left"></div>')
      $('#mealResultBoxTwo').append(`<h4>${response.data.hits[1].recipe.label}</h4><img class ="newmealImage" src='${response.data.hits[1].recipe.image}'<br><p>Calories: ${response.data.hits[1].recipe.calories}</p><form><button class="addMealFromApi">Add To The Plan</button></form>`)

      $('#divForPlanResults').prepend('<div id="mealResultBoxThree" class="mealResultBox" style="width:30%; display:inline;float:left"></div>')
      $('#mealResultBoxThree').append(`<h4>${response.data.hits[2].recipe.label}</h4><img class ="newmealImage" src='${response.data.hits[2].recipe.image}'<br><p>Calories: ${response.data.hits[2].recipe.calories}</p><form><button class="addMealFromApi">Add To The Plan</button></form>`)

      $('body').on('click', '.addMealFromApi', function(event){
        event.preventDefault()
    
        const target = $(event.target)
        target.text( "Added" );
        const parent = target.parent().parent().css( "background-color", "red" );
        target.parent().prev().css( "background-color", "blue" );

        const mealTitle = target.parent().prev().prev().prev().text();
    
        const mealKcal = target.parent().prev().text();

        const newMealFromApi = new Object()
        newMealFromApi.title = mealTitle;
        newMealFromApi.calories = mealKcal
        console.log(newMealFromApi)

        axios.post('/meals/create', {
          title : mealTitle,
          kcal: mealKcal,
          })
          .then(response => {
            console.log("You just created a new meal rom Api: ", response.data)
          })
          .catch(err => {
            console.log("Error while adding selected meal to the DB ", err)
          })

      })
      
    })
    .catch(error => {
      console.log('Oh No! Error is: ', error);  
    })

  }

