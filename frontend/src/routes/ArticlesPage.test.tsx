import { renderRoute } from 'tests/wrappers';
import userEvent from '@testing-library/user-event';

//TODO: remove all the warnings
describe('ArticlesPage', () => {
  it('navigates to the article page with correct information when an article card is clicked', async () => {
    const user = userEvent.setup();
    const container = renderRoute({
      memoryRouterOptions: { initialEntries: ['/articles'] }
    });

    const articleCard = await container.findByText('test title');
    expect(articleCard).toBeInTheDocument();

    await user.click(articleCard);

    expect(container.getByText('test title')).toBeInTheDocument();
    expect(container.getByText('test content')).toBeInTheDocument();
    expect(container.getByText('Dr. Constantin West')).toBeInTheDocument();
  });
});
