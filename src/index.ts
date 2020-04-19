import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import c3d from './routes/c3dRoute';

const app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials')
}));
app.set('view engine', '.hbs');

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: false}));

app.use('/c3d',c3d);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});