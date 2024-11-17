import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { notifications, Notifications } from '@mantine/notifications';
import { isAxiosError } from 'axios';

import getRouteObjects from 'routes/getRouteObjects';
import { customMantineTheme } from 'utils/mantineConfig';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        // We don't want to show error notification if user is not logged in
        return;
      }
      notifications.show({
        title: 'Error',
        message: `Something went wrong: ${error.message}`,
        color: 'red'
      });
    }
  })
});

const router = createBrowserRouter(getRouteObjects(queryClient));

function App() {
  return (
    <StrictMode>
      <MantineProvider theme={customMantineTheme} forceColorScheme="dark">
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
