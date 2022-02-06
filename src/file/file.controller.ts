import {
  Controller,
  Post,
  Body,
  HttpException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return 'Okay';
  }
}
