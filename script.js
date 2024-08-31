//Seleccionar Modo de Pago

function toggleFinancingOptions() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const financingOptions = document.getElementById('financingOptions');
    
    if (paymentMethod === 'financiamiento') {
        financingOptions.style.display = 'block';
    } else {
        financingOptions.style.display = 'none';
        document.getElementById('monthlyPayment').innerText = '';
    }
}

//Calcula la cantidad para el pago
function calculateMonthlyPayment() {
    if (selectedVehiclePrice === 0) {
        alert('Por favor selecciona un vehículo de la tabla.');
        return;
    }

    const downPaymentPercent = parseInt(document.getElementById('downPayment').value);
    const months = parseInt(document.getElementById('months').value);

    const downPayment = (downPaymentPercent / 100) * selectedVehiclePrice;
    const financedAmount = selectedVehiclePrice - downPayment;
    const monthlyPayment = (financedAmount / months).toFixed(2);

    document.getElementById('monthlyPayment').innerText = `Mensualidad: € ${monthlyPayment}`;
}

// Variable global para almacenar el precio del vehículo seleccionado
let selectedVehiclePrice = 0;

$(document).ready(function() {
    $('tbody tr').click(function() {
        // Eliminar la clase 'selected' de todas las filas
        $('tbody tr').removeClass('selected');
        
        // Agregar la clase 'selected' a la fila seleccionada
        $(this).addClass('selected');

        // Obtener el nombre del vehículo desde la primera celda (td)
        const vehicleName = $(this).children('td:nth-child(1)').text();
        const vehiclePrice = $(this).data('price');

        // Mostrar el nombre y precio en el formulario
        $('#selectedVehicleName').text('Vehículo Seleccionado: ' + vehicleName);
        $('#selectedVehiclePrice').text('Precio: € ' + vehiclePrice);

        // Guardar el precio del vehículo seleccionado
        selectedVehiclePrice = vehiclePrice;

        // Mostrar el nombre del vehículo en el modal
        $('#modalBodyContent').text('Has seleccionado el vehículo: ' + vehicleName);

        // Mostrar el modal
        $('#vehicleModal').modal('show');
        
        // Actualizar el cálculo de mensualidad si es necesario
        calculateMonthlyPayment();
    });
});

function resetFinancingFields() {
    document.getElementById("selectedVehicleName").innerHTML = "";
    document.getElementById("selectedVehiclePrice").innerHTML = "";
    document.getElementById("downPayment").value = "";
    document.getElementById("months").value = "";
    document.getElementById("monthlyPayment").innerHTML = "";
  }

  