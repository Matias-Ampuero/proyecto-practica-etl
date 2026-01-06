import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Record } from './entities/record.entity';
export declare class RecordsService implements OnModuleInit {
    private recordsRepository;
    constructor(recordsRepository: Repository<Record>);
    onModuleInit(): Promise<void>;
    processPdf(): Promise<void>;
    findAll(): Promise<Record[]>;
    create(data: Partial<Record>): Promise<Partial<Record> & Record>;
    update(id: number, data: Partial<Record>): Promise<Record | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
