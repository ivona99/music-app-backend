import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album)
        private readonly albumsRepository: Repository<Album>
    ){}

    //get All Albums
    async findAll():Promise<Album[]> {
        return await this.albumsRepository.find({
            relations: {
                artist: true,
            },
        });
    }

    //get one album by id
    async findOne(id:number):Promise<Album>{
        return await this.albumsRepository.findOne({where:{album_id:id}});
    }
}
