import { Restaurant } from "@/interface/Restaurant"; 
import axios from "axios"; 
 
export default class RestaurantService { 
    async getRestaurants(): Promise<Restaurant[]> { 
        try { 
            const response = await axios.get('http://localhost:3000/restaurantes/get/all'); 
            const restaurants: Restaurant[] = response.data;
            return restaurants;
        } catch (error) { throw error }
 
    } 
} 