import Layout from '../../components/Layout';
import React, {useEffect, useState} from 'react'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import styles from '../../styles/main.module.css'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton';
import { AlertColor, CircularProgress } from '@mui/material';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { checkAuth } from '../../app/checkAuth';
import Transaction from 'components/interfaces/transactions';
import { ObjectId } from 'mongodb';

 
const list = ({ user }) => {
  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success'); // Kann 'success', 'error', 'warning', 'info' sein
  const [dialogOpen, setDialogOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState(styles.animateButtons)

  const handleSnackbarClose = (
    event: Event | React.SyntheticEvent<any, Event>, 
    reason: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/transactions/${user.nickname}`);
      if (response.ok) {
        const loadedData = await response.json();
        const dataArray = loadedData.map(item => ({
          id: item._id, // MongoDB IDs are stored under _id
          name: item.name,
          date: item.date,
          tags: item.tags.join(", "), // Assuming tags is an array
          amount: item.amount
        }));
        setData(dataArray);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setSnackbarMessage('Error fetching data.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false)
    }
  };

    useEffect(() => {
        fetchData();
    }, []);

    const columns: GridColDef[] = [
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
      router.push('/access/add')
  }

  const handleDeleteConfirm = async () => {
  if (selectedRows.length === 0) {
      console.error("No transactions selected for deletion");
      setSnackbarMessage('No valid transactions selected for deletion.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
  }
      
      try {
        const response = await fetch('/api/v1/transactions/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ids: selectedRows,
            user: user.nickname
          })
        });

        const result = await response.json();
        if(response.ok) {
          fetchData()
          setSnackbarMessage('Data was deleted successfully.');
          setSnackbarSeverity('success');
        } else {
          throw new Error(result.message || 'Failed to delete transactions');
        }
      } catch (error) {
        setSnackbarMessage(error.message  || 'Failed to delete transactions');
        setSnackbarSeverity('error');
      } finally {
        setDialogOpen(false);
        setSnackbarOpen(true);
      }
      }

    const handleDelete = () => {
      setDialogOpen(true);
    }

    const handleRowSelectionChange = (newSelectionModel: GridRowId[]) => {

      setSelectedRows(newSelectionModel as string[]);
  
      newSelectionModel.length > 0 ? setAnimationClass(styles.animateButtons) : setAnimationClass(styles.none);
  };
  
  return (
    <Layout>
        <div id="content" className={styles.content}>
          { isLoading ? (
            <CircularProgress />
          ): (
          <div style={{ height: '100%', width: '100%', backgroundColor: '#FAFAFA' }}>
            <DataGrid
              rows={data}
              columns={columns}
              checkboxSelection
              sortModel={[
                {
                  field: 'date',
                  sort: 'desc',
                },
              ]}
              onRowSelectionModelChange={handleRowSelectionChange}
            />
          </div>
          )}
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
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose} // using corrected function here
            >
            <Alert
                severity={snackbarSeverity}
                sx={{ width: '100%' }}
            >
    {snackbarMessage}
  </Alert>
</Snackbar>
        </div>
    </Layout>
  );
}

export const getServerSideProps = checkAuth();

export default list;
