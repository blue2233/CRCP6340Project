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
        let obj = {
            sub: "Someone contacted you from your website!",
            txt: `${document.querySelector("#firstName").value}
            ${document.querySelector("#lastName").value}
            sent you a message that read ${document.querySelector("#message").value}.
            Their email address is ${document.querySelector("#email").value
                }.`
        };
        fetch("/mail", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        .then((r) => r.json())
        .then((response) => {
            document.querySelector("#contact-button-response").innerHTML = response.result;
        })
        .then(() => {
            setTimeout(() => {
                document.querySelector("#contact-button-response").innerHTML = "";
            }, "5000");
        });
    }

})();