let socket = io('http://localhost:5050', { path: '/real-time' });

socket.on('updatedUserList', (conductores) => {
	const disponibles = document.getElementById('disponibles');
	disponibles.innerHTML = '';

	conductores.forEach((conductor) => {
		const div = document.createElement('div');
		div.textContent = `Conductor: ${conductor.name} (ID: ${conductor.id})`;
		disponibles.appendChild(div);
	});
});
