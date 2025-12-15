const fs = require("fs");

class AurigaAPI {
    #acces_token;

    PATHS = {
        SYNC: {
            GRADES: "dataSync/grades.json",
            SYLLABUS: "dataSync/syllabus.json",
            USERDATA: "dataSync/userData.json"
        },
        EXTRACT: {
            GRADES: "dataExtract/gradesData.json",
            SYLLABUS: "dataExtract/syllabusData.json",
            SYLLABUS2: "dataExtract/syllabus2Data.json",
            USERDATA: "dataExtract/userData.json"
        },
        PAYLOADS: {
            SYLLABUS: "payloads/syllabusPayload.json",
            SYLLABUS2: "payloads/syllabus2Payload.json",
            GRADES: "payloads/gradesPayload.json"
        }
    };

    constructor(token) {
        this.#acces_token = token;
    }

    _readJsonFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                return JSON.parse(fs.readFileSync(filePath, "utf8"));
            }
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error.message);
        }
        return null;
    }

    // --- GRADES ---

    get getAllGrades() {
        return this._readJsonFile(this.PATHS.SYNC.GRADES) || [];
    }

    getGradeByCode(code) {
        return this.getAllGrades.find(element => element.code === code);
    }

    getGradeByName(name) {
        return this.getAllGrades.find(element => element.name === name);
    }

    getGradeByType(type) {
        return this.getAllGrades.filter(element => element.type === type);
    }

    getGradeByGrade(grade) {
        return this.getAllGrades.filter(element => element.grade === grade);
    }

    // --- SYLLABUS ---

    get getAllSyllabus() {
        return this._readJsonFile(this.PATHS.SYNC.SYLLABUS) || [];
    }
    
    getSyllabusByCode(code) {
        return this.getAllSyllabus.find(element => element.code === code);
    }

    getSyllabusByName(name) {
        return this.getAllSyllabus.find(element => element.name === name);
    }

    getSyllabusByUE(ue) {
        return this.getAllSyllabus.filter(element => element.ue === ue);
    }

    getSyllabusByStartDate(startDate) {
        return this.getAllSyllabus.filter(element => element.startDate === startDate);
    }

    getSyllabusByEndDate(endDate) {
        return this.getAllSyllabus.filter(element => element.endDate === endDate);
    }

    getSyllabusByCredits(credits) {
        return this.getAllSyllabus.filter(element => element.credits === credits);
    }

    getSyllabusByTime(time) {
        return this.getAllSyllabus.filter(element => element.time === time);
    }
    
    getSyllabusBySemester(semester) {
        return this.getAllSyllabus.filter(element => element.semester === semester);
    }

    // --- USER DATA ---

    get getAllUserData() {
        return this._readJsonFile(this.PATHS.SYNC.USERDATA) || {};
    }

    get getStudentData() {
        return this.getAllUserData.student;
    }

    get getHighSchoolData() {
        return this.getAllUserData.highSchool;
    }
    
    get getStudentParent1() {
        return this.getAllUserData.parent1;
    }

    get getStudentParent2() {
        return this.getAllUserData.parent2;
    }

    get getStudentFinancialGuarantor() {
        return this.getAllUserData.financialGuarantor;
    }

    // --- SYNC LOGIC ---

    async #dataSync() {
        const grades = this._readJsonFile(this.PATHS.EXTRACT.GRADES);
        const syllabus = this._readJsonFile(this.PATHS.EXTRACT.SYLLABUS);
        const syllabus2 = this._readJsonFile(this.PATHS.EXTRACT.SYLLABUS2);
        const userData = this._readJsonFile(this.PATHS.EXTRACT.USERDATA);

        await fs.promises.mkdir("./dataSync", { recursive: true });

        if (!grades || !syllabus || !userData) {
            console.error("Error: Unable to synchronize, extracted data is missing.");
            return;
        }

        fs.writeFileSync(this.PATHS.SYNC.GRADES, JSON.stringify(grades.content.lines.map(element => {
            return {
                "code": element[0],
                "type": element[4],
                "name": element[2],
                "grade": element[1]
            }
        }), null, 2));

        const allSyllabusLines = [...syllabus.content.lines, ...syllabus2.content.lines];

        fs.writeFileSync(this.PATHS.SYNC.SYLLABUS, JSON.stringify(allSyllabusLines.map(element => {
            return {
                "id": element[0],
                "time": element[6],
                "name": element[2],
                "UE": String(element[2]).split("_")[5],
                "semester": String(element[2]).split("_")[4].split("S")[1],
                "nameFr": element[3].fr,
                "credits": element[7],
                "startDate": element[4],
                "endDate": element[5],
            }
        }), null, 2));



        const userDataSync = {
            "parent1": {
                "firstName": userData.person.customAttributes.RL1_FirstName,
                "lastName": userData.person.customAttributes.RL1_Name,
                "email": userData.person.customAttributes.RL1_Mail,
                "phone": userData.person.customAttributes.RL1_Phone,
                "address": userData.person.customAttributes.RL1_AddressC,
                "city": userData.person.customAttributes.RL1_Town,
                "zipCode": userData.person.customAttributes.RL1_Postcode,
                "country": userData.person.customAttributes.RL1_Country.id
            },
            "parent2": {
                "firstName": userData.person.customAttributes.RL2_FirstName,
                "lastName": userData.person.customAttributes.RL2_Name,
                "email": userData.person.customAttributes.RL2_Mail,
                "phone": userData.person.customAttributes.RL2_Phone,
                "address": userData.person.customAttributes.RL2_AddressC,
                "city": userData.person.customAttributes.RL2_Town,
                "zipCode": userData.person.customAttributes.RL2_Postcode,
                "country": userData.person.customAttributes.RL2_Country.id
            },
            "financialGuarantor": {
                "firstName": userData.person.customAttributes.GF1_FirstName,
                "lastName": userData.person.customAttributes.GF1_Name,
                "email": userData.person.customAttributes.GF1_Mail,
                "phone": userData.person.customAttributes.GF1_Phone,
                "address": userData.person.customAttributes.GF1_AddressC,
                "city": userData.person.customAttributes.GF1_Town,
                "zipCode": userData.person.customAttributes.GF1_Postcode,
                "country": userData.person.customAttributes.GF1_Country.id
            },
            "student": {
                "login": userData.person.LOGIN,
                "schoolMail": userData.person.contactDetails[0].contactInformation,
                "mail": userData.person.contactDetails[1].contactInformation,
                "phone": userData.person.contactDetails[2].contactInformation,
                "firstName": userData.person.currentFirstName,
                "lastName": userData.person.currentLastName,
                "birthDate": userData.person.birthDate,
                "cityOfBirth": userData.person.cityOfBirth,
                "countryOfBirth": userData.person.countryOfBirth.iso639_1Code,
                "gender": userData.person.gender.code,
                "adress": { "street1": userData.person.addresses[0].street1, "street2": userData.person.addresses[0].street2},
                "city": userData.person.addresses[0].city,
                "country": userData.person.addresses[0].country.iso639_1Code,
                "entryYear": userData.person.higherEducationEntryYear
            },
            "highSchool": {
                "option1": userData.person.siseBacOption1.code,
                "option2": userData.person.siseBacOption2.code,
                "language1": userData.person.siseLanguage1.caption.en,
                "language2": userData.person.siseLanguage2.caption.en,
                "exameType": userData.person.siseBacSeries.code,
                "department": userData.person.bacFrenchDepartment.code
            }
        }
        fs.writeFileSync(this.PATHS.SYNC.USERDATA, JSON.stringify(userDataSync, null, 2));
    }

    async create() {
        if (!this.#acces_token) {
            console.error("Error: Missing token. Please pass the token as a parameter to the create() method.");
            return false;
        }

        try {
            const getDataFromAuriga = async (endpoint, file) => {
                const response = await fetch(`https://auriga.epita.fr/api/${endpoint}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + this.#acces_token
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data from Auriga API");
                }
                const data = await response.json();
                fs.writeFileSync(file, JSON.stringify(data, null, 2));
                return true;
            };
            const postDataToAuriga = async (endpoint, payload, file) => {
                const response = await fetch(`https://auriga.epita.fr/api/${endpoint}`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.#acces_token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Failed to fetch data from Auriga API. Status: ${response.status} ${response.statusText}. Response: ${text}`);
                }
                const data = await response.json();
                fs.writeFileSync(file, JSON.stringify(data, null, 2));
            };
            await fs.promises.mkdir("./dataExtract", { recursive: true });

            await getDataFromAuriga("me", this.PATHS.EXTRACT.USERDATA);

            const syllabusPayload = this._readJsonFile(this.PATHS.PAYLOADS.SYLLABUS);
            const syllabusPayload2 = this._readJsonFile(this.PATHS.PAYLOADS.SYLLABUS2);
            const gradesPayload = this._readJsonFile(this.PATHS.PAYLOADS.GRADES);

            if (!syllabusPayload || !gradesPayload) {
                 throw new Error("Payloads not found. Check the payloads folder.");
            }

            await postDataToAuriga("menuEntries/166/searchResult?size=100&page=1&sort=id", syllabusPayload, this.PATHS.EXTRACT.SYLLABUS);
            await postDataToAuriga("menuEntries/166/searchResult?size=100&page=1&sort=id", syllabusPayload2, this.PATHS.EXTRACT.SYLLABUS2);
            await postDataToAuriga("menuEntries/1036/searchResult?size=100&page=1&sort=id&disableWarnings=true", gradesPayload, this.PATHS.EXTRACT.GRADES);
            await this.#dataSync();
            //await fs.promises.rm("./dataExtract", { recursive: true, force: true });

        } catch (error) {
            console.error("Error during creation/synchronization:", error);
            await fs.promises.rm("./dataExtract", { recursive: true, force: true });
            return false;
        }
        return true;
    }
}