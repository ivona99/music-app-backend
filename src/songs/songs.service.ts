import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private readonly songsRepository:Repository<Song>){}

    //get all songs
    async findAll():Promise<Song[]> {
        return await this.songsRepository.find();
    }
    //get one song

    async findOne(id:number):Promise<Song> {
        return await this.songsRepository.findOne({where:{song_id:id}});
    }
}
