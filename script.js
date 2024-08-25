document.addEventListener("DOMContentLoaded", function() {
    const keyContainer = document.getElementById("key-container");
    const inicioContainer = document.getElementById("inicio");
    const keyInput = document.getElementById("key-input");
    const keySubmit = document.getElementById("key-submit");

    keySubmit.addEventListener("click", function() {
        const key = keyInput.value;
        if (key === "Dozer-xit") {
            keyContainer.style.display = "none";
            inicioContainer.style.display = "block";
        } else {
            alert("🤬¡Contraseña incorrecta!〽️");
        }
    });

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const valor = parseFloat(document.getElementById("valor").value).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Generar una referencia aleatoria con la letra M al principio
        function generarReferencia() {
            const longitud = 7; // Longitud de la parte numérica
            let referencia = 'M';
            for (let i = 0; i < longitud; i++) {
                referencia += Math.floor(Math.random() * 10);
            }
            return referencia;
        }

        const referencia = generarReferencia();

        // Generar el contenido del comprobante
        const content = `
            <div class="top-image">
                <img src="https://i.postimg.cc/7Ls6sfsv/Picsart-24-08-25-02-28-55-342.jpg" alt="Imagen principal" style="width: 100%; max-width: 400px; display: block; margin: 0 auto; margin-bottom: 20px;">
            </div>
            <div class="status"></div>
            <div class="detail">
                <span>Para</span>
                ${nombre}
            </div>
            <div class="detail">
                <span>¿Cuánto?</span>
                $ ${valor}
            </div>
            <div class="detail">
                <span>Número Nequi</span>
                ${telefono}
            </div>
            <div class="detail">
                <span>Fecha</span>
                ${new Date().toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })} a las ${new Date().toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })}
            </div>
            <div class="reference">
                <span>Referencia</span><br>
                ${referencia}
            </div>
            <div class="detail" style="margin-top: 30px;">
                <span class="plata-label">¿De dónde salió la plata?</span>
            </div>
            <div class="account-balance">
                <img src="https://i.postimg.cc/6qy3vkM2/Picsart-24-08-03-01-26-01-809.png" alt="icon">
                <div>
                    <span class="available-label">Disponible</span>
                    <span class="amount">$ ${valor.split(',')[0]}<small>,${valor.split(',')[1]}</small></span>
                </div>
            </div>
            <a href="#" class="problem-link">
                <img src="https://i.postimg.cc/qRKyS8yf/pixelcut-export-1.jpg" alt="Problema con el movimiento" style="width: 100%; display: block; margin: 20px auto 0 auto;">
            </a>
        `;

        // Mostrar el comprobante y ocultar el formulario
        document.getElementById("inicio").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.getElementById("content").innerHTML = content;
    });

    // Formatear el número de teléfono mientras se escribe
    const telefonoInput = document.getElementById("telefono");

    telefonoInput.addEventListener("input", function(event) {
        let input = event.target.value.replace(/\D/g, ''); // Eliminar todos los caracteres que no son dígitos

        if (input.length > 3 && input.length <= 6) {
            input = `${input.slice(0, 3)} ${input.slice(3)}`;
        } else if (input.length > 6) {
            input = `${input.slice(0, 3)} ${input.slice(3, 6)} ${input.slice(6, 10)}`;
        }

        event.target.value = input.substring(0, 12); // Limitar la longitud a 12 caracteres incluyendo espacios
    });
});