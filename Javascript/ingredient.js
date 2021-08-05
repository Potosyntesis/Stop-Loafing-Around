//array to store data
var temp_ingred_data = [];
var ingred_data = [];
//card ID for Ingredients
var ingred_ID = 0;
var display_first_ingred = true;
//class for data to be stored in the array
class storedIngred {
    constructor(amount, unit, name) {
      this.amount = amount;
      this.unit = unit;
      this.name = name;
    }
  }

//Display the ingredient input card using the template
function ingredient_Card(){
    var display_next = true;

    //Variables for Document Inputs
    var ingred_amount = document.getElementById("amount");
    var ingred_unit = document.getElementById("unit");
    var ingred_name = document.getElementById("ingred");

    var error_msg = document.getElementById("ingred_error_msg");

    var ingred_card = document.getElementById("ingred_Card");

    //check if ingredient card is already displayed
    if(ingred_card){
        if(ingred_amount.value == '' || ingred_name.value == ''){
            error_msg.innerHTML = "*Please enter empty fields"
            display_next = false;
            //will not display if the fields are empty
        }else{
            ingred_card.parentNode.removeChild(ingred_card);
            display_next = true;
        }
    }

    //variable for displaying the ingredient card template
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);

    //will display the card without storing data
    if(display_first_ingred){
        document.getElementById("ingredient_List").appendChild(clon);
        display_first_ingred = false;
    }else if(display_next){
        //stores the data into the array
        temp_ingred_data.push(new storedIngred(ingred_amount.value, ingred_unit.value, ingred_name.value));
        console.log(temp_ingred_data);

        display_ingredient();

        ingred_ID++;
        //creates the next card
        document.getElementById("ingredient_List").appendChild(clon);
    }
}

function display_ingredient(){
    //set variable to the last index of the array
    var myObj = temp_ingred_data[temp_ingred_data.length - 1];

    //set string for display
    var ingred_string = myObj.amount+" "+myObj.unit+", "+myObj.name;

    //create a new card for displaying the inputs
    var temp = document.getElementsByTagName("template")[2];
    var clon = temp.content.cloneNode(true);
    document.getElementById("ingredient_display").appendChild(clon);

    //change the ID of elements of the new created cards to make ID unique
    document.getElementById("ingred_display_card").id = "ingred"+ingred_ID;
    document.getElementById("ingred_input_display").id = "ingred_display"+ingred_ID;
    document.getElementById("ingred_buttons").id = "ingred_buttons"+ingred_ID;

    document.getElementById("ingred_edit").id = "ingred_edit"+ingred_ID;
    document.getElementById("ingred_remove").id = "ingred_remove"+ingred_ID;
    document.getElementById("ingred_remove"+ingred_ID).value = ingred_ID;
    document.getElementById("ingred_edit"+ingred_ID).value = ingred_ID;

    //display the string on the card
    document.getElementById("ingred_display"+ingred_ID).innerHTML = ingred_string;
}

var ing_button_press_id;
var ing_button_press_value;

function ingred_buton(e){
    if(e.target.tagName == 'BUTTON'){

        //sets the value and the ID of the button pressed into variables
        ing_button_press_id = e.target.id;
        ing_button_press_value = e.target.value;

        if(ing_button_press_id == "ingred_remove"+e.target.value){ //Delete displayed Ingredients
            //get latest card template      
            var ingred_display_card = document.getElementById("ingred"+(temp_ingred_data.length-1));

            //delete latest card template
            ingred_display_card.parentNode.removeChild(ingred_display_card);

            //Remove the chosen data from the array
            temp_ingred_data.splice(e.target.value, 1);

            //loop through the remainder of the array and update all the cards
            for(let i = 0; i < temp_ingred_data.length; i++){
                var myObj = temp_ingred_data[i];
                var ingred_string = myObj.amount+" "+myObj.unit+", "+myObj.name;
                document.getElementById("ingred_display"+i).innerHTML = ingred_string;
            }

            //Reduce the ID
            ingred_ID--;
            console.log(temp_ingred_data);

        }else if(ing_button_press_id == "ingred_edit"+e.target.value){
            //sets a variable to the object in the array using the index of the button pressed
            var ingred_Obj = temp_ingred_data[ing_button_press_value];

            var all_buttons = document.getElementsByClassName("ing-all-btn");
            console.log(all_buttons);

            var display = document.getElementById("ingred_display"+ing_button_press_value);
            var button_Group = document.getElementById("ingred_buttons"+ing_button_press_value);
            var primary_btn = document.getElementById("add_ingred_btn");

            display.innerHTML = "";

            console.log(button_Group);

            button_Group.classList.add("d-none");

            delete_Ingred_Card();
            primary_btn.setAttribute("disabled",true);

            for (let item of all_buttons) {
                item.setAttribute("disabled", true);
            }

            // all_buttons.setAttribute("disabled","");

            var temp = document.getElementsByTagName("template")[4];
            var clon = temp.content.cloneNode(true);
            document.getElementById("ingred_display"+ing_button_press_value).appendChild(clon);

            document.getElementById("igred_save_btn").value = ing_button_press_value;


            var edit_amount = document.getElementById("amount");
            var edit_unit = document.getElementById("unit");
            var edit_ingred = document.getElementById("ingred");

            edit_amount.value = ingred_Obj.amount;
            edit_unit.value = ingred_Obj.unit;
            edit_ingred.value = ingred_Obj.name;
        } else{
            var ingred_Obj = temp_ingred_data[ing_button_press_value];
            

            var edit_amount = document.getElementById("amount");
            var edit_unit = document.getElementById("unit");
            var edit_ingred = document.getElementById("ingred");

            temp_ingred_data.splice(ing_button_press_value,1,new storedIngred(edit_amount.value, edit_unit.value, edit_ingred.value))
            ingred_Obj = temp_ingred_data[ing_button_press_value];

            console.log(temp_ingred_data);


            var ingred_string = ingred_Obj.amount+" "+ingred_Obj.unit+", "+ingred_Obj.name;

            console.log(ingred_string);

            var display = document.getElementById("ingred_display"+ing_button_press_value);
            display.innerHTML = ingred_string;

            var button_Group = document.getElementById("ingred_buttons"+ing_button_press_value);
            var primaray_btn = document.getElementById("add_ingred_btn");
            var all_buttons = document.getElementsByClassName("ing-all-btn");


            button_Group.classList.remove("d-none");
            primaray_btn.removeAttribute("disabled");
            for (let item of all_buttons) {
                item.removeAttribute("disabled");
            }

            console.log(temp_ingred_data);
        }      
    }
}

function addToIngredientStorage(){
    var temp_obj;
    var ing_string;

    for(var i = 0; i < temp_ingred_data.length; i++){
        temp_obj = temp_ingred_data[i];
        ing_string = temp_obj.amount+" "+temp_obj.unit+", "+temp_obj.name;
        ingred_data.push(ing_string);
    }

    console.log(ingred_data);
}