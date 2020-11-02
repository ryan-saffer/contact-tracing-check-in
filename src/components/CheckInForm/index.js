import React from 'react'
import {createUseStyles} from 'react-jss'
import { Form, Input, Button, Select, Row, Divider, Space, Spin, Typography, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import PrivacyInformation from './PrivacyInformation'

const { Text } = Typography
const { Option } = Select;

const useStyles = createUseStyles({
    form: {
        width: '80%',
        maxWidth: 500
    },
    childrenHeading: {
        paddingTop: 8
    },
    child: {
        display: 'flex',
    },
    submitButton: {
        marginTop: 24
    },
    spinWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    spin: {
        marginTop: 32
    }
})

const CheckInForm = props => {

    const classes = useStyles()

    const { onSubmit, disabled } = props

    const [form] = Form.useForm();

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select>
                <Option value="+61">+61</Option>
            </Select>
        </Form.Item>
    );

    const initialValues = {
        prefix: "+61"
    }

    return (
        <>
        <Divider>Check-in Form</Divider>
        <Row type="flex" justify="center">
            <Form className={classes.form} form={form} initialValues={initialValues} layout='vertical' onFinish={onSubmit} name="control-hooks">
                <Form.Item name="parentName" label="Your Name" rules={[{ required: true, message: "Name is required" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item name="mobileNumber" label="Your Mobile Number" rules={[{ required: true, message: "Mobile number is required" }]}>
                    <Input size="large" addonBefore={prefixSelector} />
                </Form.Item>
                <Text>If dropping off children, add them here</Text>
                <div className={classes.childrenHeading} />
                <Form.List name="children">
                    {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                            <Space className={classes.child} key={field.key} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'childName']}
                                    fieldKey={[field.fieldKey, 'childName']}
                                    rules={[{ required: true, message: 'Missing child name' }]}
                                >
                                    <Input size="large" placeholder="Child name" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" size="large" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add child
                            </Button>
                        </Form.Item>
                    </>
                    )}
                </Form.List>
                <Form.Item name="store" label="Store" rules={[{ required: true, message: "Store is required" }]}>
                    <Select allowClear size="large">
                        <Option value="balwyn">Balwyn</Option>
                        <Option value="essendon">Essendon</Option>
                    </Select>
                </Form.Item>
                <PrivacyInformation />
                <Form.Item>
                    {disabled
                        ? <div className={classes.spinWrapper}><Spin className={classes.spin} /></div>
                        : (
                            <Button className={classes.submitButton} type="primary" size="large" htmlType="submit" block disabled={disabled}>
                                Check in
                            </Button>
                        )
                    }
                </Form.Item>
            </Form>
        </Row>
        </>
    )
}

export default CheckInForm