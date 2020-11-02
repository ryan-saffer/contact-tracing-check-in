import React from 'react'
import {createUseStyles} from 'react-jss'
import { Typography } from 'antd'
import { SafetyCertificateTwoTone } from '@ant-design/icons'

const { Title, Text, Link } = Typography

const useStyles = createUseStyles({
    line: {
        textAlign: 'center'
    },
    icon: {
        fontSize: 32,
        marginBottom: 8
    }
})

const PrivacyInformation = () => {

    const classes = useStyles()

    return (
        <>
        <div className={classes.line}>
            <SafetyCertificateTwoTone className={classes.icon}/>
        </div>
        <div className={classes.line}>
            <Title level={4}>Your data is safe</Title>
        </div>
        <div className={classes.line}>
            This data is owned and stored <Text strong>entirely by us.</Text>
        </div>
        <div className={classes.line}>
            All data is <Text strong>destroyed</Text> after 28 days.
        </div>
        <div className={classes.line}>
            This data will only ever be shared with the <Link href="https://www.dhhs.vic.gov.au/" target="_blank">DHHS</Link> upon request.
        </div>
        <div className={classes.line}>
            You will <Text strong>not</Text> be contacted by us for marketing.
        </div>
        </>
    )
}

export default PrivacyInformation