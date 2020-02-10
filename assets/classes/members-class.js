let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Members
}

let Members = class {

    static getById(id){


            return new Promise((next)=>{
                db.query('SELECT * FROM members WHERE id = ?',[id])
                    .then((result) =>{

                        if (result[0] != undefined) {
                            next(result[0])
                        } else {
                            next(new Error('Wrong ID'))
                        }
            })
            .catch((err) => next(err))
    })

    }

}
