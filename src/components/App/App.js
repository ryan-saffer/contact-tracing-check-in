import React, { useContext, useState } from 'react';
import './App.css';
import {createUseStyles} from 'react-jss'
import { Divider, Select } from 'antd';
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

  const onSubmit = values => {

    setDisabled(true)

    const date = new Date()
    const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
    const time = `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`

    firebase.database.ref(`${values.store}/${dateString}`).push({
      parentName: values.parentName,
      mobileNumber: values.mobileNumber,
      childName: values.childName,
      checkInTime: time,
      serverTimestamp: firebase.timestamp
    }).then(() => {
      setCompleted(true)
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