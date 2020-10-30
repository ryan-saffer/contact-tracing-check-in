import React from 'react'
import { Result, Divider } from 'antd'

const SuccessResult = () => {

    return (
        <>
        <Divider />
        <Result
            status="success"
            title="Checked in!"
            subTitle="Thanks for keeping both yourself and the Fizz Kidz community safe 🙂"
        />
        </>
    )
}

export default SuccessResult