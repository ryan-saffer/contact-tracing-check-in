import React from 'react'
import { Result, Divider } from 'antd'

const FormResult = props => {

    const { hasSymptoms } = props

    if (!hasSymptoms) {
        return (
            <>
            <Divider />
            <Result
                status="success"
                title="Checked in!"
                subTitle="Thanks for keeping both yourself and the Fairy Cool Parties community safe 🙂"
            />
            </>
        )
    } else {
        return (
            <>
            <Divider />
            <Result
                status="warning"
                title="Please do not enter our store"
                subTitle="Since you are experiencing symptoms of COVID-19, please do not enter our store. If you are dropping/picking up children, please speak with one of our staff."
            />
            </>
        )
    }
}

export default FormResult