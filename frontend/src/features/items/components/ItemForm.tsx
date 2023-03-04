import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchCategories, selectCategories, selectCategoriesFetching} from "../../categories/categoriesSlice";
import {ItemMutation} from "../../../types";
import {createItem} from "../itemsThunks";
import {Navigate, useNavigate} from "react-router-dom";
import {Alert, CircularProgress, Grid, MenuItem, TextField, Typography} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import {selectCreateItemError, selectItemCreating} from "../itemsSlice";
import {selectUser} from "../../users/usersSlice";

const ItemForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateItemError);
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const creating = useAppSelector(selectItemCreating);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);
  const [state, setState] = useState<ItemMutation>({
    category: '',
    title: '',
    price: '',
    description: '',
    image: null
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login"/>
  }

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createItem(state)).unwrap();
      navigate('/');
    } catch (e) {

    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">New item</Typography>
        </Grid>
        <Grid item xs>
          <TextField
            label="Category"
            select name="category" value={state.category}
            onChange={inputChangeHandler} required
            error={Boolean(getFieldError('category'))}
            helperText={getFieldError('category')}
          >
            <MenuItem value="" disabled>Please select a category {categoriesLoading && <CircularProgress size={20} sx={{ml: 1}}/>}</MenuItem>
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title" required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="price" label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price" required
            type="number" InputProps={{inputProps: {min: 0.01, step: 0.01}}}
            error={Boolean(getFieldError('price'))}
            helperText={getFieldError('price')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description" required
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image" onChange={fileInputChangeHandler}
            name="image" required
          />
        </Grid>

        {getFieldError('image') && <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {getFieldError('image')}
        </Alert>}

        <Grid item xs>
          <LoadingButton loadingIndicator="Loading…" loading={creating} type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;