import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {selectFullItem, selectFullItemFetching, selectItemDeleting} from "../itemsSlice";
import {deleteItem, fetchOneItem} from "../itemsThunks";
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {apiURL} from "../../../constants";
import {selectUser} from "../../users/usersSlice";
import {LoadingButton} from "@mui/lab";


const FullItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = (useParams()).id as string;
  const item = useAppSelector(selectFullItem);
  const fetchLoading = useAppSelector(selectFullItemFetching);
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectItemDeleting);

  useEffect(() => {
    dispatch(fetchOneItem(id));
  }, [dispatch, id]);

  const onDelete = async () => {
    try {
      await dispatch(deleteItem(id)).unwrap();
    } catch (e) {

    }
    navigate('/');
  }

  return (
    <>
      <Container maxWidth="md">
        {fetchLoading ? <CircularProgress/> : item && <Grid container spacing={2}>
          <Grid item xs={6}>
            {item.image && <img src={apiURL + '/' + item.image} alt={item.title} style={{width: '100%', maxWidth: '400px'}}/>}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="h6">Category: <strong>{item.category.title}</strong></Typography>
            <Typography variant="h6">Description: <strong>{item.description}</strong></Typography>
            <Typography variant="h6">Price: <strong>{item.price} USD</strong></Typography>
            <Typography variant="h6" sx={{mt: 2}}>Seller's data:</Typography>
            <Typography variant="h6">Name: <strong>{item.user.displayName}</strong></Typography>
            <Typography variant="h6">Phone: <strong>{item.user.phoneNumber}</strong></Typography>
            {(user?._id === item?.user._id) && <LoadingButton loadingIndicator="Loading…" loading={deleteLoading} variant="contained" color="error" sx={{mt: 2}} onClick={onDelete}>Delete item</LoadingButton>}
          </Grid>
        </Grid>}

      </Container>
    </>

  );
};

export default FullItem;