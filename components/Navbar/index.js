import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'sticky', // Use 'sticky' instead of 'absolute'
  top: 0,
  left: 0,
  zIndex: 1000,
  // Adding box-shadow to improve visibility
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <Navbar>
      <ul style={{ padding: '10px 20px', margin: 0 }}>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </ul>
    </Navbar>
  );
};

export default TopNavbar;
