import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as compression from "compression";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"]
  });
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI
  });

  app.use(compression());

  await app.listen(process.env.PORT);
}

bootstrap().then(() => {
  console.log(`${process.env.ENV} server started on port: ${process.env.PORT}`);
});
