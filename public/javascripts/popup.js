

// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.querySelector("form"); // Asignamos a esta variable la etiqueta de form 
//     const popup = document.getElementById("popup"); // Asignamos a esta variable el id con el valor popup
//     const closePopup = document.getElementById("closePopup"); // Asignamos a esta varialbe el id con el valor closePopup

//     form.addEventListener("submit", (e) => {
//         e.preventDefault(); // Evita el envío real del formulario
//        // const nombre = form.querySelector("[name='name']").value;
//         const mensaje = form.querySelector("[name='mensaje']").value;

//         //popup.classList.remove("hidden"); // Muestra el pop-up
//         //popup.querySelector(".popup-content").innerHTML = `<p>${nombre}</p><p>${mensaje}</p>`; // Inserta el contenido HTML

//         // Ejecutar scripts
//         const div = document.createElement("script");
//         div.innerHTML = mensaje;
//         document.body.appendChild(div);
//     });

//     closePopup.addEventListener("click", () => {
//         popup.classList.add("hidden"); // Oculta el pop-up al darle click
//     });

// });

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita el envío real del formulario

        const mensaje = form.querySelector("[name='mensaje']").value;

        // Escapa cualquier contenido del usuario para prevenir XSS
        const sanitizedMessage = mensaje.replace(/[&<>"']/g, (char) => {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escapeMap[char];
        });

        // Aquí puedes procesar el mensaje, como enviarlo al servidor o mostrarlo en otro lugar
        console.log("Mensaje enviado:", sanitizedMessage);
    });
});
