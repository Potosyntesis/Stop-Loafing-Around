window.onload = loadData;

function loadData() {
  document.getElementById("display_recipes").onclick = checkButtonPress;


    var db = firebase.firestore();
    var recipeRef = db.collection("recipe").orderBy("name").limit(25);
    var documents = null;

    return recipeRef.get().then((docData) => {
        // Get the last visible document
        documents = docData.docs.map(doc => doc.data());
        console.log("last", documents);

        for(let i = 0; i < documents.length; i++){
            displayRecipeCard(i , documents[i].name);

            var storeageRef = firebase.storage().ref();
            var imgRef = storeageRef.child(documents[i].name +'/mainImage/ImgFile');
        
            document.getElementById("title"+i).innerHTML = documents[i].name;
            document.getElementById("link"+i).innerHTML = documents[i].name;

            

            imgRef.getDownloadURL().then((url) => {
        
                console.log(url);
            
                // Or inserted into an <img> element
                var img = document.getElementById("thumbnail"+i);
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
    });

}

function displayRecipeCard(index, value){
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.getElementById("display_recipes").appendChild(clon);

    document.getElementById("thumbnail").id = "thumbnail"+index;
    document.getElementById("title").id = "title"+index;
    document.getElementById("link").id = "link"+index;
    document.getElementById("imageLink").id = "imageLink"+index;

    document.getElementById("link"+index).setAttribute("data-value",value);
    document.getElementById("imageLink"+index).setAttribute("data-value",value);

}

function checkButtonPress(e){
  button_press_id = e.target.id;
  button_press_value = e.target.value;

  console.log(e.target.id);

  var pressValue = document.getElementById(e.target.id);

  var dataValue = pressValue.getAttribute('data-value');

  localStorage.setItem("FireData", dataValue);
}


