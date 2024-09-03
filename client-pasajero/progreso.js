let socket = io('http://localhost:5050', { path: '/real-time' });

document.addEventListener('DOMContentLoaded', function () {
	const viajeData = localStorage.getItem('viajeEnProgreso');

	if (viajeData) {
		const data = JSON.parse(viajeData);

		const detallesViaje = document.getElementById('detalles-viaje');

		detallesViaje.innerHTML = `
		    <p><strong>Estado:</strong> ${data.estado || 'Pendiente'}</p>
        <p><strong>Origen:</strong> ${data.origen}</p>
        <p><strong>Destino:</strong> ${data.destino}</p>
				<p><strong>Conductor:</strong> ${data.conductor.name}</p>
        <p><strong>Placa:</strong> ${data.conductor.placa}</p>
      `;
	} else {
		console.error('No se encontraron datos del viaje en localStorage.');
	}
});

socket.on('estadoViaje', (data) => {
	const detallesViaje = document.getElementById('detalles-viaje');

	if (detallesViaje) {
		detallesViaje.innerHTML = `
		<p><strong>Estado:</strong> ${data.estado}</p>
		<p><strong>Origen:</strong> ${data.viaje.origen}</p>
		<p><strong>Destino:</strong> ${data.viaje.destino}</p>
		<p><strong>Conductor:</strong> ${data.viaje.conductor.name}</p>
		<p><strong>Placa:</strong> ${data.viaje.conductor.placa}</p>
`;
	} else {
		console.log('no se ha recibido el estado');
	}
});
