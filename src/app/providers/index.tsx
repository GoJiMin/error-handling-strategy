import GlobalErrorBoundary from './GlobalErrorBoundary';
import GlobalErrorSubscriber from './GlobalErrorSubscriber';
import ReactQueryProvider from './ReactQueryProvider';
import {Toaster} from 'sonner';

type Props = {
  children: React.ReactNode;
};

export default function Providers({children}: Props) {
  return (
    <GlobalErrorBoundary>
      <GlobalErrorSubscriber>
        <ReactQueryProvider>
          {children}

          <Toaster position="top-center" />
        </ReactQueryProvider>
      </GlobalErrorSubscriber>
    </GlobalErrorBoundary>
  );
}
