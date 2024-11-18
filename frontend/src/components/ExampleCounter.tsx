import { useEffect, useState } from 'react';
import ApiUser from 'types/ApiUser';
import { getMe } from 'utils/axios';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const [me, setMe] = useState<null | ApiUser>(null);

  // Just to test module mocking
  useEffect(() => {
    const fetchMe = async () => {
      const response = await getMe();
      console.log(response);
      setMe(response);
    };
    fetchMe();
  }, []);

  return (
    <main className="p-4">
      <p className="text-lg font-semibold">Count: {count}</p>
      <button
        className="mt-2 block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>

      <div className="mt-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your name"
          className="mt-1 block rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="name-input"
        />
      </div>
    </main>
  );
};

export default Counter;
