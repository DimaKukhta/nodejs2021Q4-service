import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
  ) {}
  create(createBoardDto: CreateBoardDto) {
    return this.boardsRepository.save(createBoardDto);
  }

  findAll() {
    return this.boardsRepository.find();
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with ${id} not found`);
    }
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with ${id} not found`);
    }
    return await this.boardsRepository.update(id, updateBoardDto);
  }

  async remove(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with ${id} not found`);
    }
    return await this.boardsRepository.remove(board);
  }
}
