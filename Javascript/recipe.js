window.onload = pullData;

class Recipe{
    constructor (name,ingredients,steps){
        this.name = name;
        this.ingredients = ingredients;
        this.steps = steps;
    }
}

function pullData(){
    var FireData = localStorage.getItem("FireData");

    var db = firebase.firestore();

    var recipeConverter = {
        toFirestore: function(recipe){
            return{
                name: recipe.name,
                ingredients: recipe.ingredients,
                steps: recipe.steps
            };
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            return new Recipe(data.name, data.ingredients, data.steps);
        }
    }

    db.collection("recipe").doc(FireData)
    .withConverter(recipeConverter)
    .get().then((doc)=>{
            var recipe = doc.data();
            console.log(recipe);
            recipe.ingredients = JSON.parse(recipe.ingredients);
            recipe.steps = JSON.parse(recipe.steps);
            console.log(recipe);

            downloadMainImg(recipe.name);

            document.getElementById("recipe-display-name").innerHTML = recipe.name;

            for(var i = 0; i < recipe.ingredients.length; i++){
                document.getElementById("display-stored-igred").innerHTML += recipe.ingredients[i]+"<br>";
            }

            for(var i = 0; i < recipe.steps.length; i++){
                display_step_cards(i);
                document.getElementById("step_no"+i).innerHTML = recipe.steps[i].step_no;
                document.getElementById("step_input_display"+i).innerHTML = recipe.steps[i].step_desc;
                if(!recipe.steps[i].timer == 0){
                    console.log(recipe.steps[i].step_no);
                    var timer = calculation(recipe.steps[i].timer);


                    if(timer.hours.length<2){
                        timer.hours = String("0"+timer.hours);
                    }

                    if(timer.minutes.length<2){
                        timer.minutes = String("0"+timer.minutes);            
                    }

                    if(timer.seconds.length<2){
                        timer.seconds = String("0"+timer.seconds);
                    }

                    var timer_string = "Timer: " + timer.hours+":"+timer.minutes+":"+timer.seconds


                    document.getElementById("step_timer_display"+i).innerHTML = timer_string;
                }
                downloadStepImg(recipe.name,i);
            }

    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}

function display_step_cards(step_ID){
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.getElementById("display-stored-steps").appendChild(clon);

    document.getElementById("step_display_card").id = "step"+step_ID;
    document.getElementById("step_no").id = "step_no"+step_ID;
    document.getElementById("step_img_display").id = "step_img_display"+step_ID;
    document.getElementById("step_input_display").id = "step_input_display"+step_ID;
    document.getElementById("step_timer_display").id = "step_timer_display"+step_ID;
}

function calculation(timer){
    var seconds = timer % 60;
    var temp_minutes = (timer-seconds)/60;
    var minutes = temp_minutes%60;
    var hours = (temp_minutes-minutes)/60;
    
    console.log("sec "+seconds);
    console.log("min "+minutes);
    console.log("hour "+hours);
    console.log("temp_min "+temp_minutes);

    return {
        seconds,
        minutes,
        hours
    }
}

function downloadMainImg(pathName){

    var storeageRef = firebase.storage().ref();
    var imgRef = storeageRef.child(pathName +'/mainImage/ImgFile');

    imgRef.getDownloadURL().then((url) => {

        console.log(url);
    
        // Or inserted into an <img> element
        var img = document.getElementById("mainImgDisplay");
        img.setAttribute('src', url);

    })
    .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
      
          // ...
      
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
}

function downloadStepImg(pathName, index){

    var storeageRef = firebase.storage().ref();

    var imgRef = storeageRef.child(pathName +'/steps/step'+index+'/ImgFile');

    imgRef.getDownloadURL().then((url) => {

        console.log(url);
    
        // Or inserted into an <img> element
        var img = document.getElementById("step_img_display"+index);
        img.setAttribute('src', url);

    })
    .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
      
          // ...
      
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
}






