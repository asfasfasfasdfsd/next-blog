'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ SignIn }: { SignIn: boolean }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getContent = () => {
    if (SignIn) return ['Sign In', 'bg-blue-400 text-white  mr-3'];
    else return ['Sign Up', ''];
  };
  const content = getContent();
  return (
    <div>
      <button
        onClick={() => {
          handleOpen();
        }}
        className={`${content[1]}border p-1 px-4 rounded `}
      >
        {content[0]}{' '}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {SignIn == true ? (
            <div className='text-center '>
              <h2>Log In to Your Account</h2>
              <input
                type='text'
                className='bg-slate-100 rounded p-3 w-full m-2'
                placeholder='email'
              />
              <input
                type='text'
                className='bg-slate-100 rounded w-full p-3 m-2'
                placeholder='password'
              />
              <button className='border rounded-md w-[20%] p-2 bg-slate-500 hover:bg-slate-200'>
                Sign In
              </button>
            </div>
          ) : (
            <div className='my-3 flex flex-row justify-between text-sm'>
              First Name{' '}
              <input
                type='text'
                className='bg-gray-200 border-rounded p-2 py-3 w-[49%]'
              />
              Last Name{' '}
              <input
                type='text'
                className='bg-gray-200 border-rounded p-2 py-3 w-[49%]'
              />
              City{' '}
              <input
                type='text'
                className='bg-gray-200 border-rounded p-2 py-3 w-[49%]'
              />
              phone{' '}
              <input
                type='number'
                className='bg-gray-200 border-rounded p-2 py-3 w-[49%]'
                maxLength={10}
              />
              e-mail password{' '}
              <input
                type='password'
                className='bg-gray-200 border-rounded p-2 py-3 w-[49%]'
              />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
