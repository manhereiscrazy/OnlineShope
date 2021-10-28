import React, { useState } from 'react'
import axios from 'axios';
import URIs from '../Sources';

import { CardContent, CardActions, Card, TextField, Button, ButtonGroup, Grid, CardMedia, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';



export default function Product({ product, update, setUpdate, setBusy, getCookie }) {
    const [drawer, setDrawer] = useState(false)

    async function handleProductEdit(instance) {
        // console.log(drawer)
        await axios.put(`${URIs().ProductEditURI}${instance.id}`, drawer,
            {
                headers: {
                    'Content-type': 'application/json',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            }).then((response) => {
                // console.log(response.data)
                setUpdate(!update)
                setDrawer(false)
            }).catch((error) => {
                console.log("###error", error, error?.response?.data)
            })
    }

    async function handleProductDelete(instance) {
        await axios.post(`${URIs().ProductEditURI}${instance.id}`,
            {
                headers: {
                    'Content-type': 'application/json',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            }).then((response) => {
                // console.log(response.data)
                setUpdate(!update)
            }).catch((error) => {
                console.log("###error", error, error?.response?.data)
            })
    }


    return (
        <>
            <Card raised>
                <CardMedia
                    component="img"
                    height="230"
                    image={product.image_uri}
                    alt={product.name}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {product.name}
                        <span style={{ float: "right" }} variant="h5" component="div">
                            ${product.price}/-
                        </span>
                    </Typography>
                    <Typography variant="body2" color="inherit">
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions className="cardActionBtns" style={{float:"right"}}>
                    <ButtonGroup>
                        <Button onClick={() => setDrawer(product)} variant="contained" color="primary" size="small">Edit</Button>
                        <Button onClick={() => setBusy({ title: "Warning", text: "Are you sure want to delete the item?", action: () => handleProductDelete(product), actionText: "Yes" })} variant="contained" color="secondary" size="small">Delete</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>

            {drawer && <Dialog
                    open={Boolean(drawer)}
                    onClose={() => setDrawer(false)}
                    maxWidth="sm"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Add Product
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} style={{ padding: "10px" }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="productName"
                                    color="primary"
                                    label="Name"
                                    required
                                    defaultValue={drawer.name}
                                    placeholder="Enter product Name"
                                    name="productName"
                                    type="text"
                                    onChange={(e) => setDrawer({ ...product, name: e.target.value })}
                                    autoComplete="productName"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter product Description"
                                    id="productDescription"
                                    color="primary"
                                    label="Description"
                                    name="productDescription"
                                    defaultValue={drawer?.description}
                                    type="text"
                                    onChange={(e) => setDrawer({ ...product, description: e.target.value })}
                                    autoComplete="productName"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="productPrice"
                                    color="primary"
                                    label="Price"
                                    required
                                    defaultValue={drawer?.price}
                                    placeholder="Enter product Price"
                                    name="productPrice"
                                    type="number"
                                    onChange={(e) => setDrawer({ ...product, price: e.target.value })}
                                    autoComplete="productPrice"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="productImageUrl"
                                    color="primary"
                                    label="Image URL"
                                    required
                                    defaultValue={drawer?.image_uri}
                                    placeholder="Enter product image url"
                                    name="productPrice"
                                    type="text"
                                    onChange={(e) => setDrawer({ ...product, image_uri: e.target.value })}
                                    autoComplete="url"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <ButtonGroup>
                            <Button color="primary" variant="contained" size="small" onClick={() => setDrawer(false)}>
                                Close
                            </Button>
                            <Button variant="contained" size="small" fullWidth color="secondary" onClick={()=>handleProductEdit(drawer)}>
                                Save
                            </Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}