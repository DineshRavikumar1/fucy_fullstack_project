/* eslint-disable */
import * as React from 'react';
import { Box } from '@mui/system';
import { ArrowSquareLeft, ArrowSquareRight } from 'iconsax-react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ComponentList from '../../../views/Libraries';
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
  }
}));

export default function LeftDrawer({ state, drawerOpen, drawerClose }) {
  const classes = useStyles();
  const color = ColorTheme();
  const [expanded, setExpanded] = React.useState(false);

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
          <Typography variant="h4" align="center" mx={2}>
            Component Library
          </Typography>
          <Box mt={2}>
            <Components />
          </Box>
        </Box>
        {/* <Box sx={{ display: state ? 'block' : 'none', width: state ? 'inherit' : '0px', overflow: 'auto', marginTop:"1rem" }}>
                        <>
                                    <Accordion
                                        className={classes.accordion}
                                        expanded={expanded === 'panel1'}
                                        onChange={handleChange('panel1')}
                                    >
                                        <AccordionSummary
                                            sx={{
                                                '& .MuiAccordionSummary-content': { margin: '0px' }
                                            }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: 'auto', flexShrink: 0 }}> Component Library</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Components />
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion
                                        className={classes.accordion}
                                        expanded={expanded === 'panel2'}
                                        onChange={handleChange('panel2')}
                                    >
                                        <AccordionSummary
                                            sx={{ margin: '0px' }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography sx={{ width: 'auto', flexShrink: 0 }}>System Library</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ComponentList />
                                        </AccordionDetails>
                                    </Accordion>
                                
                        </>
                   
                </Box> */}
      </Box>
    </React.Fragment>
  );
}
