document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    let formData = new FormData(this); // Captura los datos del formulario

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let checkbox = document.getElementById("consent");
    let queryOptions = document.querySelectorAll('input[name="queryType"]');
    let successMessage = document.getElementById("successMessage");

    // Eliminar mensajes de error anteriores
    document.querySelectorAll(".error-message").forEach(error => error.remove());

    let isValid = true;

    // 🔹 Validación de campos vacíos
    function validateField(field) {
        if (field.value.trim() === "") {
            let error = document.createElement("p");
            error.textContent = "Este campo es obligatorio.";
            error.className = "error-message";
            error.style.color = "red";
            field.parentNode.appendChild(error);
            isValid = false;
        }
    }

    validateField(firstName);
    validateField(lastName);
    validateField(email);
    validateField(message);

    // 🔹 Validación del checkbox
    if (!checkbox.checked) {
        let checkboxError = document.createElement("p");
        checkboxError.textContent = "Debes aceptar los términos.";
        checkboxError.className = "error-message";
        checkboxError.style.color = "red";
        checkbox.parentNode.appendChild(checkboxError);
        isValid = false;
    }

    // 🔹 Validación de los radio buttons (Tipo de consulta)
    let selectedQuery = document.querySelector('input[name="queryType"]:checked');
    if (!selectedQuery) {
        let queryError = document.createElement("p");
        queryError.textContent = "Selecciona un tipo de consulta.";
        queryError.className = "error-message";
        queryError.style.color = "red";
        queryOptions[0].parentNode.parentNode.insertAdjacentElement("afterend", queryError);
        isValid = false;
    } else {
        formData.append("queryType", selectedQuery.value);
    }

    // 🔹 Si todo es válido, mostrar mensaje de éxito
    if (isValid) {
        fetch("enviar.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.text()) // Obtiene la respuesta en texto
            .then(data => {
                console.log("Respuesta del servidor:", data);
                successMessage.classList.remove("d-none");
                document.getElementById("successMessage").classList.add("show");

                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.classList.add("d-none");
                }, 5000);

                // Reiniciar el formulario después del envío
                document.getElementById("contactForm").reset();
            })
            .catch(error => console.error("Error en la solicitud:", error));
    }

    // 🔹 Si todo es válido, enviar formulario y mostrar mensaje de éxito

});
