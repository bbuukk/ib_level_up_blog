import { http, HttpResponse } from 'msw';
import { server } from 'tests/setup';
import { renderRoute } from 'tests/wrappers';

describe.skip('Layout', () => {
  it('does not render sign in button, when user is authenticated', async () => {
    const container = renderRoute({
      memoryRouterOptions: { initialEntries: ['/'] }
    });

    expect(await container.findByText('Log Out')).toBeInTheDocument();
  });

  it('renders sign in button, when user is not authenticated', async () => {
    server.use(
      http.get('http://localhost:8000/api/me', () => {
        return HttpResponse.json({ message: 'Error' }, { status: 401 });
      })
    );

    const container = renderRoute({
      memoryRouterOptions: { initialEntries: ['/'] }
    });

    expect(
      await container.findByLabelText('loader authorized status')
    ).toBeInTheDocument();

    expect(await container.findByText('Sign In')).toBeInTheDocument();
  });
});
