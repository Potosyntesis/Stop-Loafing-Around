//array to store data
var temp_step_data = [];
var step_data = [];
//card ID for steps
var step_ID = 0;
var display_first_step = true;

class temp_storedSteps {
    constructor(stepNo, step_desc, img, hour, min, sec) {
        this.step_no = stepNo;
        this.step_desc = step_desc;
        this.img = img;
        this.timer = {
          "hours": hour,
          "minutes":min,
          "seconds":sec
        };
    }
}

class storedSteps {
    constructor(stepNo, step_desc, img, seconds) {
        this.step_no = stepNo;
        this.step_desc = step_desc;
        this.img = img;
        this.timer = seconds;
    }
}



//Display the step input card using the template
function steps_Card(){
    var display_Next = true;

    //Variables for Document Inputs
    var input = document.getElementById("desc");

    var img_file = document.getElementById("imageFile");

    var input_timer_hour = document.getElementById("timer_hours");
    var input_timer_min = document.getElementById("timer_minutes");
    var input_timer_sec = document.getElementById("timer_seconds");

    var timer_hour;
    var timer_min;
    var timer_sec;

    var error_msg = document.getElementById("step_error_msg");

    var step_card = document.getElementById("step_Card");

    //check if the step card is displayed
    if(step_card){
        if(input.value == ''){
            error_msg.innerHTML = "*Please enter empty fields"
            display_Next = false;
            //will not display the next card if the fields are empty
        }else if(input_timer_hour.value.length > 2 || input_timer_min.value.length > 2 || input_timer_sec.value.length > 2){
            error_msg.innerHTML = "*Invalid timer values"
            display_Next = false;
        }else{
                if(input_timer_hour.value == ""){
                    timer_hour = "00";
                }else{
                    timer_hour = input_timer_hour.value;

                    if(timer_hour.length<2){
                        timer_hour = "0"+timer_hour;
                    }

                }

                if(input_timer_min.value == ""){
                    timer_min = "00";
                }else{
                    timer_min = input_timer_min.value;

                    if(timer_min.length<2){
                        timer_min = "0"+timer_min;
                        
                    }
                }

                if(input_timer_sec.value == ""){
                    timer_sec = "00";
                }else{
                    timer_sec = input_timer_sec.value;

                    if(timer_sec.length<2){
                        timer_sec = "0"+timer_sec;
                        
                    }
                }

            step_card.parentNode.removeChild(step_card);
            display_Next = true;
        }
    }

    //variable for displaying the step card template
    var temp = document.getElementsByTagName("template")[1];
    var clon = temp.content.cloneNode(true);

    //Will display the first card without storing data
    if(display_first_step){
        document.getElementById("steps_List").appendChild(clon);

        //sets the step number on the card
        var step_No = document.getElementById("step_number");
        step_No.innerHTML = "Step "+ (step_ID+1);
        display_first_step = false;
    } else if(display_Next){
        //displays data into the array
        temp_step_data.push(new temp_storedSteps("Step "+(step_ID+1),input.value, img_file.files[0], timer_hour, timer_min, timer_sec));

        display_Steps();

        step_ID++;
        //creates the next card
        document.getElementById("steps_List").appendChild(clon);
    
        //sets the step number on the next card
        var step_No = document.getElementById("step_number");
        step_No.innerHTML = "Step "+ (step_ID+1);
    }

}



function display_Steps(){
    //set variable to the last index of the array
    var myObj = temp_step_data[temp_step_data.length - 1];

    var step_string = myObj.step_desc;

    var step_timer_string = "Timer: " + myObj.timer.hours+":"+myObj.timer.minutes+":"+myObj.timer.seconds;

    var temp = document.getElementsByTagName("template")[3];
    var clon = temp.content.cloneNode(true);
    document.getElementById("step_display").appendChild(clon);

    document.getElementById("step_display_card").id = "step"+step_ID;
    document.getElementById("step_no").id = "step_no"+step_ID;
    document.getElementById("display_edit").id = "display_edit"+step_ID;
    document.getElementById("step_img_display").id = "step_img_display"+step_ID;
    document.getElementById("step_input_display").id = "step_input_display"+step_ID;
    document.getElementById("step_timer_display").id = "step_timer_display"+step_ID;
    document.getElementById("step_buttons").id = "step_buttons"+step_ID;

    document.getElementById("step_edit").id = "step_edit"+step_ID;
    document.getElementById("step_remove").id = "step_remove"+step_ID;

    document.getElementById("step_remove"+step_ID).value = step_ID;
    document.getElementById("step_edit"+step_ID).value = step_ID;

    document.getElementById("step_no"+step_ID).innerHTML = "Step "+(step_ID+1);
    document.getElementById("step_input_display"+step_ID).innerHTML = step_string;

    if(myObj.img){
        var img_show = document.getElementById("step_img_display"+step_ID);
        img_show.src = URL.createObjectURL(myObj.img);
    }

    if(myObj.timer.hours == "00" && myObj.timer.minutes == "00" && myObj.timer.seconds == "00"){
        
    }else{
        document.getElementById("step_timer_display"+step_ID).innerHTML = step_timer_string;
    }
}

