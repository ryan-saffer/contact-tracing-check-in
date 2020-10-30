import React from 'react'
import {createUseStyles} from 'react-jss'
import { Form, Input, Button, Select, Row, Divider } from 'antd';

const { Option } = Select;

const useStyles = createUseStyles({
    form: {
        width: '80%',
        maxWidth: 500
    }
})

const CheckInForm = props => {

    const classes = useStyles()

    const { onSubmit, disabled } = props

    const [form] = Form.useForm();

    return (
        <>
        <Divider>Check-in Form</Divider>
        <Row type="flex" justify="center">
            <Form className={classes.form} form={form} layout='vertical' onFinish={onSubmit} name="control-hooks">
                <Form.Item name="parentName" label="Your Name" rules={[{ required: true, message: "Name is required" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item name="mobileNumber" label="Your Mobile Number" rules={[{ required: true, message: "Mobile number is required" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item name="childName" label="Your Child's Name" rules={[{ required: false }]}>
                    <Input size="large" placeholder="Enter all children you are dropping off" />
                </Form.Item>
                <Form.Item name="store" label="Store" rules={[{ required: true, message: "Store is required" }]}>
                    <Select allowClear size="large">
                        <Option value="balwyn">Balwyn</Option>
                        <Option value="essendon">Essendon</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={disabled}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Row>
        </>
    )
}

export default CheckInForm