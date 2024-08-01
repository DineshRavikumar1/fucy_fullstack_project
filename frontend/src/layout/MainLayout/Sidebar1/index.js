/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, Tabs, Tab, Popper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
// import LogoSection from '../LogoSection';
import { drawerWidth, height, navbarHeight, sidebarWidth } from '../../../store/constant';
import ColorTheme from '../../../store/ColorTheme';
import useStore from '../../../Zustand/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearProperties } from '../../../store/slices/PageSectionSlice';
import BrowserCard from '../Sidebar/BrowserCard/index1';
import MenuCard from '../Sidebar/MenuCard';
import { makeStyles } from '@mui/styles';
import MenuList from '../Header1/MenuList';

// ==============================|| SIDEBAR DRAWER ||============================== //
const useStyles = makeStyles(() => ({
  icon: {
    fontSize: 18,
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer', // Indicate that it's clickable
    zIndex: 1400
  }
}));
const selector = (state) => ({
  template: state.template,
  modals: state.Modals,
  fetchAPI: state.fetchAPI,
  fetchModals: state.getModals
});

export default function Sidebar1({ drawerOpen, drawerToggle, window }) {
  const classes = useStyles();
  const color = ColorTheme();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { template, fetchAPI, fetchModals, modals } = useStore(selector);
  const theme = useTheme();
  const { isNavbarClose } = useSelector((state) => state.currentId);
  const { Properties } = useSelector((state) => state?.pageName);

  useEffect(() => {
    fetchAPI();
    fetchModals();
    dispatch(clearProperties());
  }, [fetchAPI, fetchModals, dispatch]);

  const handleTabClick = (event, newValue) => {
    setSelectedTab(newValue);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTab(null);
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <>
            <BrowserCard template={template} modals={modals} />
            {Properties && Properties.length > 0 && <MenuCard properties={Properties} />}
          </>
        );

      case 1:
        return (
          <Typography>
            <MenuList />
          </Typography>
        );

      default:
        return null;
    }
  };

  const open = Boolean(anchorEl);

  const drawer = (
    <>
      <Box
        sx={
          {
            // display: { xs: 'block', md: 'none' },
          }
        }
      >
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>{/* <LogoSection /> */}</Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: 'calc(80vh - 88px)',
            marginTop: '1.4rem'
          }}
        >
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabClick}
            aria-label="Sidebar Tabs"
            indicatorColor="primary"
            sx={{
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                flexDirection: 'column'
              }
            }}
          >
            <Tab icon={<HomeIcon />} aria-label="Home" sx={{ minWidth: 'auto' }} />
            <Tab icon={<InfoIcon />} aria-label="Info" sx={{ minWidth: 'auto' }} />
          </Tabs>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement="right-start"
            sx={{
              zIndex: 1300, // Ensure the Popper is above other elements
              width: sidebarWidth, // Adjust width as needed
              marginTop: navbarHeight, // Adjust to position below the navbar
              position: 'relative',
              boxShadow: '0px 0px 10px gray',
              borderRadius: '8px'
            }}
          >
            <Box sx={{ p: 2, bgcolor: 'background.paper', height: 'auto', maxHeight: '75svh', borderRadius: '8px' }}>
              <CancelIcon onClick={handleClose} className={classes.icon} />
              {renderComponent()}
            </Box>
          </Popper>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>{/* <MenuCard /> */}</Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { md: 0 },
        width: drawerWidth,
        background: color?.sidebarBG,
        mt: `${navbarHeight}px`,
        height: height
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={'persistent'}
        anchor="left"
        open={true}
        // onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            borderRight: `1px solid ${color?.tabBG}`,
            width: drawerWidth,
            background: color?.sidebarBG,
            color: theme.palette.text.primary,
            top: !isNavbarClose ? navbarHeight : '0px'
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

Sidebar1.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};