var step_button_press_id;
var step_button_press_value;

function step_buton(e){
    if(e.target.tagName == 'BUTTON'){

        console.log(e.target.id);
        console.log(e.target.value);

        step_button_press_id = e.target.id;
        step_button_press_value = e.target.value;

        if(step_button_press_id == "step_remove"+e.target.value){
            var step_display_card = document.getElementById("step"+(temp_step_data.length-1))

            step_display_card.parentNode.removeChild(step_display_card);

            temp_step_data.splice(e.target.value, 1);

            for(let i = 0; i < temp_step_data.length; i++){
                var myObj = temp_step_data[i];
                var step_string = myObj.step_desc;
                
                document.getElementById("step_no"+i).innerHTML = "Step "+(i+1);
                document.getElementById("step_input_display"+i).innerHTML = step_string;
            
                if(myObj.img){
                    var img_show = document.getElementById("step_img_display"+i);
                    img_show.src = URL.createObjectURL(myObj.img);
                }
                var step_timer_string = "Timer: " + myObj.timer.hours+":"+myObj.timer.minutes+":"+myObj.timer.seconds;
            
                if(myObj.timer.hours == "00" && myObj.timer.minutes == "00" && myObj.timer.seconds == "00"){
                    
                }else{
                    document.getElementById("step_timer_display"+i).innerHTML = step_timer_string;
                }

            }
            step_ID--;
            document.getElementById("step_number").innerHTML = "Step "+ (step_ID+1);
        }else if(step_button_press_id == "step_edit"+e.target.value){
            var step_Obj = temp_step_data[step_button_press_value];

            var all_buttons = document.getElementsByClassName("step-all-btn");

            var display_edit = document.getElementById("display_edit"+step_button_press_value);
            var display_text = document.getElementById("step_input_display"+step_button_press_value);
            var display_img = document.getElementById("step_img_display"+step_button_press_value);
            var display_timer = document.getElementById("step_timer_display"+step_button_press_value);

            var button_Group = document.getElementById("step_buttons"+step_button_press_value);
            var primary_btn = document.getElementById("add_step_btn");

            display_text.innerHTML = "";
            display_img.src = "";
            display_timer.innerHTML = "";


            button_Group.classList.add("d-none");

            delete_Step_Card();
            primary_btn.setAttribute("disabled",true);

            for(let item of all_buttons) {
                item.setAttribute("disabled",true);
            }

            var temp = document.getElementsByTagName("template")[5];
            var clon = temp.content.cloneNode(true);
            display_edit.appendChild(clon);

            var edit_step_desc = document.getElementById("desc");

            var edit_hour = document.getElementById("timer_hours");
            var edit_min = document.getElementById("timer_minutes");
            var edit_sec = document.getElementById("timer_seconds");

            var edit_btn_img = document.getElementById("btn-check-img");
            var edit_btn_timer = document.getElementById("btn-check-timr");


            edit_step_desc.value = step_Obj.step_desc;

            if(step_Obj.img){
                edit_btn_img.setAttribute("checked", true);
                display_Image_Card();

                var img_show = document.getElementById("img_preview");
                img_show.src = URL.createObjectURL(step_Obj.img);
            }

            if(step_Obj.timer.hours == "00" && step_Obj.timer.minutes == "00" && step_Obj.timer.seconds == "00"){

            }else{
                edit_btn_timer.setAttribute("checked", true);
                display_Timer_Card();

                edit_hour.value = step_Obj.timer.hours;
                edit_min.value = step_Obj.timer.minutes;
                edit_sec.value = step_Obj.timer.seconds;
            }

            document.getElementById("step_save_btn").value = step_button_press_value;

        }else{
            var step_Obj = temp_step_data[step_button_press_value];

            var edit_step_desc = document.getElementById("desc");

            var edit_hour = document.getElementById("timer_hours");
            var edit_min = document.getElementById("timer_minutes");
            var edit_sec = document.getElementById("timer_seconds");

            var edit_timer_hour;
            var edit_timer_min;
            var edit_timer_sec;

            var edit_img = document.getElementById("imageFile");
            var temp_img_file;

            var edit_btn_img = document.getElementById("btn-check-img");
            var edit_btn_timer = document.getElementById("btn-check-timr");


            if(edit_img.files.length == 0){
                temp_img_file = step_Obj.img;
            }else{
                temp_img_file = edit_img.files[0];
            }

            if(edit_hour.value == ""){
                edit_timer_hour = "00";
            }else{
                edit_timer_hour = edit_hour.value;
                if(edit_timer_hour.length<2){
                    edit_timer_hour = "0"+edit_timer_hour;
                }
            }

            if(edit_min.value == ""){
                edit_timer_min = "00";
            }else{
                edit_timer_min = edit_min.value;
                if(edit_timer_min.length<2){
                    edit_timer_min = "0"+edit_timer_min;
                }
            }

            if(edit_sec.value == ""){
                edit_timer_sec = "00";
            }else{
                edit_timer_sec = edit_sec.value;
                if(edit_timer_sec.length<2){
                    edit_timer_sec = "0"+edit_timer_sec;
                }
            }

            temp_step_data.splice(step_button_press_value,1,new temp_storedSteps(edit_step_desc.value, temp_img_file, edit_timer_hour, edit_timer_min, edit_timer_sec))
            step_Obj = temp_step_data[step_button_press_value];

            var all_buttons = document.getElementsByClassName("step-all-btn");
            var button_Group = document.getElementById("step_buttons"+step_button_press_value);
            var primary_btn = document.getElementById("add_step_btn");

            var display_edit = document.getElementById("display_edit"+step_button_press_value);
            var display_text = document.getElementById("step_input_display"+step_button_press_value);
            var display_img = document.getElementById("step_img_display"+step_button_press_value);
            var display_timer = document.getElementById("step_timer_display"+step_button_press_value);

            var timer_display = "Timer: " + step_Obj.timer.hours+":"+step_Obj.timer.minutes+":"+step_Obj.timer.seconds;

            display_edit.innerHTML = "";
            display_text.innerHTML = step_Obj.step_desc;
            if(step_Obj.img){
                display_img.src = URL.createObjectURL(step_Obj.img);
            }
            
            if(step_Obj.timer.hours == "00" && step_Obj.timer.minutes == "00" && step_Obj.timer.seconds == "00"){
        
            }else{
                display_timer.innerHTML = timer_display;
            }

            button_Group.classList.remove("d-none");
            primary_btn.removeAttribute("disabled");
            for (let item of all_buttons) {
                item.removeAttribute("disabled");
            }
        }
    }
}


