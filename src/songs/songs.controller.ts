import { Controller, Get, Param,Post,Query,Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.entity';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService){}

    //get all songs
    @Get()
    async findAll():Promise<Song[]> {
        return await this.songsService.findAll();
    }
    //get artist in search by name
    @Get('search')
    async searchByName(@Query('name') name: string):Promise<Song> {
        return this.songsService.searchByName(name);
    }

    //get one song
    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Song> {
        return await this.songsService.findOne(id);
    }
}
