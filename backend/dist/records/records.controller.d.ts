import { RecordsService } from './records.service';
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
    findAll(): Promise<import("./entities/record.entity").Record[]>;
}
