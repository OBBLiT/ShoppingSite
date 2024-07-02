import React from 'react';
import { BiCircle, BiSun } from 'react-icons/bi';
import './loading.css';
function loading() {
  return (
    <div className='cover'>
      <main className='loadingCont'>
        <div className='loading'>
          <BiCircle className='circle' />
          <BiSun className='revision' />
        </div>
      </main>
    </div>
  );
}

export default loading;
