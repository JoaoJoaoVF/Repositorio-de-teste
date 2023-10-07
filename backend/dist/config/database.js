"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('unishare', 'unishare', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map