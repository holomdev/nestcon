import { Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createConnection, getConnectionManager } from 'typeorm';

export const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (req) => {
    const clientId = req.headers['x-client-id'];
    if (clientId) {
      const connectionName = `${clientId}`;
      const connectionManager = getConnectionManager();

      if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);
        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }

      return createConnection({
        name: connectionName,
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: connectionName,
        entities: [__dirname + '/../entities/tenant/*.entity.js'],
        synchronize: false,
      });
    }
  },
  inject: [REQUEST],
};