//Will display the card to allow image input
function display_Image_Card(){
    var check = document.getElementById("btn-check-img");
    var img_card = document.getElementById("add_img");
    
    if(check.checked == true){
        img_card.style.display = "block";
    }else{
        img_card.style.display = "none";
    }
}

//Will display the card to add timer to the step
function display_Timer_Card(){
    var check = document.getElementById("btn-check-timr");
    var timer_card = document.getElementById("add_timer");

    if(check.checked == true){
        timer_card.style.display = "block";
    }else{
        timer_card.style.display = "none";
    }
}

function preview_change(event){
    var img_show = document.getElementById("img_preview");
    img_show.src = URL.createObjectURL(event.target.files[0]);
}

function calculation(hour , min, sec){
    var total;
    var hour_min;
    var min_sec;

    if(hour == "00"){
        hour = 0;
    }
    if(min == "00"){
        min = 0;
    }
    if(sec == "00"){
        sec = 0;
    }

    hour_min = parseInt(hour*60);
    console.log(hour_min);
    min_sec = parseInt((hour_min+min)*60);
    console.log(min_sec)
    total = parseInt(min_sec+sec);
    console.log(total)

    return total;
}

function addToStepStorage(){
    var temp_obj;

    var timer;
    for(var i = 0; i < temp_step_data.length; i++){
        temp_obj = temp_step_data[i];
        timer = calculation(temp_obj.timer.hours, temp_obj.timer.minutes, temp_obj.timer.seconds);
        step_data.push(new storedSteps(temp_obj.step_no,temp_obj.step_desc,temp_obj.img,timer));
    }
    console.log(step_data);
}