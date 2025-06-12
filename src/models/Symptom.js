export class Symptom {
    constructor(name, probability, severity) {
      this.name = name;
      this.probability = probability;
      this.severity = severity;
    }
  
    static fromJson(json) {
      return new Symptom(json.name, json.probability, json.severity);
    }
}