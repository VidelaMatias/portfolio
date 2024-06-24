import { validatePassword } from "@/validations/auth";
import { FormEvent, useState } from "react";
import ErrorMessage from "../ErrorMessage/errorMessage";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "@/APIs/auth";

const RecoverPasswordForm = () => {

    const initialState = {
        password: '',
        confirmPassword: ''
    }
    const initialErrors = {
        password: '',
        confirmPassword: ''
    }

    const [form, setForm] = useState(initialState)
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>(initialErrors);
    const [apiError, setApiError] = useState<string>('');

    const mutation = useMutation({
        mutationFn: changePasswordAPI,
        onError: (error: Error) => {
            console.error('Error submitting data:', error);
            setApiError('Error de API: ' + error.message);
        },
        onSuccess: (data) => {
            console.log('Data submitted successfully:', data);
            setApiError('');
            setFormErrors(initialErrors)
        },
    });

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (form.password !== form.confirmPassword) {
            setFormErrors({
                ...initialErrors, 
                ['confirmPassword']: 'Las contraseñas no coinciden' 
            })
            return;
        }
        mutation.mutate(form.password);
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error: string | undefined;
        error = validatePassword(value);
        setFormErrors({ ...formErrors, [name]: error || '' });
    }

    return (
        <form onSubmit={onSubmitHandler} className="w-64 m-auto md:m-0" >
            <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="password">Contraseña</label>
                <input name="password" id="password" type="password" className="input" onBlur={handleBlur} value={form.password} onChange={onChangeHandler}></input>
                {formErrors.password && <ErrorMessage error={formErrors.password} />}
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm" htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input name="confirmPassword" id="confirmPassword" type="password" className="input" onBlur={handleBlur} value={form.confirmPassword} onChange={onChangeHandler}></input>
                {formErrors.confirmPassword && <ErrorMessage error={formErrors.confirmPassword} />}
            </div>

            <div className="flex flex-row gap-1 m-2">
                <button type="submit" className="buttonPrimary disabled:bg-buttonDisabled disabled:cursor-default" style={{ marginBottom: 0 }} disabled={!form.confirmPassword || !form.password}>{mutation.status === 'pending' ? 'Cargando...' : 'Enviar'}</button>
            </div>
            {apiError && <ErrorMessage error={apiError} />}
        </form>
    )
}

export default RecoverPasswordForm;