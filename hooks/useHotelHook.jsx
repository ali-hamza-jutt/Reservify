import axios from 'axios'
import {app} from "../app/firebase";
import { getDatabase, ref, onValue, set, update, remove } from "firebase/database";
import { useState } from 'react';
const useHotelHook = () => {
    const search = async (formData) => {
        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
            params: {
                checkout_date: formData.check_out_date,
                order_by: 'popularity',
                filter_by_currency: 'AED',
                room_number: formData.room_qty,
                dest_id: '-2602512',
                dest_type: 'city',
                adults_number: formData.adults,
                checkin_date: formData.check_in_date,
                locale: 'en-gb',
                units: 'metric',
                include_adjacency: 'true',
                children_number: '2',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                children_ages: '5,0'
            },
            headers: {
                'X-RapidAPI-Key': '8857f31166mshdcdb67ac9d39494p1f60a6jsne9e4e097069b',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data; // Return the response data for further processing
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch hotels');
        }
    }

    const dummy = async () => {
        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
            params: {
                checkout_date: '2024-06-21',
                order_by: 'popularity',
                filter_by_currency: 'AED',
                room_number: '1',
                dest_id: '-2602512',
                dest_type: 'city',
                adults_number: '1',
                checkin_date: '2024-05-21',
                locale: 'en-gb',
                units: 'metric',
                include_adjacency: 'true',
                children_number: '2',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                children_ages: '5,0'
            },
            headers: {
                'X-RapidAPI-Key': '8857f31166mshdcdb67ac9d39494p1f60a6jsne9e4e097069b',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log("Hook called");
            // console.log(response.data);
            return response.data; // Return the response data for further processing
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch hotels');
        }
    }
    const [images,setImg] = useState()
    const fetchImages = () => {
        
        const db = getDatabase(app);
        const dbRef = ref(db, 'images');
        console.log("data receiving")
        onValue(dbRef, (snapshot) => {
            let data = snapshot.val();
            console.log("--------------------------------------------------------")
            console.log(data)
            setImg(data)
        })
    };

    return { search, dummy, fetchImages,images };
};

export default useHotelHook;