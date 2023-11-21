import { LoginRequest } from "../types/LoginRequest";
import RegisterRequest from "../types/RegisterRequest";

const BASE_URL= 'http://localhost:8080';

export const AuthService = {

    login: async (loginRequest:LoginRequest) :Promise<string> =>{

        try{
            const response= await fetch(`${BASE_URL}/auth/login`,{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginRequest),
            });

            if(!response.ok){
                throw new Error('Inicion de sesion fallido');
            }

            const data = await response.json(); //la funcion json desentrama la respuesta y la pone como objeto, {toke} le dije que va a extrer el aturbuto 'token'
            const token = data.token;

            if(token==null){
                throw new Error ('No se encontro el token');
            }

            window.localStorage.setItem('token',token);
            

            return token;
        }
        catch (error) {
            console.error('Error al iniciar sesión desde el service');
            throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
          }
    },

    register: async (registerRequest: RegisterRequest):Promise<string> => {

        try{
            const response=  await fetch(`${BASE_URL}/auth/register`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(registerRequest),
            });

            if (!response.ok){
                throw new Error('Registro Fallido');
            }

            const data = await response.json();
            const token = data.token;

            if(token==null){
                throw new Error('No se encontro el token en la respuesta');
            }

            window.localStorage.setItem('token',token);
            

            return token;
            }
            catch (error) {
                console.error('Error al registrar usuario desde el service');
                throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
              }

        }
};
