// apiGateway.js 
const express = require('express'); 
const { ApolloServer } = require('@apollo/server'); 
const { expressMiddleware } = require ('@apollo/server/express4'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const grpc = require('@grpc/grpc-js'); 
const protoLoader = require('@grpc/proto-loader'); 
// Charger les fichiers proto pour les films et les séries TV 
const gameProtoPath = 'game.proto'; 
const seriesProtoPath = 'series.proto'; 
const resolvers = require('./resolvers'); 
const typeDefs = require('./schema'); 
// Créer une nouvelle application Express 
const app = express(); 
const gameProtoDefinition = protoLoader.loadSync(gameProtoPath, { 
keepCase: true, 
longs: String, 
enums: String, 
defaults: true, 
oneofs: true, 
}); 
const seriesProtoDefinition = protoLoader.loadSync(seriesProtoPath, { 
keepCase: true, 
longs: String, 
enums: String, 
defaults: true, 
oneofs: true, 
}); 
const gameProto = grpc.loadPackageDefinition(gameProtoDefinition).game; 
const seriesProto = grpc.loadPackageDefinition(seriesProtoDefinition).series; 
// Créer une instance ApolloServer avec le schéma et les résolveurs importés 
const server = new ApolloServer({ typeDefs, resolvers }); 
// Appliquer le middleware ApolloServer à l'application Express 
server.start().then(() => { 
app.use( 
cors(), 
bodyParser.json(), 
expressMiddleware(server), 
); 
});
app.get('/games', (req, res) => { 
    const client = new movieProto.gameservice('localhost:50051', 
    grpc.credentials.createInsecure()); 
    client.searchgames({}, (err, response) => { 
    if (err) { 
    res.status(500).send(err); 
    } else { 
    res.json(response.games); 
    } 
    }); 
    }); 
    app.get('/games/id', (req, res) => { 
    const client = new movieProto.gameservice('localhost:50051', 
    grpc.credentials.createInsecure()); 
    const id = req.params.id; 
    client.getMovie({ movieId: id }, (err, response) => { 
    if (err) { 
    res.status(500).send(err); 
    } else { 
    res.json(response.movie); 
    } 
    }); 
    }); 
    app.get('/series/id', (req, res) => { 
    const client = new tvShowProto.serieservice('localhost:50052', 
    grpc.credentials.createInsecure()); 
    client.searchseries({}, (err, response) => { 
    if (err) { 
    res.status(500).send(err); 
    } else { 
    res.json(response.tv_shows); 
    } 
    }); 
    }); 
    app.get('/series/:id', (req, res) => { 
    const client = new tvShowProto.serieservice('localhost:50052', 
    grpc.credentials.createInsecure()); 
    const id = req.params.id; 
    client.getTvshow({ tvShowId: id }, (err, response) => { 
    if (err) { 
    res.status(500).send(err); 
    } else { 
    res.json(response.tv_show); 
    } 
    }); 
    }); 
    // Démarrer l'application Express 
    const port = 3000; 
    app.listen(port, () => { 
    console.log(`API Gateway en cours d'exécution sur le port ${port}`); 
    });