import { Global, Module } from '@nestjs/common';
import { GeneralModuleService } from './general-module.service';

@Global()
@Module({
  providers: [GeneralModuleService],
  exports: [GeneralModuleService],
})
export class GeneralModuleModule {}
