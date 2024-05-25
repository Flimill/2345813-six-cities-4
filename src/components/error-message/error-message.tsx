import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ERRORMESSAGE_STYLE } from './error-message-style';

const ErrorMessage: React.FC = () => {
  const error = useSelector((state: RootState) => state.status.error);


  let message = '';
  if (error === 'SERVER_UNAVAILABLE') {
    message = 'Server is currently unavailable. Please try again later.';
    return (
      <div style={ERRORMESSAGE_STYLE}>
        {message}
      </div>
    );
  } else {
    return null;
  }


};

export default ErrorMessage;
