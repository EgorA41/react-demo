import { Layout } from 'antd';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'center',
  width: '100%',
  padding: '1rem',
  height: 60,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: 'white',
};

export default function AppHeader () {
return ( <Layout.Header style={headerStyle}>Header</Layout.Header>)
}
