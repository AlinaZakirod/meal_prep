 document.getElementById("newPlanForm").onsubmit = function(e){
    e.preventDefault();

    // alert('hello')


    let planResultDiv = $('divForPlanResults')
    planResultDiv.html('')

    let searchForPlan = $('#newPlanForm').val()

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



   searchTerm = '';
   searchTerm += '&from=0&to=3&calories='+ kcal
   searchTerm += '&nutrients[CHOCDF]=' + carbs
   searchTerm += '&nutrients[FAT]=' + fat
   searchTerm += '&nutrients[PROCNT]=' + protein
   
   searchTerm += '&diet=' + diet
   searchTerm += 'q=' + fav
   searchTerm += "excluded=" + allergy
    
    axios.get('http://localhost:3000/plans/new')
      .then((result) => {
        let kcal = document.querySelector('#newPlanForm input[name="kcal"]').value
        let carbs = document.querySelector('#newPlanForm input[name="carbs"]').value
        let fat = document.querySelector('#newPlanForm input[name="fat"]').value
        let protein = document.querySelector('#newPlanForm input[name="protein"]').value 
        let diet = document.getElementById('diet').value
        let fav = document.querySelector('#newPlanForm input[name="fav"]').value
        let allergy = document.querySelector('#newPlanForm input[name="allergy"]').value
      })
      .catch((err) => {
        console.log("error while sending form inputs to the backend: ", err)
      })

// 'https://api.edamam.com/search?q=chicken&app_id=$f8e66ec4&app_key=$9741c69dc99cb5c20165983a131f9890&from=0&to=3&calories=591-722&health=alcohol-free'

}

// $('divForPlanResults').append(`<h3>New meal ${result}</h3>`)
// https://api.edamam.com/search?app_id=$f8e66ec4&app_key=$9741c69dc99cb5c20165983a131f9890