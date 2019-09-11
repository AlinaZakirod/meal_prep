 document.getElementById("newPlanForm").onsubmit = function(e){
    e.preventDefault();

    // alert('hello')


    let planResultDiv = $('divForPlanResults')
    planResultDiv.html('')

    let searchForPlan = $('#newPlanForm').val();

    const formInputToSend = {
        //we get values from the form here
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
      console.log('post successful and the response is: ', response );
      // debugger;
      $('#divForPlanResults').prepend(`<h2>New Plan Name: ${response.data.q}</h2>`)
      $('#divForPlanResults').prepend(`<p>Calories: ${response.data.params.calories}</p>`)

    })
    .catch(error => {
      console.log('Oh No! Error is: ', error);  
    })
      
        //my local will send it to external API and will get response - meals, matching requested parameters--> I will apeend them here after the form?
  

// $('divForPlanResults').append(`<h3>New meal ${result}</h3>`)
// https://api.edamam.com/search?app_id=$f8e66ec4&app_key=$9741c69dc99cb5c20165983a131f9890


    //shifted inside of axios:
    // let kcal = document.querySelector('#newPlanForm input[name="kcal"]').value
    // console.log(kcal)
    // let carbs = document.querySelector('#newPlanForm input[name="carbs"]').value
    // console.log(carbs)
    // let fat = document.querySelector('#newPlanForm input[name="fat"]').value
    // console.log(fat)
    // let protein = document.querySelector('#newPlanForm input[name="protein"]').value
    // console.log(protein)  
    // let diet = document.getElementById('diet').value
    // // console.log('hello')
    // // console.log(document.getElementById('diet'))
    // console.log(diet)
    // let fav = document.querySelector('#newPlanForm input[name="fav"]').value
    // console.log(fav) 
    // let allergy = document.querySelector('#newPlanForm input[name="allergy"]').value
    // console.log(allergy) 
  }