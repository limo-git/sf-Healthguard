import { Disease } from '../models/Disease';
import description from '../assets/dataset/description.json';

class DescriptionController {
    constructor() {
        this.diseases = new Map();
    }

    loadDescription() {
        try {
            Object.entries(description).forEach(([key, value]) => {
                const symptom = Disease.fromJson(value);
                this.diseases.set(symptom.name, symptom);
            });
        } catch (error) {
           console.error('Error loading description data:', error);
        }
    }
}

export default DescriptionController;