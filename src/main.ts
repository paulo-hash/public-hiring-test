import { Logger } from "@nestjs/common";
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


  const config = new DocumentBuilder()
    .setTitle('API carbon foot print test')
    .setDescription('Greenly test')
    .setVersion('1.0')
    .addTag('Endpoints') // Tag pour regrouper les endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
Logger.log(`Server running on http://localhost:3000`, "Bootstrap");
bootstrap();
