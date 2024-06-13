// gameMicroservice.js 
const grpc = require('@grpc/grpc-js'); 
const protoLoader = require('@grpc/proto-loader'); 
// Charger le fichier game.proto 
const gameProtoPath = 'game.proto'; 
const gameProtoDefinition = protoLoader.loadSync(gameProtoPath, { 
keepCase: true, 
longs: String, 
enums: String, 
defaults: true, 
oneofs: true, 
}); 
const gameProto = grpc.loadPackageDefinition(gameProtoDefinition).game; 
// Implémenter le service game 
const gameService = { 
getgame: (call, callback) => { 
// Récupérer les détails du game à partir de la base de données  
const game = { 
id: call.request.game_id, 
title: 'Exemple de game', 
description: 'Ceci est un exemple de game.', 
// Ajouter d'autres champs de données pour le game au besoin 
}; 
callback(null, { game }); 
}, 
searchgames: (call, callback) => { 
const { query } = call.request; 
// Effectuer une recherche de games en fonction de la requête 
const games = [ 
{ 
id: '1', 
title: 'Exemple de game 1', 
description: 'Ceci est le premier exemple de game.', 
}, 
{ 
id: '2', 
title: 'Exemple de game 2', 
description: 'Ceci est le deuxième exemple de game.', 
}, 
// Ajouter d'autres résultats de recherche de games au besoin 
]; 
callback(null, { games }); 
}, 
// Ajouter d'autres méthodes au besoin 
}; 
// Créer et démarrer le serveur gRPC 
const server = new grpc.Server(); 
server.addService(gameProto.gameService.service, gameService); 
const port = 50051; 
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), 
(err, port) => { 
if (err) { 
console.error('Échec de la liaison du serveur:', err); 
return; 
} 
console.log(`Le serveur s'exécute sur le port ${port}`); 
server.start(); 
}); 
console.log(`Microservice de games en cours d'exécution sur le port ${port}`);