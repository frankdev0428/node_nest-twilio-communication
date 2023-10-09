"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const ormconfig_1 = require("../ormconfig");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource(ormconfig_1.ormConfig);
//# sourceMappingURL=data-source.js.map