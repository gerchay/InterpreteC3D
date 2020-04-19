"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const c3dRoute_1 = __importDefault(require("./routes/c3dRoute"));
const app = express_1.default();
app.set('port', process.env.PORT || 4000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('.hbs', express_handlebars_1.default({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials')
}));
app.set('view engine', '.hbs');
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: false }));
app.use('/c3d', c3dRoute_1.default);
//Static Files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
//# sourceMappingURL=index.js.map