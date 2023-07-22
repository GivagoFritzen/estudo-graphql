import "reflect-metadata";

import path from 'node:path';

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AcoesResolver } from "./resolvers/acoes-resolver";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [
            AcoesResolver
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    })

    const server = new ApolloServer({
        schema
    });

    const { url } = await server.listen();

    console.log(`Http server running no ${url}`)
}

bootstrap();