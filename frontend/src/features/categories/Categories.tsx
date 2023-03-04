import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchCategories, selectCategories, selectCategoriesFetching} from "./categoriesSlice";
import {Box, CircularProgress, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <Box style={{backgroundColor: '#f5f5f5', padding: '1rem' }}>
        {loading ? <CircularProgress/> : <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/">
              <ListItemText primary="All items" />
            </ListItemButton>
          </ListItem>
          {categories.map(category => (
            <ListItem disablePadding key={category._id}>
              <ListItemButton component={NavLink} to={'/items-by-category/' + category._id}>
                <ListItemText primary={category.title}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>}
      </Box>
    </>
  );
};

export default Categories;