import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule} from '@nestjs/config';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { Artist } from './artists/artist.entity';
import { Album } from './albums/album.entity';
import { SongsModule } from './songs/songs.module';
import { Song } from './songs/song.entity';




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    
    


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'I?vana',
      database: 'music_app',
      entities: [User, Artist, Album, Song],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ArtistsModule,
    AlbumsModule,
    SongsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
