var express = require('express')
var bodyParser = require('body-parser')
var api_routes = require('./routes/api.js')
var path = require('path')

// App configuration 
var app = express() 
app.use(express.static(path.join(__dirname, 'student-client', 'dist')))

app.use(bodyParser.json())

app.use('/api', api_routes)

// Error handlers - for route not found
app.use(function(req, res, next){
    res.status(404).send('Not found')
})

// Error handler for server errors 
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
})


// Start server running 
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})

 