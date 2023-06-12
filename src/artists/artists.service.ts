import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private readonly artistsRepository: Repository<Artist>){}

        //get all artists
        async findAll():Promise<Artist[]> {
            return await this.artistsRepository.find({
                relations: {
                    albums: true,
                  },
            });
        }
        //get one artist
        async findOne(id:number): Promise<Artist> {
            return await this.artistsRepository.findOne({where: {artist_id:id}, relations:{albums:true}});
        }
        
}
