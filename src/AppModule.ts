import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './recipes/infrastructure/RecipesModule';
import { Recipe } from './recipes/domain/Recipe';
import { EmployeesModule } from './employees/infrastructure/EmployeesModule';
import { Employee } from './employees/domain/Employee';
import { RecipeVariantsModule } from './recipe-variants/infrastructure/RecipeVariantsModule';
import { RecipeVariant } from './recipe-variants/domain/RecipeVariant';
import { ProceduresModule } from './procedures/infrastructure/ProceduresModule';
import { Procedure } from './procedures/domain/Producedure';
import { ProductsModule } from './products/infrastructure/ProductsModule';
import { Product } from './products/domain/Product';
import { IngredientsModule } from './ingredients/infrastructure/IngredientsModule';
import { Ingredient } from './ingredients/domain/Ingredient';
import { AuthModule } from './auth/infrastructure/AuthModule';
import { MailModule } from './shared/infrastructure/modules/mail/MailModule';
import { EnvConfigModule } from './shared/infrastructure/config/env/EnvConfigModule';
import { EnvGetter } from './shared/infrastructure/config/env/EnvGetter';
import { HandlebarsAdapter } from './shared/infrastructure/modules/mail/adapters/HandlebarsAdapter';
import { CloudinaryModule } from './shared/infrastructure/modules/cloudinary/CloudinaryModule';
import { InvitedAccountsModule } from './invitedAccounts/infrastructure/InvitedAccountsModule';
import { InvitedAccount } from './invitedAccounts/domain/InvitedAccount';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvGetter],
      useFactory: (envGetter: EnvGetter) => ({
        type: 'postgres',
        host: envGetter.get('DATABASE_HOST'),
        port: Number(envGetter.get('DATABASE_PORT')),
        username: envGetter.get('DATABASE_USERNAME'),
        password: envGetter.get('DATABASE_PASSWORD'),
        database: envGetter.get('DATABASE_NAME'),
        entities: [
          Recipe,
          RecipeVariant,
          Procedure,
          Product,
          Ingredient,
          Employee,
          InvitedAccount,
        ],
        synchronize: false,
      }),
    }),
    EnvConfigModule.register({
      folder: 'envs',
      envFilePath: '.development.env',
    }),
    MailModule.registerAsync({
      inject: [EnvGetter],
      useFactory: (envGetter: EnvGetter) => ({
        host: envGetter.get('EMAIL_HOST'),
        port: Number(envGetter.get('EMAIL_PORT')),
        secure: false,
        auth: {
          user: envGetter.get('EMAIL_USER'),
          pass: envGetter.get('EMAIL_PASSWORD'),
        },
        templete: {
          adapter: new HandlebarsAdapter(),
          dir: join(__dirname, '../../assets/templetes/mail'),
        },
      }),
    }),
    CloudinaryModule.registerAsync({
      inject: [EnvGetter],
      useFactory: (envGetter: EnvGetter) => ({
        cloud_name: envGetter.get('CLOUDINARY_CLOUD_NAME'),
        api_key: envGetter.get('CLOUDINARY_API_KEY'),
        api_secret: envGetter.get('CLOUDINARY_API_SECRET'),
      }),
    }),
    RecipesModule,
    EmployeesModule,
    RecipeVariantsModule,
    ProceduresModule,
    ProductsModule,
    IngredientsModule,
    InvitedAccountsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
