import React, { useEffect, useState } from 'react';

const NoSsr = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted ? children : null}
    </>
  );
};

export default NoSsr;
