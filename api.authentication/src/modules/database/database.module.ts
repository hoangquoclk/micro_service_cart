import { Module } from '@nestjs/common';

import { sequelizeProviders } from '@modules/database/sequelize/sequelize.provider';

@Module({
  providers: [...sequelizeProviders],
  exports: [...sequelizeProviders],
})
export class DatabaseModule {}
