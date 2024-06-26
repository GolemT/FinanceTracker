import Layout from "../../components/Layout";
import React, {useState, useContext} from "react";
import { DataGrid, GridRowId } from '@mui/x-data-grid';
import styles from '../../styles/main.module.css';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import { AlertColor } from '@mui/material';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { checkAuth } from "../../app/checkAuth";
import {fetchDataAndUpdateContext, useDataContext} from "../../app/getContext";
import { useTheme } from "../../app/ThemeContext";

const tags = ({ user }) => {
    const {themeMode} = useTheme();
    const {setTransactions, tags, setTags } = useDataContext();
    const router = useRouter();
    const [selectedTagKeys, setSelectedTagKeys] = useState<string[]>([]);
    const [animationClass, setAnimationClass] = useState(styles.none);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success'); // Kann 'success', 'error', 'warning', 'info' sein
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleSnackbarClose = (
        event: Event | React.SyntheticEvent<any, Event>, 
        reason: string
      ) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

  const columns = [
    { field: 'name', headerName: 'Tag', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 3 },
  ];

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch('/api/v1/tags/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedTagKeys, user: user.nickname })
      });
      if (response.ok) {
          setSnackbarMessage('Tags successfully deleted');
          setSnackbarSeverity('success');
          fetchDataAndUpdateContext(user, setTransactions, setTags); // Re-fetch tags to update the list
      } else {
          throw new Error('Failed to delete tags');
      }
  } catch (error) {
      console.error('Error deleting tags:', error);
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
  } finally {
      setDialogOpen(false);
      setSnackbarOpen(true);
  }
};
  
const handleRowSelectionChange = (newSelectionModel: GridRowId[]) => {
  const newSelectedTagKeys = newSelectionModel.map(id => String(id));

  setSelectedTagKeys(newSelectedTagKeys);

  // Toggle the visibility of delete button based on selection.
  newSelectedTagKeys.length > 0 ? setAnimationClass(styles.animateButtons) : setAnimationClass(styles.none);
};

  

    const addTag = () => {
        router.push('/access/addTags')
    }

    const handleDelete = () => {
      setDialogOpen(true);
    }

    return (
        <Layout>
            <div id="content" className={styles.content} style={{ background: themeMode.body, color: themeMode.text}}>
                <div style={{ height: '100%', width: '100%', backgroundColor: themeMode.background}}>
                    <DataGrid
                        rows={tags}
                        style={{color: themeMode.text, backgroundColor: themeMode.background, border: 'none'}}
                        columns={columns}
                        checkboxSelection
                        onRowSelectionModelChange={handleRowSelectionChange}
                        getRowId={(row:any) => row._id}
                        sx={{
                          '& .MuiCheckbox-root': {
                            color: themeMode.text, // Passt die Farbe der Checkboxen an
                          },
                          '& .MuiCheckbox-colorPrimary.Mui-checked': {
                            color: themeMode.blue, // Passt die Farbe der Checkboxen an, wenn sie ausgewählt sind
                          }
                        }}
                    />

                </div>
                <div className={styles.buttons}>
                    <div className={animationClass}>
                        <>
                            <IconButton aria-label="delete" size="medium" color="secondary" onClick={handleDelete}>
                            <img src="/delete.svg"/>
                            </IconButton>
                        </>
                    </div>
                    <IconButton aria-label="add" size="medium" color="primary" onClick={addTag} className={styles.icon}>
                    <img src="/Add_button.svg"/>
                    </IconButton>
                </div>
                <Dialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete the selected entries?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>No</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
                </Snackbar>
            </div>
    </Layout>
    )
}

export const getServerSideProps = checkAuth();

export default tags;