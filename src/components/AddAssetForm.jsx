import { useState } from "react"
import { useCrypto } from "../context/context"
import {
	Select,
	Space,
	Divider,
	Form,
	DatePicker,
	InputNumber,
	Button,
	Result } from "antd"
import CoinInfo from "./layout/CoinInfo"

const validateMessages = {
	required: '${label} is required!',
	types: {
		number: '${label} is not valid number',
	},
	number: {
		range: '${label} must be between ${min} and ${max}'
	},
}


export default function AssetForm ({onClose}) {
	const [form] = Form.useForm()
	const [coin, setCoin] = useState(null)
	const { crypto } = useCrypto()
	const [submitted, setSubmitted] = useState(false)

	if (submitted) {
		return (
		<Result
			status="success"
			title="Successfully Added"
			subTitle={`Added ${42} of ${coin.name} by price ${24}`}
			extra={[
			<Button type="primary" key="close" onClick={onClose}>
				Close
			</Button>,
			]}
  		/>)
	}

	if (!coin) {
		return (
		<Select
		onSelect={(value) => setCoin(crypto.find((c) => c.id === value ))}
		style={{ width: '100%' }}
		placeholder="Select coin"
		options={crypto.map((coin) => ({
			label: coin.name,
			value: coin.id,
			icon: coin.icon,
		}))}
		optionRender={option => (
		<Space>
			<img style={{width: '20px'}}
			src={option.data.icon}
			alt = {option.data.label} />
			{option.data.label}
		</Space>
		)}
		/>
	)}
function onFinish (values) {
	console.log('finish', values)
	setSubmitted(true)
}

function handleAmountChange (value) {
	const price = form.getFieldValue('price')
	form.setFieldsValue({
		total: +(value * price).toFixed(2),
	})
}

function handlePriceChange (value) {
	const amount = form.getFieldValue('amount')
	form.setFieldsValue({
		total: +(value * amount).toFixed(2),
	})
}

return (

	<Form
	form={form}
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 18 }}
    style={{ maxWidth: 600 }}
    initialValues={{price: coin.price.toFixed(2)}}
    onFinish={onFinish}
	validateMessages={validateMessages}>
		<CoinInfo coin = {coin}/>
		<Divider />
		<Form.Item
			label="Amount"
			name="amount"
			placeholder="Enter amount"
			rules={[{ required: true, type: 'number', min: 0,}]}
			>
		<InputNumber
		onChange={handleAmountChange}
		style={{width: '100%'}}/>
		</Form.Item>

    	<Form.Item
			label="Price"
			name="price">
    	<InputNumber
		onChange={handlePriceChange}
		style={{width: '100%'}}/>
    	</Form.Item>
		<Form.Item
			label="Date & Time"
			name="date"
			>
    	<DatePicker showTime style={{width: '100%'}}/>
    	</Form.Item>
		<Form.Item
			label="Total"
			name="total"
			>
    	<InputNumber
		disabled
		style={{width: '100%'}}/>
    	</Form.Item>
		<Form.Item label={null}>
			<Button type="primary" htmlType="submit">
				Add Asset
			</Button>
		</Form.Item>
	  </Form>
)}
