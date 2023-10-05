import { Module } from '@nestjs/common';
import { JarsService } from './jars.service';
import { JarsController } from './jars.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Jars, JarsSchema } from './jars.entities';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: Jars.name,
    //     schema: JarsSchema,
    //   },
    // ]),
  ],
  providers: [JarsService],
  controllers: [JarsController],
})
export class JarsModule {}
