document.addEventListener("DOMContentLoaded", function() {
    const keyContainer = document.getElementById("key-container");
    const inicioContainer = document.getElementById("inicio");
    const idInput = document.getElementById("id-input");
    const keyInput = document.getElementById("key-input");
    const keySubmit = document.getElementById("key-submit");

    keySubmit.addEventListener("click", function() {
        const id = idInput.value;
        const key = keyInput.value;

        fetch("registros.txt")
            .then(response => response.text())
            .then(data => {
                const registros = data.split("\n").map(linea => linea.split(","));
                const registroValido = registros.some(registro => registro[0] === id && registro[1] === key);

                if (registroValido) {
                    keyContainer.style.display = "none";
                    inicioContainer.style.display = "block";
                } else {
                    alert("🤬¡ID o contraseña incorrectos!〽️");
                }
            })
            .catch(error => {
                console.error("Error al verificar el ID y la contraseña:", error);
                alert("Error al verificar el ID y la contraseña. Inténtalo de nuevo más tarde.");
            });
    });

    const telefonoInput = document.getElementById("telefono");

    telefonoInput.addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value; // Aquí no se aplica ningún formato, solo se deja el número plano
    });

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const valor = parseFloat(document.getElementById("valor").value).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        function generarReferencia() {
            const longitud = 8;
            let referencia = 'M';
            for (let i = 0; i < longitud; i++) {
                referencia += Math.floor(Math.random() * 10);
            }
            return referencia;
        }

        const referencia = generarReferencia();

        const content = `
    <div class="top-image">
        <img src="https://i.postimg.cc/05DxDqc9/pixelcut-export-3.jpg" alt="Imagen principal" style="width: 100%; max-width: 400px; display: block; margin: 0 auto; margin-bottom: 20px;">
    </div>
    <div class="status"></div>
    <div class="detail">
        <span class="label" data-color="#707070">Para</span>
        <span class="detail-text">${nombre}</span>
    </div>
    <div class="detail">
        <span class="label" data-color="#707070">Referencia</span>
        <span class="detail-text">${referencia}</span>
    </div>
    <div class="detail">
        <span class="label" data-color="#707070">Número Nequi</span>
        <span class="detail-text">${telefono}</span> <!-- Aquí se muestra sin formatear -->
    </div>
    <div class="detail">
        <span class="label" data-color="#707070">Fecha</span>
        <span class="detail-text">${new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })} a las ${new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })}</span>
    </div>
    <div class="detail">
        <span class="label" data-color="#707070">¿Cuánto?</span>
        <span class="detail-text">$ ${valor}</span>
    </div>
    <div class="detail" style="margin-top: 20px;">
        <img src="https://i.postimg.cc/nhmF4HNk/Picsart-24-09-01-03-20-32-256.jpg" alt="¿De dónde salió la plata?" class="plata-image" />
    </div>
    <div class="account-balance">
        <img src="https://i.postimg.cc/6qy3vkM2/Picsart-24-08-03-01-26-01-809.png" alt="icon">
        <div>
            <img src="https://i.postimg.cc/nhmF4HNk/Picsart-24-09-01-03-20-32-256.jpg" alt="Disponible" class="dispo-image" />
            <span class="amount">$${valor.split(',')[0]}<small>,${valor.split(',')[1]}</small></span>
        </div>
    </div>
    <a href="#" class="problem-link">
        <img src="https://i.postimg.cc/dVqqJSRw/pixelcut-export-2.jpg" alt="Problema con el movimiento" style="max-width: 100%; height: auto; display: inline-block;">
    </a>
`;
