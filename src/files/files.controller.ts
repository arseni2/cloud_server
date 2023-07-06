import {
  Controller, Delete,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post, Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FilesService} from './files.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "./storage";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {UserId} from "../decorators/user-id.decorator";
import {FileType} from "./entities/file.entity";

@Controller('files')
@ApiTags('Files')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class FilesController {
    constructor(private readonly filesService: FilesService) {
    }

    @Get()
    findAll(@UserId() userId: number, @Query('type') fileType: FileType) {
        return this.filesService.findAll(userId, fileType);
    }

    @UseInterceptors(FileInterceptor('file', {
        storage: fileStorage
    }))
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    create(@UploadedFile(
        new ParseFilePipe({
            validators: [new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5})],
        }),
    ) file: Express.Multer.File, @UserId() userId: number) {
        return this.filesService.create(file, userId);
    }

  @Delete('remove')
  remove(@UserId() userId: number, @Query('ids') ids: string) {
    // files?ids=1,2,7,8
    return this.filesService.remove(userId, ids);
  }
}
