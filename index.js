const express = require('express');
const app = express();
const clocks = require('./controller/clocks');
const videogames = require('./controller/videogames');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.locals.barmilyenkulcs = 'Megyunk ma az EPAM-ba!';
});

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(5000);
