import { Symptom } from '../models/Symptom';
import dataset from '../assets/dataset/dataset.json';

export class DiseaseService {
    constructor() {
      this.diseasesMap = new Map();
      this.tempDataset = new Map();
      this.selectedSymptoms = [];
      this.criticalLvl = new Map();
    }

    loadDiseasesData() {
        try {
            Object.entries(dataset).forEach(([key, value]) => {
              const symptomsJson = value.symptoms;
              const symptomsMap = new Map();
              
              symptomsJson.forEach((symptomJson) => {
                const symptom = Symptom.fromJson(symptomJson);
                symptomsMap.set(symptom.name, { probability: symptom.probability, severity: symptom.severity });
              });
              this.diseasesMap.set(key, symptomsMap);
            });
            Object.entries(dataset).forEach(([key, value]) => {
              const symptomsJson = value.symptoms;
              const symptomsMap = new Map();
              
              symptomsJson.forEach((symptomJson) => {
                const symptom = Symptom.fromJson(symptomJson);
                symptomsMap.set(symptom.name, { probability: symptom.probability, severity: symptom.severity });
              });
              this.tempDataset.set(key, symptomsMap);
            });
        } catch (error) {
            console.error('Error loading diseases data:', error);
        }
    }

    getSymptoms() {
        const symptoms = [];
        const symptomsProbabSum = new Map();

        this.tempDataset.forEach((symptomsMap) => {
            symptomsMap.forEach((value, symptom) => {
                const currentSum = symptomsProbabSum.get(symptom) || 0;
                symptomsProbabSum.set(symptom, currentSum + value.probability);
            });
        });

        const probabSumList = Array.from(symptomsProbabSum.entries()).map(([symptom, probabilitySum]) => ({
            symptom,
            probabilitySum,
        }));

        probabSumList.sort((a, b) => b.probabilitySum - a.probabilitySum);

        for (let i = 0; i < Math.min(probabSumList.length, 5); i++) {
            symptoms.push(probabSumList[i].symptom);
        }

        return symptoms;
    }

    selectSymptom(symptom) {
        this.selectedSymptoms.push(symptom);


        this.tempDataset.forEach((symptomsMap, disease) => {
            if (!symptomsMap.has(symptom)) {
                this.tempDataset.delete(disease);
            }
        });
        this.deleteSymptoms([symptom]);
    }

    deleteSymptoms(symptoms) {
        symptoms.forEach(symptom => {
            this.tempDataset.forEach((symptomsMap, disease) => {
                if (symptomsMap.has(symptom)) {
                    symptomsMap.delete(symptom);
                    if (symptomsMap.size === 0) {
                        this.tempDataset.delete(disease);
                    }
                }
            });
        });
    }  
    
    setCritical(symptom, lvl) {
        this.criticalLvl.set(symptom,lvl);
    }

    mySelectedSymptoms() {
        return this.selectedSymptoms;
    }

    getPotentialDiseases() {
        const criticalLevelObtained = new Map();
        
        if (this.selectedSymptoms.length === 0) {
            return [];
        }
    
        const temp = [];
    
        this.diseasesMap.forEach((symptomsMap, disease) => {
            let denom = 0.0;
            let num = 0.0;
            let criticalSum = 0;
            let sever = 0;
    
            symptomsMap.forEach((value, symptom) => {
                denom += value.probability;
                criticalSum += value.severity;
    
                if (this.selectedSymptoms.includes(symptom)) {
                    num += value.probability;
                    sever += this.criticalLvl.get(symptom) || 0;
                }
            });
    
            if (sever < (criticalSum / 2)) {
                criticalLevelObtained.set(disease, 1);
            } else if (sever <= criticalSum) {
                criticalLevelObtained.set(disease, 2);
            } else {
                criticalLevelObtained.set(disease, 3);
            }
    
            const val = num / denom;
            temp.push({ value: val, disease });
        });
    
        temp.sort((a, b) => b.value - a.value);
    
        const potentialDiseases = [];
        for (let i = 0; i < Math.min(temp.length, 5); i++) {
            const prob = (temp[i].value * 100).toFixed(3);
            potentialDiseases.push({
                disease: temp[i].disease,
                probability: prob,
                criticalLevel: criticalLevelObtained.get(temp[i].disease)
            });
        }
    
        return potentialDiseases;
    }
    
}