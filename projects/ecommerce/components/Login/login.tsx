import { IloginUser } from "@/types/user";
import React, { FC, FormEvent, useState } from "react";
import { validateEmail, validatePassword } from "@/validations/auth";
import Link from "next/link";
import ErrorMessage from "../ErrorMessage/errorMessage";
import { signinAPI } from "@/APIs/auth";
import { useMutation } from "@tanstack/react-query";
import { createFormData } from "@/utils/utils";

interface props {
    closeModal?: () => void
}

const Login: FC<props> = ({ closeModal }) => {

    const initialState = {
        email: '',
        password: ''
    }
    const initialErrors = {
        email: '',
        password: ''
    };

    const [loginForm, setLoginForm] = useState<IloginUser>(initialState)
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [apiError, setApiError] = useState<string>('');

    const mutation = useMutation({
        mutationFn: signinAPI,
        onError: (error: Error) => {
            console.error('Error submitting data:', error);
            setApiError('Error de API: ' + error.message);
        },
        onSuccess: (data) => {
            console.log('Data submitted successfully:', data);
            localStorage.setItem('logged','true');
            if (closeModal) closeModal();
            window.location.reload()
        },
    });

    const onSubmitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = createFormData(loginForm);
        mutation.mutate(formData);
    };


    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }
    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error: string | undefined;
        setApiError('')

        if (name === 'email') {
            error = validateEmail(value);
        } else if (name === 'password') {
            error = validatePassword(value);
        }

        setFormErrors({ ...formErrors, [name]: error || '' });
    }

    const hasErrors = (): boolean => {
        return Object.values(formErrors).some(value => value !== '') || Object.values(loginForm).some(value => value === '');
    };

    return (
        <>
            <h1 className="text-xl text-center mb-3">Iniciar Sesión</h1>
            <form role="form" onSubmit={onSubmitFormHandler}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="email">Email</label>
                    <input name="email" id="email" type="text" className="input" onBlur={handleBlur} value={loginForm.email} onChange={onChangeHandler}></input>
                    {formErrors.email && <ErrorMessage error={formErrors.email} />}
                    
                </div>
                <div className="flex flex-col gap-2 mt-3">
                    <label className="text-sm" htmlFor="password">Contraseña</label>
                    <input name="password" id="password" type="password" className="input" onBlur={handleBlur} value={loginForm.password} onChange={onChangeHandler}></input>
                    {formErrors.password && <ErrorMessage error={formErrors.password} />}
                </div>
                <div className="flex flex-row gap-1 m-2">
                    <button type="submit" className="buttonPrimary disabled:bg-bgDisabled hover:cursor-pointer" style={{marginBottom:0}} disabled={hasErrors()}>{mutation.status === 'pending' ? 'Cargando...' : 'Iniciar Sesión'}</button>
                </div>
                {apiError && <ErrorMessage error={apiError} />}
            </form>
            <Link href="/forgotpassword" className="text-sm text-center block">¿Olvidaste tu contraseña?</Link>
            <span className="text-center block text-sm">¿No tienes cuenta? <Link href="/signup" className="underline">Registrate acá</Link></span>
        </>
    )
}
export default Login;