import React, { useEffect, useState } from 'react'

import Product from './Product';
import URIs from '../Sources';
import AppDrawer from '../AppBar';
import axios from 'axios';
import jQuery from 'jquery';

import { makeStyles } from '@material-ui/core/styles';

import { Button, ButtonGroup, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';



const useStyles = makeStyles({
    items: {
        padding: "10px"
    }
});


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }



export default function Products() {
    const [busy, setBusy] = useState(true)
    const classes = useStyles();
    const [Products, SetProducts] = useState()
    const [update, setUpdate] = useState(true)

    useEffect(() => {
        setBusy({ text: <span style={{ fontSize: "1.7rem" }}>Please wait...</span> })
        return axios.get(`${URIs().ProductsURI}`, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
            // console.log(response.data)
            SetProducts(response.data)
            setBusy(false)
        }).catch((error) => {
            setBusy(false)
            console.log("###error", error, error?.response?.data)
        })
    }, [update])

    return (
        <>
            <AppDrawer update={update} setUpdate={setUpdate} setBusy={setBusy}  getCookie={getCookie}/>
            <div className="mainCtx">
                <Grid container>
                    {Products?.map((product, index) =>
                        <Grid className={classes.items} style={{ minHeight: "300px !important" }} item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Product update={update} setUpdate={setUpdate} product={product} setBusy={setBusy} getCookie={getCookie}/>
                        </Grid>
                    )}
                </Grid>
            </div>
            {busy && <Dialog
                open={Boolean(busy)}
                onClose={() => setBusy(false)}
                maxWidth="sm"
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {busy?.title}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" color="inherit">
                        {busy?.text}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button color="primary" variant="contained" size="small" onClick={() => setBusy(false)}>
                            {busy?.reactionText ? busy?.reactionText : "Close"}
                        </Button>
                        {busy?.actionText && <Button onClick={() => { setBusy(false); busy?.action() }} variant="contained" size="small" fullWidth color="secondary">
                            {busy?.actionText ? busy?.actionText : "Continue"}
                        </Button>}
                    </ButtonGroup>
                </DialogActions>
            </Dialog>}
        </>
    )
}
