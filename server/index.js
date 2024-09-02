const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
	path: '/real-time',
	cors: {
		origin: '*',
	},
});

let conductoresOnline = [];

const dbc = {
	conductores: [],
};

const dbp = {
	pasajeros: [],
};

io.on('connection', (socket) => {
	console.log('Un cliente se ha conectado', socket.id);

	socket.on('conductorOnline', (conductor) => {
		const existingConductor = conductoresOnline.find((c) => c.id === conductor.id);

		if (!existingConductor) {
			const newConductor = { id: conductor.id, name: conductor.name, placa: conductor.placa };
			conductoresOnline.push(newConductor);
			console.log('Conductor en línea:', newConductor);
			io.emit('updatedUserList', conductoresOnline);
		} else {
			console.log('Conductor ya está en línea:', conductor.name);
		}
	});

	socket.on('conductorOffline', (conductor) => {
		conductoresOnline = conductoresOnline.filter((conductorOnline) => conductorOnline.id !== conductor.id);
		console.log('Conductor desconectado:', conductor);
		io.emit('updatedUserList', conductoresOnline);
	});

	socket.on('disconnect', () => {
		conductoresOnline = conductoresOnline.filter((conductorOnline) => conductorOnline.id !== socket.id);
		io.emit('updatedUserList', conductoresOnline);
	});
});

app.get('/conductores', (request, response) => {
	response.send(dbc);
});

app.post('/conductores', (request, response) => {
	const { body } = request;
	dbc.conductores.push(body);
	console.log('Conductor guardado:', body); // Aquí se guarda y se imprime el conductor
	response.status(201).send(body);
});

app.put('/conductores/:name', (request, response) => {
	const { name } = request.params;
	const { vehicle } = request.body;

	console.log(dbc.conductores);

	const conductor = dbc.conductores.find((conductor) => conductor.name === name);

	if (conductor) {
		conductor.vehicle = vehicle;
		response.send(conductor);
	} else {
		response.status(404).send({ error: 'Conductor not found' });
	}
});

app.get('/conductores/:name', (request, response) => {
	const { name } = request.params;

	const conductor = dbc.conductores.find((conductor) => conductor.name === name);

	if (conductor) {
		response.send(conductor);
	} else {
		response.status(404).send({ error: 'Conductor not found' });
	}
});

app.get('/pasajeros', (request, response) => {
	response.send(dbp);
});

app.post('/pasajeros', (request, response) => {
	const { body } = request;
	dbp.pasajeros.push(body);
	console.log('received data:', body); // Aquí se imprime el pasajero guardado
	response.status(201).send(body);
});

httpServer.listen(5050, () => {
	console.log(`Server is running on http://localhost:5050`);
});
