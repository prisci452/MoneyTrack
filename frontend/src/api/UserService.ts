import { User } from "@/interface/User" 
import axios from "axios" 
 
export default class UserService { 
    async login(usuario: string, password: string): Promise<User | null> { 
        try { 
            const response = await axios.post('http://localhost:3000/usuario/login', { usuario, password }) 
            return response.data as User | null;
        } catch (error: any) {
            console.log(error.response.data.message);
            return null;
        }
    } 
 
    async addUser(user: User): Promise<boolean> { 
        try { 
            await axios.post('http://localhost:3000/usuarios/add', user);
            return true; 
        } catch { return false }
    } 
} 
