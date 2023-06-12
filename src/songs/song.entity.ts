import { Album } from 'src/albums/album.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    song_id:number;

    @Column()
    song_title:string;

    @Column()
    song_length:string;

    @Column()
    artist_name:string;

    @Column()
    song_path:string;

    @Column()
    song_image:string;

    @ManyToOne(() => Album, (album: Album) => album.songs)
    public album: Album;
}