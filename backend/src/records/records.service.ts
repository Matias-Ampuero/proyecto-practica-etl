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
    await this.processPdf();
  }

  async processPdf() {
    try {
      const pdfPath = path.join(process.cwd(), '../data/data.pdf');
      
      if (!fs.existsSync(pdfPath)) {
        console.error('PDF no encontrado en:', pdfPath);
        return;
      }

      const pdfLib = require('pdf-parse');
      const dataBuffer = fs.readFileSync(pdfPath);
      
      const data = await pdfLib(dataBuffer);
      const lines = data.text.split('\n');
      
      let count = 0;

      for (const line of lines) {
        if (line.includes('INV-')) {
          const success = await this.parseAndSaveLine(line);
          if (success) count++;
        }
      }
      console.log(`✅ Carga de datos completada exitosamente. Se procesaron ${count} registros.`);
    } catch (error) {
      console.error('Error procesando PDF:', error);
    }
  }

  private async parseAndSaveLine(line: string): Promise<boolean> {
    try {
      const cleanLine = line.trim();

      const regex = /(INV-\d{4}-\d{3})(\d{2}-\d{2}-\d{4})(.+?)(\$[\d\.]+)(activo|cancelado|pendiente)(.*)/i;
      const match = cleanLine.match(regex);

      if (!match) return false;

      const sourceId = match[1];
      const dateStr = match[2]; 
      const category = match[3];
      const amountStr = match[4];
      const status = match[5];
      const description = match[6];

      const amount = parseFloat(amountStr.replace('$', '').replace(/\./g, ''));
      
      const [day, month, year] = dateStr.split('-');
      const date = new Date(`${year}-${month}-${day}`);

      const record = this.recordsRepository.create({
        sourceId,
        date,
        category,
        amount,
        status: status.toLowerCase(),
        description,
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
}