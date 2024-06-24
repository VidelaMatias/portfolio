'use client'
import { signupAPI } from "@/APIs/auth";
import { getCountries } from "@/APIs/location";
import { IregisterUser } from "@/types/user";
import { createFormData } from "@/utils/utils";
import { validateRegisterForm } from "@/validations/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/errorMessage";
import Loader from "../Loader/loader";

const RegisterUserForm = () => {

    const initialState = {
        firstname: "",
        lastname: "",
        birthday: "",
        email: "",
        address: "",
        city: "",
        country: "",
        state: "",
        dni: 0,
        phone: '',
        password: '',
        confirmPassword: ''
    }
    const initialErrors = {
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        address: '',
        city: '',
        country: '',
        state: '',
        dni: '',
        phone: '',
        password: '',
        confirmPassword: ''
    };

    const mutation = useMutation({
        mutationFn: signupAPI,
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

    const [registerForm, setForm] = useState<IregisterUser>(initialState)
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>(initialErrors);
    const [apiError, setApiError] = useState<string>('');

    const { data: countries, error, isLoading } = useQuery({ queryKey: ['countries'], queryFn: getCountries });

    if (isLoading) return  <Loader></Loader>;
    if (error) return <div>Error fetching countries: {error.message}</div>;

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const registerFormParam = { ...registerForm, 'dni': Number(registerForm.dni) };
        const formData = createFormData(registerFormParam);
        mutation.mutate(formData);
    };


    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setForm({
            ...registerForm,
            [name]: value
        })
    }

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error: string | undefined;

        error = validateRegisterForm(name, value);
        if (name === 'confirmPassword' && value !== registerForm.password) {
            error = "Las contraseñas no coinciden"
        }
        setFormErrors({ ...formErrors, [name]: error || '' });
    }

    const onSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setForm({
            ...registerForm,
            [name]: value
        })
    }

    const onResetFormHandler = () => {
        setForm(initialState);
        setFormErrors(initialErrors);
        setApiError('');
    }

    const hasErrors = (): boolean => {
        return Object.values(formErrors).some(value => value !== '') || Object.values(registerForm).some(value => value === '');
    };

    return (
        <form role="form" onSubmit={onSubmitHandler} className="max-w-sm m-auto" onReset={onResetFormHandler}>
            <div className="grid gap-2 grid-cols-2 mb-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="firstname">Nombre</label>
                    <input name="firstname" id="firstname" type="text" className="input" onBlur={handleBlur} value={registerForm.firstname} onChange={onChangeHandler}></input>
                    {formErrors.firstname  && <ErrorMessage error={formErrors.firstname} />}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="lastname">Apellido</label>
                    <input name="lastname" id="lastname" type="text" className="input" onBlur={handleBlur} value={registerForm.lastname} onChange={onChangeHandler}></input>
                    {formErrors.lastname  && <ErrorMessage error={formErrors.lastname} />}
                </div>
            </div>

            <div className="grid gap-2 grid-cols-2 mb-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="email">Email</label>
                    <input name="email" id="email" type="text" className="input" onBlur={handleBlur} value={registerForm.email} onChange={onChangeHandler}></input>
                    {formErrors.email  && <ErrorMessage error={formErrors.email} />}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="birthday">Fecha Nacimiento</label>
                    <input name="birthday" id="birthday" type="date" className="input" onBlur={handleBlur} value={registerForm.birthday.toString()} onChange={onChangeHandler}></input>
                    {formErrors.birthday  && <ErrorMessage error={formErrors.birthday} />}
                </div>
            </div>

            <div className="grid gap-2 grid-cols-2 mb-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="dni">DNI</label>
                    <input name="dni" id="dni" type="text" className="input" onBlur={handleBlur} value={registerForm.dni} onChange={onChangeHandler}></input>
                    {formErrors.dni  && <ErrorMessage error={formErrors.dni} />}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="phone">Teléfono</label>
                    <input name="phone" id="phone" type="text" className="input" onBlur={handleBlur} value={registerForm.phone} onChange={onChangeHandler}></input>
                    {formErrors.phone  && <ErrorMessage error={formErrors.phone} />}
                </div>
            </div>

            <div className="grid gap-2 grid-cols-2 mb-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="address">Dirección</label>
                    <input name="address" id="address" type="text" className="input" onBlur={handleBlur} value={registerForm.address} onChange={onChangeHandler}></input>
                    {formErrors.address  && <ErrorMessage error={formErrors.address} />}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="city">Ciudad</label>
                    <input name="city" id="city" type="text" className="input" onBlur={handleBlur} value={registerForm.city} onChange={onChangeHandler}></input>
                    {formErrors.city  && <ErrorMessage error={formErrors.city} />}
                </div>
            </div>

            <div className="grid gap-2 grid-cols-2 mb-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="state">Provincia</label>
                    <input name="state" id="state" type="text" className="input" onBlur={handleBlur} value={registerForm.state} onChange={onChangeHandler}></input>
                    {formErrors.state  && <ErrorMessage error={formErrors.state} />}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="country">País</label>
                    <select name="country" id="country" className="input" value={registerForm.country} onChange={onSelectHandler}>
                        {countries && Object.entries(countries).map(([code, name]) => (
                            <option key={code} value={name} className="text-black">{name}</option>
                        ))}

                    </select>
                    {formErrors.country && <ErrorMessage error={formErrors.country} />}
                </div>
            </div>

            <div className="grid gap-2 grid-cols-2 mb-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="password">Contraseña</label>
                    <input name="password" id="password" type="password" className="input" onBlur={handleBlur} value={registerForm.password} onChange={onChangeHandler}></input>
                    {formErrors.password  && <ErrorMessage error={formErrors.password} />}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input name="confirmPassword" id="confirmPassword" type="password" className="input" onBlur={handleBlur} value={registerForm.confirmPassword} onChange={onChangeHandler}></input>
                    {formErrors.confirmPassword && <ErrorMessage error={formErrors.confirmPassword} />}
                </div> </div>

            <div className="flex flex-row gap-1 mt-4 items-center">
                <button type="submit" disabled={hasErrors()} className="buttonPrimary disabled:bg-buttonDisabled disabled:hover:cursor-default hover:cursor-pointer" style={{ marginBottom: 0 }} > {mutation.status === 'pending' ? 'Cargando...' : 'Registrarse'}</button>
                <button type="reset" className="buttonSecondary hover:cursor-pointer" style={{ marginBottom: 0 }}>Limpiar</button>
            </div>
            {apiError && <ErrorMessage error={apiError} />}
        </form>
    )
}
export default RegisterUserForm;