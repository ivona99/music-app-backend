import { Controller, Get, Param,Post,Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService){}

    //get all songs
    @Get()
    async findAll():Promise<Song[]> {
        return await this.songsService.findAll();
    }

    //get one song
    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Song> {
        return await this.songsService.findOne(id);
    }
}
