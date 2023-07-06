import {Injectable} from '@nestjs/common';
import {CreateFileDto} from './dto/create-file.dto';
import {UpdateFileDto} from './dto/update-file.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {FileEntity, FileType} from "./entities/file.entity";
import {Repository} from "typeorm";

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileEntity)
        private repo: Repository<FileEntity>
    ) {
    }

    create(file: Express.Multer.File, userId: number) {
        return this.repo.save({
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            user: {id: userId},
        });
    }

    async remove(userId: number, ids: string) {
        const idsArray = ids.split(',');

        const qb = this.repo.createQueryBuilder('file');

        qb.where('id IN (:...ids) AND userId = :userId', {
            ids: idsArray,
            userId,
        });

        return qb.softDelete().execute();
    }

    findAll(userId: number, fileType: FileType) {
        const qb = this.repo.createQueryBuilder('file');

        qb.where('file.userId = :userId', {userId});

        if (fileType === FileType.PHOTOS) {
            qb.andWhere('file.mimetype ILIKE :type', {type: '%image%'});
        }

        if (fileType === FileType.TRASH) {
            qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
        }

        return qb.getMany();
    }

}
