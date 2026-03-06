const fs = require('fs');
const resolve = require('path').resolve;
let path = resolve('src/modules/vendor/vendor.controller.ts');
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/import \{ sendSuccess \} from '\.\.\/\.\.\/shared\/utils\/response';/, "import { successResponse } from '../../shared/utils/response';");
content = content.replace(/sendSuccess\(res, 20[01], '([^']+)', null\);/g, "successResponse(res, null, '$1');");
content = content.replace(/sendSuccess\(res, 20[01], '([^']+)', ([^)]+)\);/g, "successResponse(res, $2, '$1');");
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed vendor.controller.ts');
