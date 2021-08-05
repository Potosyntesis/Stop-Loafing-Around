var nameInput = document.querySelector('#name_field');
var emailInput = document.querySelector('#email_field');
var phoneInput = document.querySelector('#phone_field');
var messageInput = document.querySelector('#message_field');
var error = document.querySelector('#error');
var form = document.querySelector('#form')
var display_link = document.querySelector('#hide_show')
var ebody;

form.addEventListener('submit', submit);



function submit(e){
    e.preventDefault();


    console.log('test');
    if(nameInput.value == ''){
        error.innerHTML = '*Please enter Name';
    }else if(emailInput.value == ''){
        error.innerHTML = '*Please enter Email';
    }else if(phoneInput.value == ''){
        error.innerHTML = '*Please enter Phone';
    }else if(messageInput.value == ''){
        error.innerHTML = '*Please enter Message';
    }else{
        error.innerHTML = '';
        ebody = 'Name: ' + nameInput.value + '\r\n' + 'Email: ' + emailInput.value + '\r\n' + 'Phone Number: ' + phoneInput.value + '\r\n\r\n' + messageInput.value+ '\r\n'; 
        ebody = encodeURIComponent(ebody);
        window.open(`mailto:test@example.com?subject=Contact Me&body=${ebody}`)
    }

}

function display(){
    if (display_link.style.display === "none") {
        display_link.style.display = "block";
      } else {
        display_link.style.display = "none";
      }
}