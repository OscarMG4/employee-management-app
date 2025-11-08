import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, Layout } from 'antd';
import esES from 'antd/locale/es_ES';
import { Toaster } from 'react-hot-toast';
import DepartmentsPage from './pages/departments-page';
import { Navbar } from './components/layout/navbar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ConfigProvider locale={esES}>
      <QueryClientProvider client={queryClient}>
        <Layout style={{ minHeight: '100vh' }}>
          <Navbar />
          <DepartmentsPage />
        </Layout>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
