import { useState } from "react";
import { useAuthStore } from "../../../core/Infraestructura/adapters/UseAuthStore";
import { LoginScreen } from "./LoginScreen";


export const HandlerLogin = () => {
    const [form, setform] = useState({
        username: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');


    const { loginState } = useAuthStore();

    const handleLogin = async () => {
        console.log(form.username);
        setLoading(true);
        const response = await loginState(form.username, form.password);
        if (!response) {
            setError('Usuario o contraseña incorrectos');
        }
        setLoading(false);
    }
    const setUsername = (username: string) => {
        console.log(form.username);
        setform({ ...form, username });
        
    };

    const setPassword = (password: string) => {
        setform({ ...form, password });
    };
    return (
        <LoginScreen
            username={form.username}
            password={form.password}
            setUsername={setUsername}
            setPassword={setPassword}
            onHandleLogin={handleLogin}
        />
    );
}