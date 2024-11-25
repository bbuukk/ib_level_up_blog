import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import getRouteObjects from 'routes/getRouteObjects';

interface RenderRouteOptions {
  memoryRouterOptions: Parameters<typeof createMemoryRouter>[1];
}

export const renderRoute = (renderRouteOptions: RenderRouteOptions) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });

  const router = createMemoryRouter(
    getRouteObjects(queryClient),
    renderRouteOptions.memoryRouterOptions
  );

  return render(
    <StrictMode>
      <MantineProvider forceColorScheme="dark">
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
};
