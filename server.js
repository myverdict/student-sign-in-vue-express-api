var express = require('express')
var bodyParser = require('body-parser')
var api_routes = require('./routes/api.js')
var path = require('path')

// Database configuration 
var Sequelize = require('sequelize')

db_url = process.env.DATABASE_URL

let sequelize

if (db_url) {
    sequelize = new Sequelize(db_url,
    { 
        dialect: 'postgres', 
    })

    sequelize.authenticate().then(()=> console.log('connected to Postgres'))
}

else {
     sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite3'
    })

    sequelize.authenticate().then(()=> console.log('connected to sqlite'))

}

var StudentModel = require('./model/student.js')(sequelize, Sequelize)

// App configuration 
var app = express() 

app.use(express.static(path.join(__dirname, 'student-client', 'dist')))

app.use(bodyParser.json())

router = api_routes(StudentModel)

app.use('/api', router)

console.log(app._router.stack)

// Error handlers - for not found, and app errors 
app.use(function(req, res, next){
    res.status(404).send('Not found')
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
  })


// Start server running 
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('app running on port', server.address().port)
})

 