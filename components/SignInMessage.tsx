interface SignInMessageProps {
  username: string;
  isValid: boolean;
  isLoading: boolean;
}

const SignInMessage: React.FC<SignInMessageProps> = ({
  username,
  isValid,
  isLoading,
}) => {
  if (isLoading) {
    return <span>Checking...</span>;
  } else if (isValid) {
    return <span>{`${username} is available!`}</span>;
  } else if (username.length > 0 && username.length < 6) {
    return <span>{`${username} is too short!`}</span>;
  } else if (username && !isValid) {
    return <span>{`${username} is taken!`}</span>;
  }
  return <span></span>;
};

export default SignInMessage;
