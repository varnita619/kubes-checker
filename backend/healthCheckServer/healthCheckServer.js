import express from "express";
import {
  HealthcheckerDetailedCheck,
  HealthcheckerSimpleCheck
} from "./healthchecker/healthchecker";
import { Dialects, HealthTypes } from "./interfaces/types";

const server = express();

server.get("/health-check/liveness", (_, res) => {
  res.send(HealthcheckerSimpleCheck());
});

server.get("/health-check/readiness", async (_, res) => {
  res.send(
    await HealthcheckerDetailedCheck({
      name: "My node application",
      version: "my version",
      
      availableintegrationtypes: [
        HealthTypes.Redis,
        HealthTypes.Memcached,
        HealthTypes.Web,
        HealthTypes.Custom
      ],
      integrations: [
        {
          type: HealthTypes.Redis,
          name: "redis integration",
          host: "redis",
        },
        {
          type: HealthTypes.Memcached,
          name: "My memcache integration",
          host: "memcache:11211",
        },
        {
          type: HealthTypes.Web,
          name: "my web api integration",
          host: "https://github.com/status",
          headers: [{ key: "Accept", value: "application/json" }],
        },
        {
          type: HealthTypes.Dynamo,
          name: "my dynamo",
          host: "http://localhost",
          port: 8000,
          Aws: {
            region: "us-east-1",
            access_key_id: "",
            secret_access_key: "",
          },
        },
        {
          type: HealthTypes.Database,
          name: "my database",
          host: "localhost",
          dbPort: 5432,
          dbName: "postgres",
          dbUser: "postgres",
          dbPwd: "root",
          dbDialect: Dialects.postgres,
        },
        {
          type: HealthTypes.Custom,
          name: "my custom integration",
          host: "localhost",
          customCheckerFunction: () => { return { status: true, error: {} }},
        },
      ],
    })
  );
});

export default server;
