$(document).getElementById("newPlanForm").onsubmit = function(e){
    e.preventDefault();

    let theKcal = req.body.params.calories

    let planResultDiv = $('divForPlanResults')
    planResultDiv.html('')

    let searchForPlan = $('#newPlanForm').val()
    
    axios.get('https://api.edamam.com/search?app_id=$f8e66ec4&app_key=$9741c69dc99cb5c20165983a131f9890&'+ searchForPlan)
      .then((result) => {
        console.log(result.data)
        // $('divForPlanResults').append(`<h3>New meal ${result}</h3>`)
      })
      .catch((err) => {
        console.log(err)
      })

// 'https://api.edamam.com/search?q=chicken&app_id=$f8e66ec4&app_key=$9741c69dc99cb5c20165983a131f9890&from=0&to=3&calories=591-722&health=alcohol-free'

})