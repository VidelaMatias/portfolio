import { Iuser } from '@/types/user';
import user  from './../fakedata/user.json'

  export const getUser = async (): Promise<Iuser> => { 
    try {
        console.log('api user call')
        return user;
    } catch (error:any) {
        console.error('Error fetching user data:', error);
        throw error; 
    } 
};

export const signupAPI = async (formData: FormData) => {
    const response = await fetch('/api/signup', {
    method: 'POST',
    body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
    }

    return response.json();
};

export const logoutAPI = async () => {
    const response = await fetch('/api/logout', {
    method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
    }

    return response.json();
};

export const signinAPI = async (formData: FormData) => {
    const response = await fetch('/api/signin', {
    method: 'POST',
    body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
    }

    return response.json();
};

export const recoverPasswordAPI = async (email:string) => {
    const response = await fetch('/api/recover', {
        method: 'POST',
        body: email,
        });

        if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.');
        }
    
        return response.json();
}

export const changePasswordAPI = async (password:string) => {
    const response = await fetch('/api/changePassword', {
        method: 'POST',
        body: password,
        });

        if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.');
        }
    
        return response.json();
}

