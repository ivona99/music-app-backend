import { Controller, Get, Param } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './album.entity';

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService:AlbumsService){}

    //get all albums
    @Get()
    async findAll():Promise<Album[]> {
        return await this.albumsService.findAll();
    }

    //get one album by id 
    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Album> {
        return await this.albumsService.findOne(id);
    }
}
