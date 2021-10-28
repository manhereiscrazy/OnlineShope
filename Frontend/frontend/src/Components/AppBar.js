import React, { useState } from 'react'
import axios from 'axios';
import URIs from './Sources';

import { Grid, TextField, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export default function AppDrawer({ update, setUpdate, getCookie }) {
    const [drawer, setDrawer] = useState(false)
    const [errors, setErrors] = useState(false)
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        image_uri: "",
    })



    async function HandleProductAdd(e) {
        e.preventDefault()
        console.log(product)
        if (!product?.name) {
            setErrors({ ...errors, name: "Enter a product name" })
            return
        }
        if (!product?.price) {
            setErrors({ ...errors, price: "Enter a price of the product" })
            return
        }
        if (!product?.image_uri) {
            setErrors({ ...errors, image_uri: "Please give a product image url" })
            return
        }
        await axios.post(`${URIs().ProductsURI}`, product,
            {
                headers: {
                    'Content-type': 'application/json',
                    "X-CSRFToken": getCookie('csrftoken')
                }
            }).then((response) => {
                setDrawer(false)
                setUpdate(!update)
                console.log(response.data)
            }).catch((error) => {
                console.log("###error", error, error?.response?.data)
                if (error?.response?.data?.name) setErrors({ ...errors, name: error?.response?.data?.name[0] })
            })
        console.log(e)
    }

    return (
        <>
            <div className="appbarcontainer">
                <div className="appbarLogo">Shope</div>
                <div className="appbaractions">
                    <ul>
                        <li className="appbarnav">
                            <a href="/" >Home</a>
                        </li>
                        <li className="appbarnav">
                            <a href="/" >About</a>
                        </li>
                        <li className="appbarnav">
                            <a onClick={() => setDrawer(true)} >Add Product</a>
                        </li>
                    </ul>
                </div>
            </div>
            {drawer && <Dialog
                open={drawer}
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
                                error={Boolean(errors?.name)}
                                required
                                helperText={errors?.name ? errors?.name : false}
                                placeholder="Enter product Name"
                                name="productName"
                                type="text"
                                onChange={(e) => { setProduct({ ...product, name: e.target.value }); setErrors(false) }}
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
                                type="text"
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
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
                                placeholder="Enter product Price"
                                error={Boolean(errors?.price)}
                                helperText={errors?.price && errors?.price}
                                name="productPrice"
                                type="number"
                                onChange={(e) => { setProduct({ ...product, price: e.target.value }); setErrors(false) }}
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
                                error={Boolean(errors?.image_uri)}
                                helperText={errors?.image_uri && errors?.image_uri}
                                placeholder="Enter product image url"
                                name="productPrice"
                                type="text"
                                onChange={(e) => { setProduct({ ...product, image_uri: e.target.value }); setErrors(false) }}
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
                        <Button disabled={Boolean(errors)} variant="contained" size="small" fullWidth color="secondary" onClick={HandleProductAdd}>
                            Save
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
            }
        </>
    )
}
