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
   

    axios.post('http://localhost:3000/plans/create', formInputToSend)
    .then(response => {
      console.log('post successful and the response is: ', response.data );
      // debugger;
      $('#divForPlanResults').prepend(`<h4>${response.data.hits[0].recipe.label}</h4><img class ="newmealImage" src='${response.data.hits[0].recipe.image}'<br><p>Calories: ${response.data.hits[0].recipe.calories}</p><form><form><button class="addMealFromApi">Add To The Plan</button></form>`)
      $('#divForPlanResults').prepend(`<h4>${response.data.hits[1].recipe.label}</h4><img class ="newmealImage" src='${response.data.hits[1].recipe.image}'<br><p>Calories: ${response.data.hits[1].recipe.calories}</p><form><button class="addMealFromApi">Add To The Plan</button></form>`)
      $('#divForPlanResults').prepend(`<h4>${response.data.hits[2].recipe.label}</h4><img class ="newmealImage" src='${response.data.hits[2].recipe.image}'<br><p>Calories: ${response.data.hits[2].recipe.calories}</p><form><button class="addMealFromApi">Add To The Plan</button></form>`)

      $('body').on('click', '.addMealFromApi', function(event){
        event.preventDefault()
        console.log("nah");
        const target = $(event.target)
        target.text( "Added" );
        const parent = target.parent().parent()
        $(`parent :nth-child(1)`).css( "background-color", "red" );
      })
      
    })
    .catch(error => {
      console.log('Oh No! Error is: ', error);  
    })

  }

