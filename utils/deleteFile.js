import path from 'path';
import appRoot from 'app-root-path'
import fs from 'fs';
import chalk from 'chalk';


export const removeFileIfExists = async (filename) => {
    if (!filename) return;
    const filePath = path.join(appRoot.path, 'public', 'files', 'avatars', filename);
    try {
        await fs.promises.unlink(filePath);
        console.log(chalk.yellow(`فایل حذف شد: ${filePath}`));
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error('خطا در حذف فایل:', err);
        }
    }
};