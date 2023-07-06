import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FileEntity} from "../../files/entities/file.entity";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    fullName: string

    @Column()
    password: string

    @OneToMany(() => FileEntity, (file) => file.user)
    files: FileEntity[]
}
