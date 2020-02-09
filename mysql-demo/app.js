const mysql = require('mysql')

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
    if (err)
        console.log(err.message)
    else{
        console.log('connected')
        db.query('INSERT INTO members(name) VALUES("John")',(err,result) =>{
            if (err)
                console.log(err.message)
            else
                console.log(result)
        })
    }

})
