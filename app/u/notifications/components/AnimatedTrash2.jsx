import React from 'react';
import Trash2 from '@material-ui/icons/DeleteOutlineOutlined';

import '@emotion/react';

const AnimatedTrash2 = () => {
  const handleClick = (event) => {
    const target = event.target;
    target.style.transform = 'scale(1.25) rotate(45deg)';

    setTimeout(() => {
      target.style.transform = 'scale(1) rotate(0)';
    }, 2000);
  };

  return (
    <div onClick={handleClick}>
      <Trash2
        className="cursor-pointer transition-all duration-200 ease-in-out"
        color="#ff0000"
      />
    </div>
  );
};

export default AnimatedTrash2;
