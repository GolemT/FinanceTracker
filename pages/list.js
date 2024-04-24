import Layout from '../components/Layout';
import React, {useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from '../styles/main.module.css'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { checkAuth } from '../app/checkAuth';
 
const Home = ({ user }) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([]);

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

  const fetchData = async () => {
    const loadedData = await window.electron.loadData();
    const dataArray = Object.entries(loadedData).map(([id, item]) => ({
      id: id, // Use the key as the id
      name: item.name,
      date: item.date,
      tags: item.tags.join(", "), // Assuming tags is an array, join them for display
      amount: item.amount
  }));
    setData(dataArray);
  };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'date', headerName: 'Date', flex: 1 },
      { field: 'tags', headerName: 'Tags', flex: 2 },
      { 
        field: 'amount',
        headerName: 'Amount',
        width: 150,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => {
          return (
            <span style={{ 
              color: params.value >=0 ? '#20BF55' : '#DB3A34',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>{`${params.value} €`}</span>
          )
        }
      }
    ];

    const add = () => {
      router.push('/add')
  }

  const animationClass = selectedRows.length > 0 ? styles.animateButtons : styles.none;

  const handleDeleteConfirm = async () => {
      const idsToDelete = selectedRows;
      const success = await window.electron.deleteData(idsToDelete)
      if(success) {
        fetchData();
        setSnackbarMessage('Data was deleted successfully.');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('Fehler beim Löschen der Daten.');
        setSnackbarSeverity('error');
      }
      setDialogOpen(false);
      setSnackbarOpen(true);
      }

    const handleDelete = () => {
      setDialogOpen(true);
    }
  
  return (
    <Layout>
        <content className={styles.content}>
          <div style={{ height: '100%', width: '100%', backgroundcolor: '#FAFAFA' }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              checkboxSelection
              sortModel={[
                {
                  field: 'date',
                  sort: 'desc',
                },
              ]}
              onRowSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection)
              }}
            />
          </div>
          <div className={styles.buttons}>
          <div className={animationClass}>
            {selectedRows.length > 0 && (
              <>
                <IconButton aria-label="delete" size="medium" color="secondary" onClick={handleDelete}>
                  <img src="/delete.svg"/>
                </IconButton>
              </>
            )}
          </div>
            <IconButton aria-label="add" size="medium" color="primary" onClick={add} className={styles.icon}>
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
  );
}

export const getServerSideProps = checkAuth();

export default list;
