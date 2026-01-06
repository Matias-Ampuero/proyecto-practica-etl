import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entities/record.entity';
import * as path from 'path';
import * as fs from 'fs';
import pdf = require('pdf-parse');

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
    const pdfPath = path.join(process.cwd(), '../data/data.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    const lines = data.text.split('\n');
    
    for (const line of lines) {
      const cleanLine = line.replace(/"/g, '').trim();
      
      const match = cleanLine.match(/(INV-2025-\d{3})\s*,?\s*(\d{2}-\d{2}-\d{4})\s*,?\s*([a-zA-ZáéíóúÁÉÍÓÚ\s]+)\s*,?\s*\$([\d\.]+)/);
      
      if (match) {
        const [_, sourceId, dateStr, category, amountStr] = match;
        
        const [day, month, year] = dateStr.split('-');
        
        const record = this.recordsRepository.create({
          sourceId: sourceId.trim(),
          date: `${year}-${month}-${day}`,
          category: category.trim(),
          amount: parseFloat(amountStr.replace(/\./g, '')),
          status: 'activo',
          description: `Carga automatica ${sourceId}`
        });
        
        await this.recordsRepository.upsert(record, ['sourceId']);
      }
    }
  }

  findAll() {
    return this.recordsRepository.find();
  }

  create(data: Partial<Record>) {
    return this.recordsRepository.save(data);
  }

  async update(id: number, data: Partial<Record>) {
    await this.recordsRepository.update(id, data);
    return this.recordsRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.recordsRepository.delete(id);
  }
}