const openFormButton = document.getElementById('openFormButton');
const closeFromButton = document.getElementById('closeFormButton');
const popupForm = document.getElementById('popupForm');


$(function(){
    $(".formcarryForm").submit(function(e){
      e.preventDefault();
      var href = $(this).attr("action");
      
      $.ajax({
          type: "POST",
          url: href,
          data: new FormData(this),
          dataType: "json",
          processData: false,
          contentType: false,
          success: function(response){
            if(response.status == "success"){
                alert("We received your submission, thank you!");
            }
            else if(response.code === 422){
              alert("Field validation failed");
              $.each(response.errors, function(key) {
                $('[name="' + key + '"]').addClass('formcarry-field-error');
              });
            }
            else{
              alert("An error occured: " + response.message);
            }
          },
          error: function(jqXHR, textStatus){
            const errorObject = jqXHR.responseJSON
  
            alert("Request failed, " + errorObject.title + ": " + errorObject.message);
          },
          complete: function(){
            history.pushState({ formOpen: false }, '', '/');
            popupForm.style.display = 'none';
          }
      });
    });
  });


openFormButton.addEventListener('click', function() {
    popupForm.style.display = 'block';
  });

openFormButton.addEventListener('click', function() {
  popupForm.style.display = 'block';
  history.pushState({ formOpen: true }, '', '?formOpen=true');
  openFormButton.style.display = "none";
});

closeFormButton.addEventListener('click', function() {
  history.pushState({ formOpen: false }, '', '/');
  popupForm.style.display = 'none';
  openFormButton.style.display = "block";
});

window.addEventListener('popstate', function(event) {
  if (event.state && event.state.formOpen) {
    popupForm.style.display = 'block';
  } else {
    popupForm.style.display = 'none';
  }
});
