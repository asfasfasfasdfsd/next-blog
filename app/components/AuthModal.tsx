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
  const [inputs, setInputs] = React.useState({
    first_name: '',
    last_name: '',
    city: '',
    phone: '',
    email: '',
    password: '',
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let msg = '';
  const getContent = () => {
    if (SignIn) return ['Sign In', 'bg-blue-400 text-white  mr-3'];
    else return ['Sign Up', ''];
  };
  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  const content = getContent();
  return (
    <>
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
              <h2>{msg}</h2>
              <input
                type='text'
                value={inputs.email}
                name='email'
                onChange={(e) => {
                  handleInputs(e);
                }}
                className='bg-slate-100 rounded p-3 w-full m-2'
                placeholder='email'
              />
              <input
                value={inputs.password}
                name='password'
                onChange={(e) => {
                  handleInputs(e);
                }}
                type='text'
                className='bg-slate-100 rounded w-full p-3 m-2'
                placeholder='password'
              />
              <button className='border rounded-md w-[20%] p-2 bg-blue-500 hover:bg-blue-200'>
                Sign In
              </button>
            </div>
          ) : (
            <div className='my-3   text-sm'>
              <h2>{msg}</h2>
              <input
                value={inputs.first_name}
                placeholder='first Name'
                type='text'
                name='first_name'
                className='bg-gray-200 rounded p-2 py-3 mr-1 w-[49%]'
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
              <input
                value={inputs.last_name}
                placeholder='last Name'
                type='text'
                name='last_name'
                className='bg-gray-200 rounded p-2 py-3 w-[49%]'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputs(e);
                }}
              />
              <input
                value={inputs.city}
                placeholder='city'
                name='city'
                type='text'
                className='bg-gray-200 rounded p-2 py-3 w-full my-2'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputs(e);
                }}
              />
              <input
                value={inputs.phone}
                placeholder='phone number'
                type='number'
                name='phone'
                className='bg-gray-200 rounded p-2 py-3 w-full my-2'
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputs(e);
                }}
              />
              <input
                value={inputs.email}
                placeholder='email'
                type='email'
                name='email'
                className='bg-gray-200 rounded p-2 py-3 w-full my-2'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputs(e);
                }}
              />
              <input
                value={inputs.password}
                name='password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputs(e);
                }}
                placeholder='password'
                type='password'
                className='bg-gray-200 rounded p-2 py-3 w-full my-2'
              />
              <button className='border rounded-md justify-center  ml-auto w-[50%] p-2 bg-blue-500 hover:bg-blue-200 '>
                Sign Up
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}
