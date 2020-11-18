import React, { useContext, useState } from 'react';
import './App.css';
import {createUseStyles} from 'react-jss'
import { message } from 'antd';
import useSound from 'use-sound'
import alert from '../../audio/alert.mp3'
import { FirebaseContext } from '../Firebase';
import * as Logo from '../../drawables/Logo.gif'
import CheckInForm from '../CheckInForm/index'
import FormResult from '../Result';
import * as Utilities from '../../utilities'

const useStyles = createUseStyles({
  logoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    marginTop: 10,
    maxWidth: 200
  }
})

const App = () => {

  const classes = useStyles()
  const firebase = useContext(FirebaseContext)

  const [completed, setCompleted] = useState(false)
  const [hasSymptoms, setHasSymptoms] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [play] = useSound(alert)

  const onSubmit = values => {

    console.log(values)

    setDisabled(true)

    const date = new Date()
    const dateString = `${date.getFullYear()}${Utilities.toTwoDigits(date.getMonth() + 1)}${Utilities.toTwoDigits(date.getDate())}`
    const time = `${Utilities.toTwoDigits(date.getHours())}:${Utilities.toTwoDigits(date.getMinutes())}`
    
    // first write to database
    firebase.database.ref(dateString).push({
      parentName: values.parentName,
      mobileNumber: `${values.prefix}${values.mobileNumber}`,
      email: values.email ?? null,
      children: values.children ?? null,
      checkInTime: time,
      hasSymptoms: values.noSymptoms ? false : true,
      serverTimestamp: firebase.timestamp
    }).then(() => {
      // then write to mailchimp if requested
      if (values.recieveMarketing) {
        firebase.functions.httpsCallable('writeToMailchimp')(values)
      }
      play()
      setCompleted(true)
      if (values.noSymptoms !== true) {
        setHasSymptoms(true)
      }
      setTimeout(() => {
        window.location.href="https://www.fairycoolparties.com.au"
      }, 2000)
    })
    .catch(err => {
      console.error(err)
      message.error("Something went wrong while checking in.")
      setDisabled(false)
    })
  }

  return (
    <div className="App">
      <div className={classes.logoWrapper}>
        <img className={classes.logo} src={Logo.default} />
      </div>
      {completed
        ? <FormResult hasSymptoms={hasSymptoms} />
        : <CheckInForm onSubmit={onSubmit} disabled={disabled} />
      }
    </div>
  )
}

export default App;