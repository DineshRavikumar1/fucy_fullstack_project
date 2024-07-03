import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    InputLabel,
    Box,
    TextField,
    Slide
} from '@mui/material';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import AlertMessage from '../Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const selector = (state) => ({
    update: state.updateModal,
    getModalById: state.getModalById,
    getModals: state.getModals
});

export default function AddDamageScenarios({ open, handleClose, modal, id, rows }) {
    console.log('rows', rows);
    const { update, getModalById, getModals } = useStore(selector, shallow);
    const [templateDetails, setTemplateDetails] = React.useState({
        id: '',
        name: '',
        Description: '',
        cyberLosses: []
    });
    const [openMsg, setOpenMsg] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleCreate = () => {
        const mod = { ...modal };
        const temp = { ...templateDetails };
        const len = rows.length;
        temp.id = `DS00${len + 1}`;
        mod.scenarios[1].subs[1].scenes.push(temp);
        update(mod)
            .then((res) => {
                if (res) {
                    setTimeout(() => {
                        // window.location.reload();
                        handleClose();
                        getModalById(id);
                        getModals();
                        setOpenMsg(true);
                        setMessage('Damage scene created Successfully');
                        setSuccess(true);
                        setTemplateDetails({
                            id: '',
                            name: '',
                            Description: '',
                            losses: []
                        });
                    }, 500);
                }
            })
            .catch((err) => {
                console.log('err', err);
                setOpenMsg(true);
                setSuccess(false);
                setMessage('Something went wrong');
            });
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    '& .MuiPaper-root': {
                        // background:'#999999',
                        width: '-webkit-fill-available'
                    }
                }}
            >
                <DialogTitle>{'Add Damage Scenario'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 1 }}>
                            <InputLabel>Name :</InputLabel>
                            <TextField
                                id="outlined-basic"
                                // label="Name"
                                value={templateDetails?.name}
                                variant="outlined"
                                placeholder="Name"
                                onChange={(e) => setTemplateDetails({ ...templateDetails, name: e.target.value })}
                            />
                            <InputLabel>Description :</InputLabel>
                            <TextField
                                id="outlined-multiline-static"
                                // label="Multiline"
                                value={templateDetails?.Description}
                                multiline
                                rows={4}
                                placeholder="Description"
                                onChange={(e) => setTemplateDetails({ ...templateDetails, Description: e.target.value })}
                            />
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="warning" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            <AlertMessage open={openMsg} message={message} setOpen={setOpenMsg} success={success}/>
        </React.Fragment>
    );
}
