import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entities/record.entity';
import * as fs from 'fs';
import * as path from 'path';

declare const require: any;

@Injectable()
export class RecordsService implements OnModuleInit {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async onModuleInit() {
    const count = await this.recordsRepository.count();
    if (count === 0) {
      await this.processPdf();
    }
  }

  async processPdf() {
    try {
      const pdfPath = path.join(process.cwd(), '../data/data.pdf');
      
      if (!fs.existsSync(pdfPath)) {
        return;
      }

      const pdfLib = require('pdf-parse');
      const dataBuffer = fs.readFileSync(pdfPath);
      
      const data = await pdfLib(dataBuffer);
      const lines = data.text.split('\n');
      
      let processedCount = 0;

      for (const line of lines) {
        if (line.includes('INV-')) {
          const success = await this.parseAndSaveLine(line);
          if (success) processedCount++;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async parseAndSaveLine(line: string): Promise<boolean> {
    try {
      const cleanLine = line.trim();
      const regex = /(INV-\d{4}-\d{3})(\d{2}-\d{2}-\d{4})(.+?)(\$[\d\.]+)(activo|cancelado|pendiente)(.*)/i;
      const match = cleanLine.match(regex);

      if (!match) return false;

      const [day, month, year] = match[2].split('-');
      const date = new Date(`${year}-${month}-${day}`);

      const record = this.recordsRepository.create({
        date: date.toISOString().split('T')[0],
        category: match[3].trim(),
        amount: parseFloat(match[4].replace('$', '').replace(/\./g, '')),
        description: match[6].trim() || 'Sin descripción',
      });

      await this.recordsRepository.save(record);
      return true;
    } catch (e) {
      return false;
    }
  }

  findAll() {
    return this.recordsRepository.find();
  }
  async create(createRecordDto: any) {
    const newRecord = this.recordsRepository.create(createRecordDto);
    return await this.recordsRepository.save(newRecord);
  }

  async update(id: number, updateRecordDto: any) {
    await this.recordsRepository.update(id, updateRecordDto);
    return this.recordsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.recordsRepository.delete(id);
    return { deleted: true };
  }
}