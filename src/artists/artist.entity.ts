import { Album } from 'src/albums/album.entity';
import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany} from 'typeorm'

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    artist_id:number;

    @Column()
    artist_name: string;

    @Column()
    artist_desc: string;

    @Column()
    artist_img:string;

    @OneToMany(() => Album, (album: Album) => album.artist)
    public albums: Album[];
}