import React from 'react'
import * as config from '../../config'
const firebase = require('firebase/app')
require('firebase/database')
require('firebase/functions')

class Firebase { 
    constructor() {
        const app = firebase.default.initializeApp(config.config)

        this.database = app.database()
        this.functions = app.functions("australia-southeast1")
        if (process.env.NODE_ENV === "development") {
          this.functions.useFunctionsEmulator("http://localhost:5000");
        }
        this.timestamp = firebase.default.database.ServerValue.TIMESTAMP
    }
}

const FirebaseContext = React.createContext(null)

export { FirebaseContext }
export default Firebase