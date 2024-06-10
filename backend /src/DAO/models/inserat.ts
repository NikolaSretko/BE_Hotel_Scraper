import mongoose from "mongoose";
 

interface Inserat {
    typ: string;
    stars: number;
    breakfastIncluded: boolean; 
    pricePerNight: number;
    pricePerNightFuture: number;
}



const inseratSchema = new mongoose.Schema({
  typ: {type: 'string',required: true},
  size: {type: 'number',required: true},
  price: {type: 'boolean',required: true},
  date:{type:'date',required: true}
},
{collection:"HOTELS"}
);
