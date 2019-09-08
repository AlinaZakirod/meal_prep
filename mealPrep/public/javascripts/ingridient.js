$( document ).ready(function() {

  let theForm = $('#searchForm');


    theForm.submit(function(e){

        e.preventDefault();

        //to put info from API in THIS div
        let theDiv = $('ingrid');

        theDiv.html('') //to empty div 

        let searchTerm = $('#theInput').val()


    axios.get('https://api.edamam.com/api/food-database/parser?app_id=522bfc01&app_key=15f84bd55ca991de46a8878ead9a9107&dietLabels&ingr=' + searchTerm)
      .then((result) => {

        console.log(result.data.hints[0].food.label)
        console.log(result.data.hints[0].food.nutrients.ENERC_KCAL)


        let theActualIngridient = result.data;
        let theLabel = theActualIngridient.hints[0].food.label;
        let kcal =theActualIngridient.hints[0].food.nutrients.ENERC_KCAL
        
        // let theLabel = theActualIngridient.food.hints[0].food.label;
        // let theFat = theActualIngridient.food.hints[0].food.nutrients[2];


        
        $('#searchForm').append(`<h2> Name: ${theLabel}</h2>`);
        // $('#searchForm').append(`<br>`)
        $('#searchForm').append(`<p> Caloric content is: ${kcal}</p>`)

        $('#searchForm').val('')
      
      })
      .catch((err) => {
        console.log(err);
      })

})

}) // end document ready































// const ingridientApi = axios.get({
//   baseUrl: 'https://api.edamam.com/api/food-database/parser?app_id=522bfc01&app_key=15f84bd55ca991de46a8878ead9a9107&'
// })

// function getIngridientInfo(theName) {
//   ingridientApi.get(
//     `ingr=${theName}&dietLabels&`
//   )
//   then(responseFromApi => {
//     console.log("Response from API is ", responseFromApi.data);
//   })
//   .catch(err => {
//     console.log('error is: ', err)
//   })
// }

// document.getElementById('theButton').onclick = function(){
//   const ingr = document.getElementById('theInput').value;
//   getIngridientInfo(ingr)
// }

