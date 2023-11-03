import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { CallbackModule } from './callback/callback.module';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from './utils/utils.module';
import { TracksModule } from './tracks/tracks.module';
import { SpotifyModule } from './spotify/spotify.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    LoginModule,
    CallbackModule,
    UtilsModule,
    TracksModule,
    SpotifyModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
