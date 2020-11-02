import React, { useContext, useState } from 'react';
import './App.css';
import {createUseStyles} from 'react-jss'
import { message } from 'antd';
import useSound from 'use-sound'
import alert from '../../audio/alert.mp3'
import { FirebaseContext } from '../Firebase';
import * as Logo from '../../drawables/FizzKidzLogoHorizontal.png'
import CheckInForm from '../CheckInForm/index'
import SuccessResult from '../Result';
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
  const [disabled, setDisabled] = useState(false)

  const [play] = useSound(alert)

  const onSubmit = values => {

    setDisabled(true)

    const date = new Date()
    const dateString = `${date.getFullYear()}${Utilities.toTwoDigits(date.getMonth() + 1)}${Utilities.toTwoDigits(date.getDate())}`
    const time = `${Utilities.toTwoDigits(date.getHours())}:${Utilities.toTwoDigits(date.getMinutes())}`
    
    firebase.database.ref(`${values.store}/${dateString}`).push({
      parentName: values.parentName,
      mobileNumber: `${values.prefix}${values.mobileNumber}`,
      children: values.children ?? null,
      checkInTime: time,
      serverTimestamp: firebase.timestamp
    }).then(() => {
      play()
      setCompleted(true)
      setTimeout(() => {
        window.location.href="https://www.fizzkidz.com.au"
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
        ? <SuccessResult />
        : <CheckInForm onSubmit={onSubmit} disabled={disabled} />
      }
    </div>
  )
}

export default App;