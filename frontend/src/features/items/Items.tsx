import React, {useEffect} from 'react';
import {CircularProgress, Grid, Typography} from "@mui/material";
import Categories from "../categories/Categories";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectItems, selectItemsFetching} from "./itemsSlice";
import {fetchItems} from "./itemsThunks";
import OneItem from "./components/OneItem";

const Items = () => {
  const {category} = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectItemsFetching);

  useEffect(() => {
    dispatch(fetchItems(category));
  },[dispatch, category]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={2}>
        <Categories/>
      </Grid>
      {loading ? <CircularProgress/> : items && <Grid item xs={10} container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">{items.categoryName}</Typography>
        </Grid>
        <Grid item container spacing={2}>
          {items.items.map(item => (
            <OneItem key={item._id} _id={item._id} title={item.title} price={item.price} image={item.image}/>
          ))}
        </Grid>
      </Grid>}
    </Grid>
  );
};

export default Items;