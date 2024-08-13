(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
         
      }, false)
    })
  })()



  const closeButtons = document.querySelectorAll('[data-dismiss-target]');

  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSelector = button.getAttribute('data-dismiss-target');
      const alertBox = document.querySelector(targetSelector);
      if (alertBox) {
        alertBox.style.display = 'none'; // Hide the alert box
      }
    });
  });


  let btn = document.querySelector("#btn")

  i = 0
  btn.addEventListener("click",()=>{
    let gsts = document.querySelectorAll("#gsts")

for(let gst of gsts){

    if(gst.style.display != "inline"){
      gst.style.display = "inline" ;
    }
    else{
      gst.style.display ="none"
    }
  }
  })



