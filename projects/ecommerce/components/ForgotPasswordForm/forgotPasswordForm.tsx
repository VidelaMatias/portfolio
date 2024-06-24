'use client'
import { validateEmail } from "@/validations/auth";
import { FormEvent, useState } from "react";
import { recoverPasswordAPI } from "@/APIs/auth";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage/errorMessage";


/** Component for complete with email and send an email to recover password***/
const ForgotPasswordForm = () =>{

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string | undefined>('');
    const [apiError, setApiError] = useState<string>('');

    const mutation = useMutation({
        mutationFn: recoverPasswordAPI,
        onError: (error: Error) => {
            console.error('Error submitting data:', error);
            setApiError('Error de API: ' + error.message);
        },
        onSuccess: (data) => {
            console.log('Data submitted successfully:', data);
            setApiError('');
            setEmailError('')
        },
    });

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate(email);
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value)
    }
    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setApiError('')
        setEmailError(validateEmail(value));
    }

        return (
            <form onSubmit={onSubmitHandler} className="w-64 m-auto">
                 <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="email">Email</label>
                    <input name="email" id="email" type="text" className="input" onBlur={handleBlur} value={email} onChange={onChangeHandler}></input>
                    {emailError && <ErrorMessage error={emailError} />}
                </div>
                <div className="flex flex-row gap-1 m-2">
                    <button type="submit" className="buttonPrimary disabled:bg-buttonDisabled disabled:cursor-default " style={{marginBottom:0}} disabled={!email}>{mutation.status === 'pending' ? 'Cargando...' : 'Enviar'}</button>
                </div>
                {apiError && <ErrorMessage error={apiError} />}
                
            </form>
        )
}
export default ForgotPasswordForm;