import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Record } from './entities/record.entity';
export declare class RecordsService implements OnModuleInit {
    private recordsRepository;
    constructor(recordsRepository: Repository<Record>);
    onModuleInit(): Promise<void>;
    processPdf(): Promise<void>;
    private parseAndSaveLine;
    findAll(): Promise<Record[]>;
    create(createRecordDto: any): Promise<Record[]>;
    update(id: number, updateRecordDto: any): Promise<Record | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
