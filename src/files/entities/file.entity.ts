import {Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne} from "typeorm";
import {UserEntity} from "../../users/entities/user.entity";

@Entity('Files')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string

    @Column()
    originalName: string

    @Column()
    size: number

    @Column()
    mimetype: string

    @DeleteDateColumn()
    deletedAt?: Date

    @ManyToOne(() => UserEntity, (user) => user.files)
    user: UserEntity
}

export enum FileType {
    PHOTOS = 'photos',
    TRASH = 'trash',
}
