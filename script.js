// Función para mostrar/ocultar los detalles del plan
function togglePlan(cardElement) {
    // Obtener el contenedor de detalles dentro de la tarjeta
    const details = cardElement.querySelector('.plan-details');
    
    // Verificar si los detalles están visibles o no
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block'; // Mostrar los detalles
    } else {
        details.style.display = 'none'; // Ocultar los detalles
    }
}


 // Función para agregar un artículo al carrito
function addItemToCart(itemName, itemPrice) {
    let cartItems = document.getElementById('cart-items');
    let cartCount = document.getElementById('cart-count');
    let cartEmptyMessage = document.getElementById('cart-empty-message');

    // Crear un nuevo elemento de lista para el carrito
    let newItem = document.createElement('li');
    newItem.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    newItem.innerHTML = `
        ${itemName} - $${itemPrice}
        <button class="btn btn-danger btn-sm ms-2" onclick="removeItemFromCart(this)">Eliminar</button>
    `;

    // Agregar el nuevo artículo a la lista
    cartItems.appendChild(newItem);

    // Si el carrito estaba vacío, ocultamos el mensaje de "vacío"
    if (cartEmptyMessage) {
        cartEmptyMessage.style.display = 'none';
    }

    // Actualizar el contador del carrito
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
}

// Función para eliminar un artículo del carrito
function removeItemFromCart(button) {
    let cartItems = document.getElementById('cart-items');
    let cartCount = document.getElementById('cart-count');

    // Eliminar el item de la lista
    button.parentElement.remove();

    // Actualizar el contador del carrito
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount - 1;

    // Si el carrito está vacío, mostrar el mensaje "vacío"
    if (cartItems.children.length === 0) {
        let cartEmptyMessage = document.createElement('li');
        cartEmptyMessage.innerHTML = '<p class="text-center" id="cart-empty-message">El carrito está vacío</p>';
        cartItems.appendChild(cartEmptyMessage);
    }
}

// Mostrar el modal del carrito
document.getElementById('cartButton').addEventListener('click', function () {
    let cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
});


window.onload = function() {
    showPopup();
    setTimeout(hidePopup, 60000); // Oculta el popup después de 60 segundos
};

// Función para mostrar el popup y ocultar el ícono
function showPopup() {
    document.getElementById("whatsappPopup").style.display = "block";
    document.getElementById("popupIcon").style.display = "none";
}

// Función para ocultar el popup y mostrar el ícono
function hidePopup() {
    document.getElementById("whatsappPopup").style.display = "none";
    document.getElementById("popupIcon").style.display = "flex";
}

// Función para alternar el popup al hacer clic en el ícono
function togglePopup() {
    const popup = document.getElementById("whatsappPopup");
    const icon = document.getElementById("popupIcon");
    if (popup.style.display === "block") {
        popup.style.display = "none";
        icon.style.display = "flex";
    } else {
        popup.style.display = "block";
        icon.style.display = "none";
    }
}

//funciones modal agendar

function nextStep(step) {
    const currentStep = document.querySelector('.form-step.active');
    currentStep.classList.remove('active');
    
    const nextStep = document.getElementById(`step${step}`);
    nextStep.classList.add('active');
}
document.addEventListener('DOMContentLoaded', function() {
    // Controlar el paso del formulario
    function nextStep(step) {
        const currentStep = document.querySelector('.form-step.active');
        currentStep.classList.remove('active');
        
        const nextStep = document.getElementById(`step${step}`);
        nextStep.classList.add('active');
    }

    // Abrir el modal y resetear el formulario cuando el modal se muestra
    const modal = document.getElementById('reservationModal');
    const modalInstance = new bootstrap.Modal(modal);

    modal.addEventListener('shown.bs.modal', function () {
        // Resetear el formulario al abrir el modal
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach(step => {
            step.classList.remove('active');  // Quitar la clase 'active' a todos los pasos
        });

        // Mostrar el primer paso por defecto
        document.getElementById('step1').classList.add('active');
    });

    // Añadir el evento de la función 'nextStep' a los botones de continuar
    const nextButtons = document.querySelectorAll('button[onclick^="nextStep"]');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const step = this.getAttribute('onclick').match(/\d+/)[0];  // Extrae el número del paso
            nextStep(step);
        });
    });
    
    // Abrir el modal cuando el botón de "Abrir Formulario de Reserva" es clickeado
    const openModalButton = document.querySelector('[data-bs-toggle="modal"]');
    openModalButton.addEventListener('click', function() {
        modalInstance.show();  // Mostrar el modal
    });

    // Añadir funcionalidad para cerrar el modal correctamente
    const closeModalButton = document.querySelectorAll('.btn-close, [data-bs-dismiss="modal"]');
    closeModalButton.forEach(button => {
        button.addEventListener('click', function() {
            modalInstance.hide();  // Ocultar el modal
        });
    });

    // Evitar el envío del formulario por defecto si hay un botón de "Finalizar"
    const finishButton = document.querySelector('button[type="submit"]');
    if (finishButton) {
        finishButton.addEventListener('click', function(event) {
            event.preventDefault();  // Prevenir el envío del formulario
            alert('Formulario enviado con éxito');
            modalInstance.hide();  // Cerrar el modal al finalizar
        });
    }
});
