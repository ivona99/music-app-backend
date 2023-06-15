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
    //search by name of album
    async searchByName(title: string):Promise<Album> {
        return await this.albumsRepository.findOneBy({album_title:title});
        // return title ? (await this.findAll()).filter((album) => 
        // album.album_title.toLocaleLowerCase().includes(title)
        // ) : (await this.findAll());
    }

    //get one album by id
    async findOne(id:number):Promise<Album>{
        return await this.albumsRepository.findOne({where:{album_id:id}, relations:{artist:true, songs:true}});
    }


}
