import { useState } from "react"
import { Select, Space } from "antd"
import { useCrypto } from "../context/context"

export default function AssetForm () {
	const [coin, setCoin] = useState(null)
	const { crypto } = useCrypto()

	if (!coin) {
		return (<Select
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
return <form>Assets</form>
}
