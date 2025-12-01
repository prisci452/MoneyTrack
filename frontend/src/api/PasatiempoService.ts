import { Hobby } from "@/interface/Hobby";
import axios from "axios";

export default class PasatiempoService {
    async getPasatiempos(): Promise<Hobby[]> {
        try {
            const response = await axios.get('http://localhost:3000/pasatiempos/get/all');
            const pasatiempos: Hobby[] =response.data
            return pasatiempos;
        } catch (error) {
            console.log('error en el servidor');
            return [];            
        }
    }
}