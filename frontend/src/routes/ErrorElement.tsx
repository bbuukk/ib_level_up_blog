import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        Sorry, an unexpected error has occurred.
      </h1>
      <p className="text-lg text-gray-600">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
