import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ColorTheme from '../../../../store/ColorTheme';
import { NavLink } from 'react-router-dom';

export default function LeftSection() {
  const color = ColorTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const menuItems = [
    { name: 'File', options: ['New', 'Open', 'Save', 'Exit'] },
    { name: 'Edit', options: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'] },
    { name: 'View', options: ['Zoom In', 'Zoom Out', 'Full Screen'] },
    { name: 'Select', options: ['Select All', 'Deselect All'] },
    { name: 'Insert', options: ['Image', 'Table', 'Link'] }
  ];

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMenu(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <NavLink to="/home" style={{ fontSize: 16, fontWeight: 600, color: color?.logo, textDecoration: 'none' }}>
        FUCY TECH
      </NavLink>
      {menuItems.map((item, index) => (
        <Box key={index}>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <div>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  cursor: 'pointer',
                  color: color?.title,
                  mx: 0.5,
                  px: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    p: 0.5
                  }
                }}
                onMouseEnter={(e) => handleMenuOpen(e, index)}
              >
                {item.name}
              </Typography>
              <Menu
                anchorEl={selectedMenu === index ? anchorEl : null}
                open={selectedMenu === index && Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                MenuListProps={{
                  onMouseLeave: handleMenuClose // Close menu when mouse leaves
                }}
                sx={{
                  pointerEvents: 'none'
                }}
                PaperProps={{
                  sx: { pointerEvents: 'auto' } // Allows menu to respond to mouse events
                }}
              >
                {item.options.map((option, i) => (
                  <MenuItem key={i} onClick={handleMenuClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </ClickAwayListener>
        </Box>
      ))}
    </Box>
  );
}
