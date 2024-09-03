let socket = io('http://localhost:5050', { path: '/real-time' });

socket.on('updatedUserList', (users) => {
	const userList = document.getElementById('user-list');
	console.log(userList);

	userList.innerHTML = '';
	users.forEach((user) => {
		const li = document.createElement('li');
		li.textContent = `Conductor: ${user.name} Placa: ${user.placa}`;
		userList.appendChild(li);
	});
});

socket.on('viajeAceptado', (data, conductor) => {
	console.log('Solicitud de viaje aceptada:', data, conductor);
	localStorage.setItem('viajeEnProgreso', JSON.stringify(data), 'conductor', JSON.stringify(conductor));
	window.location.href = 'progreso.html';
});

document.getElementById('solicitar').addEventListener('click', function () {
	const origen = document.getElementById('origen').value;
	const destino = document.getElementById('destino').value;
	const name = localStorage.getItem('pasajeroName');
	const datosViaje = {
		origen,
		destino,
		pasajero: {
			id: socket.id,
			nombre: name,
		},
	};

	console.log(datosViaje);
	socket.emit('solicitarViaje', datosViaje);

	document.getElementById('buscando').style.display = 'block';
	document.getElementById('buscador').style.display = 'none';
	document.getElementById('cancelar').style.display = 'block';
});

document.getElementById('cancelar').addEventListener('click', function () {
	document.getElementById('buscando').style.display = 'none';
	document.getElementById('buscador').style.display = 'block';
	document.getElementById('cancelar').style.display = 'none';
});
