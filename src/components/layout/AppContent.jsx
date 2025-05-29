import { Layout } from 'antd';
import { calc } from 'antd/es/theme/internal';

const contentStyle = {
  textAlign: 'center',
  minHeight: `calc(100vh - 60px)`,
  color: '#fff',
  backgroundColor: '#0958d9',
  padding: `1rem`,
};


export default function AppContent () {
return (  <Layout.Content style={contentStyle}>Content</Layout.Content>)
}
