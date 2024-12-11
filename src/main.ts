import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { dataSource } from "../config/dataSource";
import { AppModule } from "./app.module";

async function bootstrap() {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Delete undefined propreties in the DTO
      forbidNonWhitelisted: true, // raise an exception for this undefined properties
      transform: true, // Transform these data into DTO class instance
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("API carbon foot print test")
    .setDescription("Greenly test")
    .setVersion("1.0")
    .addTag("Endpoints") // regroup the enpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
Logger.log(`Server running on http://localhost:3000`, "Bootstrap");
bootstrap();
