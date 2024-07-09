/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import useStore from '../../Zustand/store';
import AddIcon from '@mui/icons-material/Add';
import AddNewNode from '../../ui-component/Modal/AddNewNode';
import { Avatar, Typography } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ColorTheme from '../../store/ColorTheme';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  paper: {
    color: '#1d97fc',
    padding: '5px',
    border: '1px solid #1e88e5',
    boxShadow: '0px 0px 4px 2px #90caf9'
  }
}));
const selector = (state) => ({
  sidebarNodes: state.sidebarNodes,
  getSidebarNode: state.getSidebarNode,
  deleteNode: state.deleteNode,
  getComponent: state.getComponent
});

const Components = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { sidebarNodes, getSidebarNode, getComponent } = useStore(selector);
  const color = ColorTheme();

  const handleOnLeave = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }
    setHoveredItem(null);
    setOpenModal(false);
    setAnchorEl(null);
  };

  const [hoveredItem, setHoveredItem] = useState(null);
  const handleMouseEnter = (event, item) => {
    setHoveredItem(item);
    setAnchorEl(event.currentTarget);
    setOpenModal(true);
  };

  const onDragStart = (event, item) => {
    const parseFile = JSON.stringify(item);
    event.dataTransfer.setData('application/parseFile', parseFile);
    event.dataTransfer.effectAllowed = 'move';
  };

  useEffect(() => {
    getSidebarNode();
    getComponent();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function stringAvatar(name) {
    if (name.split(' ')[1]) {
      return { children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` };
    }
    return {
      children: `${name.split(' ')[0][0]}`
    };
  }

  return (
    <>
      <Box
        component="nav"
        aria-label="sidebar"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, overflowX: 'hidden' }}
      >
        {sidebarNodes.map((item, i) => (
          <Box key={i} display="flex" flexDirection="column" alignItems="center" gap={1} onMouseEnter={(e) => handleMouseEnter(e, item)}>
            <Avatar {...stringAvatar(item?.name)} variant="rounded" sx={{ width: 56, height: 56 }} />
            <Typography variant="h6" color={'#1d97fc'}>{item?.name}</Typography>
            <Popper open={openModal && hoveredItem === item} anchorEl={anchorEl} placement="right" transition disablePortal>
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: 'left top'
                  }}
                >
                  <Paper onMouseLeave={handleOnLeave} sx={{ backgroundColor: color?.leftbarBG }} className={classes?.paper}>
                    <ClickAwayListener onClickAway={handleOnLeave}>
                      <MenuList autoFocusItem={openModal}>
                        {item?.nodes?.map((node) => (
                          <MenuItem draggable onDragStart={(event) => onDragStart(event, node)} key={node?.id} onClick={handleOnLeave}>
                            {node?.data['label']}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        ))}
        <AddIcon sx={{ fontSize: 20, color: 'blue', cursor: 'pointer' }} onClick={handleOpen} />
      </Box>
      <AddNewNode open={open} handleClose={handleClose} getSidebarNode={getSidebarNode} />
    </>
  );
};

export default Components;
