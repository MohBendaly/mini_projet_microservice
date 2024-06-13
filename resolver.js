// resolver.js 
const grpc = require('@grpc/grpc-js'); 
const protoLoader = require('@grpc/proto-loader'); 
// Charger les fichiers proto pour les films et les séries TV 
const gameProtoPath = 'game.proto'; 
const seriesProtoPath = 'series.proto'; 
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
// Définir les résolveurs pour les requêtes GraphQL 
const resolver = { 
Query: { 
game: (_, { id }) => { 
// Effectuer un appel gRPC au microservice de films 
const client = new gameProto.gameService('localhost:50051', 
grpc.credentials.createInsecure()); 
return new Promise((resolve, reject) => { 
client.getgame({ gameId: id }, (err, response) => { 
if (err) { 
reject(err); 
} else { 
resolve(response.game); 
} 
}); 
}); 
}, 
games: () => { 
// Effectuer un appel gRPC au microservice de films 
const client = new gameProto.gameService('localhost:50051', 
grpc.credentials.createInsecure()); 
return new Promise((resolve, reject) => { 
client.searchgames({}, (err, response) => { 
if (err) { 
reject(err); 
} else { 
resolve(response.games); 
} 
}); 
}); 
},
series: (_, { id }) => { 
    // Effectuer un appel gRPC au microservice de séries TV 
    const client = new seriesProto.seriesService('localhost:50052', 
grpc.credentials.createInsecure()); 
    return new Promise((resolve, reject) => { 
      client.getseries({ seriesId: id }, (err, response) => { 
        if (err) { 
          reject(err); 
        } else { 
          resolve(response.tv_show); 
        } 
      }); 
    }); 
  }, 
  seriess: () => { 
    // Effectuer un appel gRPC au microservice de séries TV 
    const client = new seriesProto.seriesService('localhost:50052', 
grpc.credentials.createInsecure()); 
    return new Promise((resolve, reject) => { 
      client.searchseriess({}, (err, response) => { 
        if (err) { 
          reject(err); 
        } else { 
          resolve(response.tv_shows); 
        } 
      }); 
    }); 
  }, 
}, 
}; 

module.exports = resolvers;