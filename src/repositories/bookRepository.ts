import fs from 'fs';
import path from 'path';
import { Book } from '@/entities/book';

const filePath = path.join(process.cwd(), 'src', 'lib', 'cars.json');

export default async function updateJsonFile(data: Book[]) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};