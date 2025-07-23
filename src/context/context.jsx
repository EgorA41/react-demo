import { createContext, useContext, useEffect, useState } from "react";
import { fetchAssets, fetchData } from '../components/api';
import { percentDifference } from '../components/util';

const CryptoContext = createContext ({
assets: [],
crypto: [],
loading: false
})

export function CryptoContextProvider ({children}) {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const [assets, setAssets] = useState([])

	function mapAssets(assets, result) {
		return assets.map(asset => {
			const coin = result.find((c) => c.id === asset.id)
			if (!coin) return asset;
			return {
				grow: asset.price < coin.price,
				growInPercent: percentDifference(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				... asset
			}
		})
	}

	useEffect(()=>{
		async function preload () {
			setLoading(true)

			const {result} = await fetchData()
			const assets = await fetchAssets()

			setAssets(mapAssets(assets, result))

			setData(result)
			setLoading(false)
		}
		preload()
	}, [])

	function addAsset(newAsset) {

		setAssets((prev)=> mapAssets([...prev, newAsset], data))
	}

	return <CryptoContext.Provider value={{ loading, crypto: data, assets, addAsset }}>
	{children}
	</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto () {
	return useContext(CryptoContext)
}
