"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const record_entity_1 = require("./entities/record.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let RecordsService = class RecordsService {
    recordsRepository;
    constructor(recordsRepository) {
        this.recordsRepository = recordsRepository;
    }
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
                    if (success)
                        processedCount++;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async parseAndSaveLine(line) {
        try {
            const cleanLine = line.trim();
            const regex = /(INV-\d{4}-\d{3})(\d{2}-\d{2}-\d{4})(.+?)(\$[\d\.]+)(activo|cancelado|pendiente)(.*)/i;
            const match = cleanLine.match(regex);
            if (!match)
                return false;
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
        }
        catch (e) {
            return false;
        }
    }
    findAll() {
        return this.recordsRepository.find();
    }
    async create(createRecordDto) {
        const newRecord = this.recordsRepository.create(createRecordDto);
        return await this.recordsRepository.save(newRecord);
    }
    async update(id, updateRecordDto) {
        await this.recordsRepository.update(id, updateRecordDto);
        return this.recordsRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.recordsRepository.delete(id);
        return { deleted: true };
    }
};
exports.RecordsService = RecordsService;
exports.RecordsService = RecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(record_entity_1.Record)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecordsService);
//# sourceMappingURL=records.service.js.map