// src/utils/checkDirAndCreate.ts
import * as fs from 'fs';

export const checkDirAndCreate = (filePath: string) => {
    const pathArr = filePath.split('/');
    let checkPath = '.';
    let item: string;
    for (item of pathArr) {
        checkPath += `/${item}`;
        if (!fs.existsSync(checkPath)) {
            fs.mkdirSync(checkPath);
        }
    }
};

