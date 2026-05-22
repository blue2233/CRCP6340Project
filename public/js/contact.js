(function () {
  "use strict";

  let form = document.querySelector('#contact-form');

  document
    .querySelector("#contact-form-button")
    .addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formValid = true;
    if (!form.checkValidity()) {
      formValid = false;
    }
    form.classList.add('was-validated');
    if (formValid) {
      sendTheEmail();
    }
  });

function sendTheEmail() {
  console.log("You clicked the submit button.");
  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let email = document.querySelector("#email").value;
  let message = document.querySelector("#message").value;
  console.log("First Name: " + firstName);
  console.log("Last Name: " + lastName);
  console.log("Email: " + email);
  console.log("Message: " + message);
}

})();