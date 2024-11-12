import IsAuthorizedRequestStatus from '../types/IsAuthorizedRequestStatus';
import useGetMe from './useGetMe';

const useNewAuth = () => {
  const { data, error } = useGetMe();
  console.log(error);

  if (error) {
    return IsAuthorizedRequestStatus.NOT_AUTHORIZED;
  } else if (data) {
    return IsAuthorizedRequestStatus.AUTHORIZED;
  }

  return IsAuthorizedRequestStatus.UNKNOWN;
};

export default useNewAuth;
