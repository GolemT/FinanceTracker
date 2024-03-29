import Layout from "../components/Layout";
import React, {useState, useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/main.module.css';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export default function tags () {
    const [tags, setTags] = useState({});
    const router = useRouter();
    const [selectedTagKeys, setSelectedTagKeys] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Kann 'success', 'error', 'warning', 'info' sein
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

    const fetchTags = async () => {
        const loadedTags = await window.electron.loadTags(); // Fetches tags
        // Convert the tags object into an array structure suitable for DataGrid
        const tagsArray = Object.entries(loadedTags).map(([key, description], index) => ({
            id: index, // DataGrid requires a unique 'id' field
            tag: key,
            description: description,
        }));
        setTags(tagsArray);
    };

    useEffect(() => {
      fetchTags();
  }, []);

  const columns = [
    { field: 'tag', headerName: 'Tag', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 3 },
  ];

  const animationClass = selectedTagKeys.length > 0 ? styles.animateButtons : styles.none;

  const handleDeleteConfirm = async () => {
      const tagsToDelete = selectedTagKeys;
      const success = await window.electron.deleteTag(tagsToDelete)
      if(success) {
        fetchTags();
        setSnackbarMessage('Tag was deleted successfully.');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('Fehler beim Löschen der Daten.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
      setDialogOpen(false);
      }
  

    const addTag = () => {
        router.push('/addTags')
    }

    const handleDelete = () => {
      setDialogOpen(true);
    }

    return (
        <Layout>
            <content className={styles.content}>
                <div style={{ height: '100%', width: '100%', backgroundcolor: '#FAFAFA' }}>
                    <DataGrid
                        rows={tags}
                        columns={columns}
                        pageSize={1}
                        checkboxSelection
                        onRowSelectionModelChange={(newSelectionModel) => {
                            const newSelectedTagKeys = newSelectionModel.map(
                              (id) => tags.find((tag) => tag.id === id)?.tag
                            );
                            setSelectedTagKeys(newSelectedTagKeys);
                          }}
                    />
                </div>
                <div className={styles.buttons}>
                    <div className={animationClass}>
                        {selectedTagKeys.length > 0 && (
                        <>
                            <IconButton aria-label="delete" size="medium" color="secondary" onClick={handleDelete}>
                            <img src="/delete.svg"/>
                            </IconButton>
                        </>
                        )}
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
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
                </Snackbar>
            </content>
    </Layout>
    )
}