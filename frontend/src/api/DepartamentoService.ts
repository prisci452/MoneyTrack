import { Departamento } from "@/interface/Departamento";
import axios from "axios";

export default class DepartamentoService {
    async getDepartamentos(): Promise<Departamento[]> {
        try {
            const response = await axios.get('http://localhost:3000/departamentos/get/all');
            const departamentos: Departamento[] = response.data;
            return departamentos;
        } catch (error) { throw error }
    }
}