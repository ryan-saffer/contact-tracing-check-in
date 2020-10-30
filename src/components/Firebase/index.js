import React from 'react'
import * as config from '../../config'
import app from 'firebase/app'
require('firebase/database')

class Firebase { 
    constructor() {
        app.initializeApp(config.config)

        this.database = app.database()
        this.timestamp = app.database.ServerValue.TIMESTAMP
    }
}

const FirebaseContext = React.createContext(null)

export { FirebaseContext }
export default Firebase