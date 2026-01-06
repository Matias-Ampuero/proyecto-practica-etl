import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
    create(createRecordDto: CreateRecordDto): Promise<import("./entities/record.entity").Record[]>;
    findAll(): Promise<import("./entities/record.entity").Record[]>;
    update(id: string, updateRecordDto: UpdateRecordDto): Promise<import("./entities/record.entity").Record | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
