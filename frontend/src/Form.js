import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import styles from './Form.module.css';

const Form = ({login, signup}) => {
    const { register, handleSubmit, watch, errors, reset } = useForm({
        defaultValues: {
            email: "Email",
            password: "Password"
        }
    });

    // will watch specified inputs and return their values
    // const watchAllFields = watch();
    // console.log(watchAllFields)

    const onSubmit = async data => {
        // console.log(data);
        // returns an object with email and password as keys and the values entered into the inputs as values

        // need to add logic to either signup or login..
        await login(data.email, data.password);
        reset();
    }

    return (
        <div className={styles['form-wrapper']}>
            <h1 className={styles['form-heading']}>
                {login ? 'Sign in' : 'Create account'}
            </h1>
            {login ? (
                <h2 className={styles['form-heading']}>
                    Don't have an account? <Link to="/sign_up">Create one</Link> here.
                </h2>
            ) : (
                <h2 className={styles['form-heading']}>
                    Already have an account? <Link to="/sign_in">Sign in</Link> instead.
                </h2>
            )}
            {/* handleSubmit will validate your inputs before invoking onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the register function, must have a name as a key for registration */}
                {/* default value for an input is the initial value when a component is frist rendered */}
                {/* difference between that and value is that value indicates the input from the user */}
                {/* required is a boolean which if true indicates the input must have a value before the form can be submitted */}
                <div className={styles['form-group']}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        ref={register(
                            {
                                required: true,
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Email does not match format"
                                },
                            })}
                    />
                    {errors?.email && <span role="alert" className={styles['notification-message']}>{errors.email.message}</span>}
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        aria-invalid={errors.password ? "true" : "false"}
                        ref={register(
                            {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: "Minimum password length is 5"
                                }
                            })}
                    />
                    {errors?.password && <span role="alert" className={styles['notification-message']}>{errors.password.message}</span>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;