import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import typeDefs from "./schema/index.js";
import resolvers from "./resolver/index.js";
import jwt from "jsonwebtoken";

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const getToken = req.headers.authorization || "";
      const token = getToken?.slice(7);
      const user = jwt.decode(token);
      const userId = user?.sub.split("|")[1];
      return { userId };
    },
    playground: {
      settings: {
        "editor.theme": "light",
      },
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });

  mongoose
    .connect(
      `mongodb+srv://shoonya-test:shoonya-test@cluster0.sa0ig.mongodb.net/shoonya?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((res) => {
      httpServer.listen({ port: process.env.PORT || 4000 }, () => {
        console.log(`Server ready!`);
      });
    })
    .catch((err) => {
      console.error("Error while connecting to MongoDB", err);
    });
}

startApolloServer(typeDefs, resolvers);
