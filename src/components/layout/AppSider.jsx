import { Layout, Card, Statistic, List, Typography,Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchAssets, fetchData } from '../api';
import { percentDifference } from '../util';


const siderStyle = {
  textAlign: 'left',
  color: '#fff',
  backgroundColor: '#16777f',
  padding: '1rem',
};

export default function AppSider () {

	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const [assets, setAssets] = useState([])

	useEffect(()=>{
		async function preload () {
				setLoading(true)

				const {result} = await fetchData()
				const assets = await fetchAssets()

				setAssets(assets.map(asset => {
					const coin = result.find((c) => c.id === asset.id)
					 if (!coin) return asset;
					return {
						grow: asset.price < coin.price,
						growInPercent: percentDifference(asset.price, coin.price),
						totalAmount: asset.amount * coin.price,
						totalProfit: asset.amount * coin.price - asset.amount * asset.price,
						... asset

					}


				}))

				setData(result)
				setLoading(false)
		}
		preload()
	}, [])

	if(loading) {
		return <Spin fullscreen/>
	}


return (

	<Layout.Sider width= "25%" style={siderStyle}>
	{assets.map((asset) => (
	<Card key={asset.id}
		style={{ marginBottom: '1rem' }}>
		<Statistic
		  title= {asset.id}
          value={asset.totalAmount}
          precision={2}
          valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
          prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined /> }
          suffix="$"
		/>
		<List
  	dataSource={[
		{title: 'Total Profit', value: asset.totalProfit},
		{title: 'Asset Amount', value: asset.amount},
		{title: 'Difference', value: asset.growInPercent},
	]}
  	renderItem={(item) => (
    <List.Item>
		<span>{item.title}</span>
		<span>{item.value}</span>
    </List.Item>
  )}
/>
	</Card>
	))}
	</Layout.Sider>
)}
