window.onload = checkButtonPress;

function checkButtonPress() {
    document.getElementById("step_display").onclick = step_buton;
    document.getElementById("ingredient_display").onclick = ingred_buton;
}

//Will delete the ingredient input card
function delete_Ingred_Card() {
    var ingred_card = document.getElementById("ingred_Card");
    if (ingred_card) {
        ingred_card.parentNode.removeChild(ingred_card);
        display_first_ingred = true;
    }
    return false;
}

//Will delete the Step input card
function delete_Step_Card() {
    var step_card = document.getElementById("step_Card")
    if (step_card) {
        step_card.parentNode.removeChild(step_card);
        display_first_step = true;
    }
    return false;
}

function mainPreview(event) {
    var img_show = document.getElementById("main_preview");
    img_show.src = URL.createObjectURL(event.target.files[0]);
}

class storedRecipe {
    constructor(title, ingredients, steps) {
        this.title = title;
        this.recipe_Ingred = ingredients;
        this.recipe_Step = steps
    }
}

function finialize_recipe() {
    var recipe_Title = document.getElementById("recipe_title");
    var mainImg = document.getElementById("main_img");


    if (recipe_Title.value == "") {
        document.getElementById("title_error").innerHTML = "*Enter a Recipe Name"
    } else {
        addToStepStorage();
        addToIngredientStorage();


        var db = firebase.firestore();
        var documents = null;


        var SaveToDB = new storedRecipe(recipe_Title.value, ingred_data, step_data);

        uploadMainImg(mainImg.files[0], recipe_Title.value);
        for(var i = 0; i < SaveToDB.recipe_Step.length; i++){
            if(SaveToDB.recipe_Step[i].img){
                uploadStepImg(SaveToDB.recipe_Step[i].img, recipe_Title.value, i);

            }
        }


        db.collection("recipe").doc(String(SaveToDB.title)).set({
            name: String(SaveToDB.title),
            ingredients: JSON.stringify(SaveToDB.recipe_Ingred),
            steps: JSON.stringify(SaveToDB.recipe_Step)
        })
            .then(() => {
                console.log("Data saved");
            })
            .catch((error) => {
                console.error("something wrong: ", error)
            })

        // location.href = "./index.html";
    }
}

 function uploadMainImg(file, pathName) {

    var storeageRef = firebase.storage().ref();

    var metadata = {
        contentType: 'image'
    };

    var uploadTask = storeageRef.child(pathName +'/mainImage/ImgFile').put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}

function uploadStepImg(file, pathName, index){
    var storeageRef = firebase.storage().ref();

    var metadata = {
        contentType: 'image'
    };

    var uploadTask = storeageRef.child(pathName +'/steps/step'+index+'/ImgFile').put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}


