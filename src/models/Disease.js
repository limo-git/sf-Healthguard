export class Disease {
    constructor(name, description, hindiDescription, hindiName) {
      this.name = name;
      this.description = description;
      this.hindiDescription = hindiDescription;
      this.hindiName = hindiName;
    }
  
    static fromJson(json) {
      return new Disease(
        json.english_name,
        json.english_description,
        json.hindi_description,
        json.hindi_name
      );
    }
  }
  