import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './artist.entity';

@Controller('artists')
export class ArtistsController {
    constructor(private artistsService: ArtistsService){}

    //get all artists
    @Get()
    async findAll(): Promise<Artist[]> {
        return await this.artistsService.findAll();
    }
    //get artist in search by name
     @Get('search')
    async searchByName(@Query('name') name: string):Promise<Artist> {
        return this.artistsService.searchByName(name);
    }

    //get one artist
    @Get(':id')
    async findOne(@Param('id') id:number): Promise<Artist> {
        return await this.artistsService.findOne(id);
    }

}
