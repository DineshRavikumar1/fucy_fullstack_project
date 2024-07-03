import { makeStyles } from '@mui/styles';
import { Box, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import {
    // TextBold,
    // TextUnderline,
    // TextItalic,
    // ArrowForward,
    // Back,
    TextalignJustifycenter,
    BrushBig
} from 'iconsax-react';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import GetAppIcon from '@mui/icons-material/GetApp';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import FontSizeSelector from './FontResizer';
import FontSelector from './FontSelector';
import CreateIcon from '@mui/icons-material/Create';
import ColorTheme from '../../store/ColorTheme';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

const useStyles = makeStyles((theme) => ({
    header: {
        width: 'inherit',
        height: '2rem',
        borderBottom: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '0 1rem',
        [theme.breakpoints.down('md')]: {
            overflow: 'auto',
            scrollbarWidth:'none'
        },

    },
    icons: {
        fontSize: '20px'
    }
}));
export default function Header({
    selectedNode,
    nodes,
    setSelectedNode,
    setNodes,
    horizontal,
    vertical,
    handleClear,
    handleSave,
    download
}) {
    const color = ColorTheme();
    const classes = useStyles();
    const { iconColor } = color;
    // console.log('nodes', nodes);
    // console.log('selectedNode', selectedNode);
    const [highlight, setHighlight] = useState({
        bold: false,
        italic: false,
        decor: false
    });
    const [styles, setStyles] = useState({
        backgroundColor: '',
        fontSize: 12,
        fontFamily: '',
        fontStyle: '',
        textAlign: '',
        color: '',
        fontWeight: 0,
        textDecoration: '',
        borderColor: '',
        borderWidth: '',
        borderStyle: ''
    });
    const number = useCallback((size) => {
        let sum = size?.slice(0, size.indexOf('p'));
        return Number(sum);
    }, []);

    useEffect(() => {
        setStyles({
            ...styles,
            backgroundColor:selectedNode?.data?.style?.backgroundColor,
            fontSize: number(selectedNode?.data?.style?.fontSize) ?? 12,
            fontFamily: selectedNode?.data?.style?.fontFamily ?? 'Inter',
            fontStyle: selectedNode?.data?.style?.fontStyle ?? 'normal',
            textAlign: selectedNode?.data?.style?.textAlign ?? 'center',
            color: selectedNode?.data?.style?.color ?? 'white',
            fontWeight: selectedNode?.data?.style?.fontWeight ?? 500,
            textDecoration: selectedNode?.data?.style?.textDecoration ?? 'none',
            borderColor: selectedNode?.data?.style?.borderColor ?? 'none',
            borderWidth: selectedNode?.data?.style?.borderWidth ?? '2px',
            borderStyle: selectedNode?.data?.style?.borderStyle ?? 'solid'
        });
        setHighlight({
            ...highlight,
            bold: selectedNode?.data?.style?.fontSize === 700 ? true : false,
            italic: selectedNode?.data?.style?.fontStyle === 'italic' ? true : false,
            decor: selectedNode?.data?.style?.textDecoration === 'underline' ? true : false
        });
    }, [selectedNode]);
    // console.log('style', styles)

    const handleFontStyle = (name) => {
        const list = [...nodes];
        const node = list?.find((nd) => nd?.id === selectedNode?.id);
        const Index = list?.findIndex((nd) => nd?.id === selectedNode?.id);
        const { style } = node.data;
        if (name === 'bold' && !highlight?.bold) {
            setStyles((state) => ({ ...state, fontWeight: 600 }));
            setHighlight((state) => ({ ...state, bold: !state.bold }));
            style.fontWeight = 700;
        } else if (name === 'bold' && highlight?.bold) {
            setStyles((state) => ({ ...state, fontWeight: 500 }));
            setHighlight((state) => ({ ...state, bold: !state.bold }));
            style.fontWeight = 500;
        }
        if (name === 'italic' && !highlight?.italic) {
            setStyles((state) => ({ ...state, fontStyle: name }));
            setHighlight((state) => ({ ...state, italic: !state.italic }));
            style.fontStyle = 'italic';
        } else if (name === 'italic' && highlight?.italic) {
            setStyles((state) => ({ ...state, fontStyle: name }));
            setHighlight((state) => ({ ...state, italic: !state.italic }));
            style.fontStyle = 'normal';
        }
        if (name === 'underline' && !highlight?.decor) {
            setStyles((state) => ({ ...state, textDecoration: 'underline' }));
            setHighlight((state) => ({ ...state, decor: !state.decor }));
            style.textDecoration = 'underline';
        } else if (name === 'underline' && highlight?.decor) {
            setStyles((state) => ({ ...state, textDecoration: 'underline' }));
            setHighlight((state) => ({ ...state, decor: !state.decor }));
            style.textDecoration = 'none';
        }
        setSelectedNode(node);
        list[Index] = node;
        setNodes(list);
    };

    // console.log('fontSize', typeof styles?.fontSize);
    const handleFontSizeChange = (event) => {
        const list = [...nodes];
        const node = list?.find((nd) => nd?.id === selectedNode?.id);
        const Index = list?.findIndex((nd) => nd?.id === selectedNode?.id);
        const { style } = node.data;
        setStyles((state) => ({ ...state, fontSize: parseInt(event.target.value, 10) }));
        style.fontSize = event.target.value;
        setSelectedNode(node);
        list[Index] = node;
        setNodes(list);
    };

    const changeFontSize = (name) => {
        const list = [...nodes];
        const node = list?.find((nd) => nd?.id === selectedNode?.id);
        const Index = list?.findIndex((nd) => nd?.id === selectedNode?.id);
        const { style } = node.data;
        if (name === 'inc') {
            setStyles((state) => ({ ...state, fontSize: state.fontSize + 2 }));
            style.fontSize = `${styles.fontSize + 2}px`;
        } else {
            setStyles((state) => ({ ...state, fontSize: state.fontSize - 2 }));
            style.fontSize = `${styles.fontSize - 2}px`;
        }
        setSelectedNode(node);
        list[Index] = node;
        setNodes(list);
    };

    //   console.log('nodes', nodes)

    const handleChange = (event, name) => {
        // console.log('event', event.target.value)
        // console.log('name', name)
        const list = [...nodes];
        const node = list?.find((nd) => nd?.id === selectedNode?.id);
        const Index = list?.findIndex((nd) => nd?.id === selectedNode?.id);
        const { style } = node.data;
        if (name === 'font') {
            setStyles((state) => ({ ...state, fontFamily: event.target.value }));
            style.fontFamily = event.target.value;
        }
        else if (name === 'border') {
            setStyles({ ...styles, borderColor: event.target.value });
            style.borderColor = event.target.value;
        }
        else if (name === 'bgColor') {
            setStyles({ ...styles, backgroundColor: event.target.value });
            style.backgroundColor = event.target.value;
        }
        else {
            setStyles({ ...styles, color: event.target.value });
            style.color = event.target.value;
        }
        setSelectedNode(node);
        list[Index] = node;
        setNodes(list);
    };

    // console.log('styles', styles)
    return (
        <>
            <Box className={classes.header} sx={{ background: color?.canvasBG }}>
                {/* <Back size="20" color={iconColor} />
                <ArrowForward color={iconColor} /> */}
                <FontSizeSelector fontSize={styles?.fontSize} handleFontSizeChange={handleFontSizeChange} changeFontSize={changeFontSize} />
                <FontSelector font={styles?.fontFamily} handleChange={handleChange} />
                <FormatBoldIcon
                    onClick={() => handleFontStyle('bold')}
                    sx={{
                        backgroundColor: highlight?.bold ? '#5fc9f3' : 'transparent',
                        opacity: 0.8,
                        border: highlight?.bold ? '1px solid #2772db' : 'none',
                        padding: '1px',
                        color: highlight?.bold ? 'black' : iconColor,
                        fontWeight: highlight?.bold ? 700 : 500
                    }}
                />
                <FormatUnderlinedIcon
                    onClick={() => handleFontStyle('underline')}
                    sx={{
                        backgroundColor: highlight?.decor ? '#5fc9f3' : 'transparent',
                        opacity: 0.8,
                        border: highlight?.decor ? '1px solid #2772db' : 'none',
                        padding: '1px',
                        color: highlight?.decor ? 'black' : iconColor,
                        fontWeight: highlight?.decor ? 700 : 500
                    }}
                />
                <FormatItalicIcon
                    onClick={() => handleFontStyle('italic')}
                    sx={{
                        backgroundColor: highlight?.italic ? '#5fc9f3' : 'transparent',
                        opacity: 0.8,
                        border: highlight?.italic ? '1px solid #2772db' : 'none',
                        padding: '1px',
                        color: highlight?.italic ? 'black' : iconColor,
                        fontWeight: highlight?.italic ? 700 : 500
                    }}
                />
                <TextalignJustifycenter size="20" color={iconColor} />
                <label htmlFor="color" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '1.8rem' }}>
                    <CreateIcon color={iconColor} sx={{ fontSize:'1.3rem' }} />
                    <span
                        style={{
                            height: '5px',
                            width: '1.1rem',
                            backgroundColor: styles.color,
                            border: '0.5px solid black'
                        }}
                    ></span>
                    <input
                        type="color"
                        id="color"
                        style={{ visibility: 'hidden', width: '0px' }}
                        onChange={(e) => handleChange(e, 'color')}
                    />
                </label>
                <label htmlFor="bgColor" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '1.8rem' }}>
                    <BrushBig size="20" color={iconColor} />
                    <span
                        style={{
                            height: '5px',
                            width: '1.1rem',
                            backgroundColor: styles?.backgroundColor,
                            border: '0.5px solid black'
                        }}
                    ></span>
                    <input
                        type="color"
                        id="bgColor"
                        style={{ visibility: 'hidden', width: '0px' }}
                        onChange={(e) => handleChange(e, 'bgColor')}
                    />
                </label>
                <FormatShapesIcon className={classes.icons} sx={{ color: iconColor }} />
                {/* <Edit2 size="20" color="#555555" /> */}
                <label htmlFor="border" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '1.8rem' }}>
                    <BorderOuterIcon className={classes.icons} sx={{ color: iconColor }} />
                    <span
                        style={{
                            height: '5px',
                            width: '1.1rem',
                            backgroundColor: styles?.borderColor,
                            border: '0.5px solid black'
                        }}
                    ></span>
                    <input
                        type="color"
                        id="border"
                        style={{ visibility: 'hidden', width: '0px' }}
                        onChange={(e) => handleChange(e, 'border')}
                    />
                </label>

                <Tooltip title="Clear">
                    <Typography sx={{ color: iconColor, alignSelf:'end' }} onClick={handleClear}>
                        < ClearIcon/>
                    </Typography>
                </Tooltip>

                <Tooltip title="Save">
                    <Typography sx={{ color: iconColor ,alignSelf:'end' }} onClick={handleSave}>
                    <SaveIcon />
                    </Typography>
                </Tooltip>

                <Tooltip title="Vertical Align">
                    <Typography sx={{ color: iconColor, alignSelf:'end' }} onClick={vertical}>
                        <VerticalAlignCenterIcon />
                    </Typography>
                </Tooltip>

                <Tooltip title="Horizontal Align">
                    <Typography sx={{ color: iconColor, alignSelf:'end' }} onClick={horizontal}>
                        <VerticalAlignCenterIcon sx={{ rotate: '90deg' }} />
                    </Typography>
                </Tooltip>
                <Tooltip title="Download">
                    <Typography sx={{ color: iconColor, alignSelf:'end' }} onClick={download}>
                       <GetAppIcon/>
                    </Typography>
                </Tooltip>
            </Box>
        </>
    );
}
