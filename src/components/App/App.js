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
    const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
    const time = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`

    firebase.database.ref(`${values.store}/${dateString}`).push({
      parentName: values.parentName,
      mobileNumber: values.mobileNumber,
      childName: values.childName,
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