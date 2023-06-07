import { Artist } from 'src/artists/artist.entity';
import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne} from 'typeorm'

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    album_id:number;

    @Column()
    album_title:string;

    @Column()
    album_year: number;

    @Column()
    album_img: string;

    @Column()
    album_items:number;

    @ManyToOne(() => Artist, (artist: Artist) => artist.albums)
    public artist: Artist;
}