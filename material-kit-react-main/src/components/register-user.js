import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from '../actions/users-action';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

export const RegisterNewUser = () => {
    // CommonJS
    const Swal = require('sweetalert2')
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = (e) => {
        const user = {
            email: email,
            password: password,
        };
        if (true) {
            dispatch(RegisterUser(user));
            Router.push('/login')
        }
    };

    return (
        <>
            <div>
                <TextField
                    // error={}
                    fullWidth
                    // helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="email"
                    value={email}
                    variant="outlined"
                />
                <TextField
                    // error={Boolean(formik.touched.password && formik.errors.password)}
                    fullWidth
                    // helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    // onBlur={formik.handleBlur}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    value={password}
                    variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                    <Button
                        color="primary"
                        // disabled={formik.isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={handleRegister}
                    >
                        Sign Up Now
                    </Button>
                </Box>
            </div>
        </>
    );
};
