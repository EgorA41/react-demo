import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/context';
import { useState, useEffect } from 'react';
import CoinModal from '../CoinModal';
import AssetForm from '../AddAssetForm';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'center',
  width: '100%',
  padding: '1rem',
  height: 60,
  lineHeight: '64px',
  backgroundColor: 'white',
};


export default function AppHeader () {

const [selectOpen, setSelectOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [coin, setCoin] = useState(null);
const [drawer, setDrawer] = useState(false);

const handleSelect = function (value) {
console.log('Выбрано:', value);
    setSelectOpen(false);
	setIsModalOpen(true)
	setCoin(crypto.find((c)=> c.id === value))
}

useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/') {
        setSelectOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

const {crypto} = useCrypto()
return (
<Layout.Header style={headerStyle}>
	<Select
	open={selectOpen}
    onOpenChange={setSelectOpen}
    onSelect={handleSelect}
	style={{ width: '250px' }}
	value="press / to open"
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
    <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
   	<Modal
        open={isModalOpen}
		onCancel={()=>setIsModalOpen(false)}
        footer = {null}>
        <CoinModal coin = { coin }/>
    </Modal>
	<Drawer
		width={600}
		destroyOnHidden
        onClose={() => setDrawer(false)}
        open={drawer}>
        <AssetForm onClose={()=> setDrawer(false)}/>
    </Drawer>
  </Layout.Header>)
}
