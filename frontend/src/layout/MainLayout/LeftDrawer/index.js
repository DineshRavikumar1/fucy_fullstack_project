/* eslint-disable */
import * as React from 'react';
import { Box } from '@mui/system';
import { Radio, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { ArrowSquareLeft, ArrowSquareRight } from 'iconsax-react';
import Components from '../../../views/NodeList';
import { makeStyles } from '@mui/styles';
import ColorTheme from '../../../store/ColorTheme';

const useStyles = makeStyles(() => ({
  accordion: {
    width: '210px',
    backgroundColor: 'transparent',
    '&.MuiPaper-root ': {
      margin: '0px !important'
    }
  },
  arrow: {
    cursor: 'pointer',
    position: 'relative',
    // right: '1.3rem',
    top: '.2rem',
    height: 'fit-content'
  },
  formControl: {
    display: 'flex',
    width: 'inherit',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0
  }
}));

export default function LeftDrawer({ state, drawerOpen, drawerClose }) {
  const classes = useStyles();
  const color = ColorTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState('Component');

  const handleToggle = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: color?.leftbarBG,
          //   borderRight: '1px solid gray',
          boxShadow: '0px 1px 5px gray',
          position: 'sticky',
          float: 'left',
          // left: '50rem',
          transition: 'width 0.5s',
          width: state ? '160px' : '0px',
          height: 'inherit',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
          // pr:1
        }}
      >
        {!state ? (
          <Box onClick={drawerOpen} className={classes.arrow}>
            <ArrowSquareRight size="20px" color={color?.iconColor} />
          </Box>
        ) : (
          <Box onClick={drawerClose} className={classes.arrow}>
            <ArrowSquareLeft size="20px" color={color?.iconColor} />
          </Box>
        )}

        <Box
          sx={{
            display: state ? 'block' : 'none',
            width: state ? 'inherit' : '0px',
            overflow: 'auto',
            marginTop: '1rem',
            scrollbarWidth: 'none'
            // border: '1px solid #1E88E5'
          }}
        >
          <FormControl className={classes.formControl}>
            <FormLabel id="demo-controlled-radio-buttons-group">Library</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleToggle}
            >
              <FormControlLabel value="Component" control={<Radio />} label="Component" />
              <FormControlLabel value="System" control={<Radio />} label="System" />
            </RadioGroup>
          </FormControl>
          {/* <Typography variant="h4" align="center" mx={2}>
            Component Library
          </Typography> */}
          {value === 'Component' ? (
            <Box mt={2}>
              <Components />
            </Box>
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}
