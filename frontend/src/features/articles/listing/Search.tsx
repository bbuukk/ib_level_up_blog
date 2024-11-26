import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dispatch, SetStateAction } from 'react';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';

interface searchProps {
  params: ApiArticlesIndexRequestParams;
  setParams: Dispatch<SetStateAction<ApiArticlesIndexRequestParams>>;
}

//TODO: !fix look
const Search = ({ params, setParams }: searchProps) => {
  const searchKeyWordForm = useForm<{ searchKeyword: string }>({
    initialValues: {
      searchKeyword: ''
    }
  });

  const handlSearchKeywordForm = ({
    searchKeyword
  }: {
    searchKeyword: string;
  }) => {
    setParams({
      ...params,
      search: searchKeyword ? searchKeyword : undefined
    });
  };

  return (
    <form
      className="searchArticlesForm"
      onSubmit={searchKeyWordForm.onSubmit(handlSearchKeywordForm)}
    >
      <TextInput
        {...searchKeyWordForm.getInputProps('searchKeyword')}
        placeholder="Search by keyword..."
        mr="sm"
        rightSection={
          <Button className="searchArticlesForm__submitBtn" type="submit">
            🔍
          </Button>
        }
      />
    </form>
  );
};

export default Search;
