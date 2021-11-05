


// document.getElementById("basketconfirm").addEventListener("click", function(){

//     if (confirm("Do you want to confirm your order"))
// {

// } else {
// history.go(-1);
// }
    
// })

var myModal = document.getElementById('myInput')
var myInput = document.getElementById('myModal')

myInput.addEventListener('shown.bs.modal', function () {
  myModal.focus()
})