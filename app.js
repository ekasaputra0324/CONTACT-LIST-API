const express = require('express');
const bodyParser = require('body-parser')
const db = require('./services/db')
const app = express()
const PORT = process.env.PORT || 5000

// SET BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// SET SERVER
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`API runing on port: ${PORT}`)
})


app.get('/api/contact', (req, res) => {
    return res.send('api web contact')
})

// CREATED DATA

app.post('/api/contact-create', (req, res) => {
    
    const data = { ...req.body } 
    const querySQL = 'INSERT INTO contacts SET ?'
    db.query(querySQL,data, (err,rows, field) => {
        if (err) {
            return res.status(500).json({status_code: 500, msg : 'Failed Insert Data Contact', err: err})
        }
        res.status(200).json({status_code: 200,success: true ,msg: "Success Insert Data Contact"})
    })

})

// UPDATE DATA 

app.put('/api/contact-update/:id', (req, res) => {
    
    const data = {...req.body}
    const queryFindById = 'SELECT * FROM contacts WHERE id = ?'
    const queryUpdate = 'UPDATE contacts SET ? WHERE id = ?'

    // query find data
    db.query(queryFindById, req.params.id, (err, rows, field) => {
        
        // eror handling
        if (err) {
            return res.status(500).json({status_code: 500, msg: err})
        }
        // query update data
        if (rows.length) {
            db.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                if (err) {
                    return res.status(500).json({status_code:500, msg: 'Failed Update Data', err:err})
                }
                res.status(200).json({status_code: 200, msg: "Success Update Data", row: rows})
            })
        }else{
            return res.status(404).json({status_code: 404, msg: `Data ${req.params.id} Not Found`})
        }
    })
})

// FIND DATA

// app.get('/')
