import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// با توجه به ساختار پوشه‌ها، یک سطح بالا میریم تا به ریشه پروژه برسیم
const rootDirectory = path.join(__dirname, '..');

function resolvePath(...paths) {
    return path.join(rootDirectory, ...paths);
}

export { rootDirectory, resolvePath }; 