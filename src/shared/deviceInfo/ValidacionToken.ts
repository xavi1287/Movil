import { jwtDecode } from "jwt-decode";


interface JwtPayload {
    exp: number;
    // otras propiedades opcionales
  }
  
  export const isTokenValid = (token: string): boolean => {
    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };


