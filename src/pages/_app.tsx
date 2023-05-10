import GlobalProvider from '@/contexts/global.context';
import StyledGlobal from '@/styles/global.styles';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalProvider>
      <StyledGlobal />
      <ToastContainer
        className="my-toast"
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Component {...pageProps} />
    </GlobalProvider>
  );
};

export default App;
