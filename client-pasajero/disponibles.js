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

document.getElementById('solicitar').addEventListener('click', function () {
	document.getElementById('buscando').style.display = 'block';
	document.getElementById('buscador').style.display = 'none';
	document.getElementById('cancelar').style.display = 'block';
});

document.getElementById('cancelar').addEventListener('click', function () {
	document.getElementById('buscando').style.display = 'none';
	document.getElementById('buscador').style.display = 'block';
	document.getElementById('cancelar').style.display = 'none';
});
