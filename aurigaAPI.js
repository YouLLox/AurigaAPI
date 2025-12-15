const fs = require("fs");

/**
 * @typedef {Object} AurigaAPI
 * @property {string} acces_token
 */

/**
 * @typedef {Object} grade
 * @property {number} code
 * @property {string} type
 * @property {string} name
 * @property {number} semester
 * @property {number} grade
 */

/**
 * @typedef {Object} syllabus
 * @property {number} id
 * @property {number} time
 * @property {string} name
 * @property {string} UE
 * @property {number} semester
 * @property {string} nameFr
 * @property {number} credits
 * @property {string} startDate
 * @property {string} endDate
 */

/**
 * @typedef {Object} userData
 * @property {parent} parent1
 * @property {parent} parent2
 * @property {financialGuarantor} financialGuarantor
 * @property {student} student
 * @property {highSchool} highSchool
 */

/**
 * @typedef {Object} parent
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} address
 * @property {string} city
 * @property {string} zipCode
 * @property {number} country
 */

/**
 * @typedef {Object} financialGuarantor
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} city
 * @property {number} country
 */

/**
 * @typedef {Object} student
 * @property {string} schoolMail
 * @property {string} mail
 * @property {string} phone
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} birthDate
 * @property {string} cityOfBirth
 * @property {string} countryOfBirth
 * @property {string} gender
 * @property {adress} adress
 * @property {string} city
 * @property {string} country
 * @property {number} entryYear
 */

/** 
 * @typedef {Object} adress
 * @property {string} street1
 * @property {string} street2
 */

/**
 * @typedef {Object} highSchool
 * @property {string} option1
 * @property {string} option2
 * @property {string} language1
 * @property {string} language2
 * @property {string} examType
 * @property {string} department
 */

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

    /**
     * Return a list of all grades
     * @returns {Array<grade>}
     */
    get getAllGrades() {
        return this._readJsonFile(this.PATHS.SYNC.GRADES) || [];
    }

    /**
     * Return a grade by code
     * @param {number} code 
     * @returns {grade}
     */
    getGradeByCode(code) {
        return this.getAllGrades.find(element => element.code === code);
    }

    /**
     * Return a grade by name
     * @param {string} name 
     * @returns {grade}
     */
    getGradeByName(name) {
        return this.getAllGrades.find(element => element.name === name);
    }

    /**
     * Return a list of grades by type
     * @param {string} type 
     * @returns {Array<grade>}
     */
    getGradeByType(type) {
        return this.getAllGrades.filter(element => element.type === type);
    }

    /**
     * Return a list of grades by grade
     * @param {number} grade 
     * @returns {Array<grade>}
     */
    getGradeByGrade(grade) {
        return this.getAllGrades.filter(element => element.grade === grade);
    }

    /**
     * Return a list of grades by semester
     * @param {number} semester 
     * @returns {Array<grade>}
     */
    getGradeBySemester(semester) {
        return this.getAllGrades.filter(element => element.semester === semester);
    }

    // --- SYLLABUS ---

    /**
     * Return a list of all syllabus
     * @returns {Array<syllabus>}
     */
    get getAllSyllabus() {
        return this._readJsonFile(this.PATHS.SYNC.SYLLABUS) || [];
    }
    
    /**
     * Return a syllabus by code
     * @param {number} code 
     * @returns {syllabus}
     */
    getSyllabusByCode(code) {
        return this.getAllSyllabus.find(element => element.code === code);
    }

    /**
     * Return a syllabus by name
     * @param {string} name 
     * @returns {syllabus}
     */
    getSyllabusByName(name) {
        return this.getAllSyllabus.find(element => element.name === name);
    }

    /**
     * Return a list of syllabus by UE
     * @param {string} ue 
     * @returns {Array<syllabus>}
     */
    getSyllabusByUE(ue) {
        return this.getAllSyllabus.filter(element => element.ue === ue);
    }

    /**
     * Return a list of syllabus by start date
     * @param {string} startDate 
     * @returns {Array<syllabus>}
     */
    getSyllabusByStartDate(startDate) {
        return this.getAllSyllabus.filter(element => element.startDate === startDate);
    }

    /**
     * Return a list of syllabus by end date
     * @param {string} endDate 
     * @returns {Array<syllabus>}
     */
    getSyllabusByEndDate(endDate) {
        return this.getAllSyllabus.filter(element => element.endDate === endDate);
    }

    /**
     * Return a list of syllabus by credits
     * @param {number} credits 
     * @returns {Array<syllabus>}
     */
    getSyllabusByCredits(credits) {
        return this.getAllSyllabus.filter(element => element.credits === credits);
    }

    /**
     * Return a list of syllabus by time
     * @param {number} time 
     * @returns {Array<syllabus>}
     */
    getSyllabusByTime(time) {
        return this.getAllSyllabus.filter(element => element.time === time);
    }
    
    /**
     * Return a list of syllabus by semester
     * @param {number} semester 
     * @returns {Array<syllabus>}
     */
    getSyllabusBySemester(semester) {
        return this.getAllSyllabus.filter(element => element.semester === semester);
    }

    // --- USER DATA ---

    /**
     * Return a list of all user data
     * @returns {userData}
     */
    get getAllUserData() {
        return this._readJsonFile(this.PATHS.SYNC.USERDATA) || {};
    }

    /**
     * Return the student data
     * @returns {student}
     */
    get getStudentData() {
        return this.getAllUserData.student;
    }

    /**
     * Return the high school data
     * @returns {highSchool}
     */
    get getHighSchoolData() {
        return this.getAllUserData.highSchool;
    }
    
    /**
     * Return the student parent 1
     * @returns {parent}
     */
    get getStudentParent1() {
        return this.getAllUserData.parent1;
    }

    /**
     * Return the student parent 2
     * @returns {parent}
     */
    get getStudentParent2() {
        return this.getAllUserData.parent2;
    }

    /**
     * Return the student financial guarantor
     * @returns {financialGuarantor}
     */
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

        if (!grades || !syllabus || !syllabus2 || !userData) {
            console.error("Error: Unable to synchronize, extracted data is missing.");
            return;
        }

        fs.writeFileSync(this.PATHS.SYNC.GRADES, JSON.stringify(grades.content.lines.map(element => {
            return {
                "code": element[0],
                "type": element[4],
                "name": element[2],
                "semester": parseInt(String(element[2]).split("_")[4].split("S")[1]),
                "grade": parseFloat(element[1])
            }
        }), null, 2));

        const allSyllabusLines = [...syllabus.content.lines, ...syllabus2.content.lines];

        fs.writeFileSync(this.PATHS.SYNC.SYLLABUS, JSON.stringify(allSyllabusLines.map(element => {
            return {
                "id": element[0],
                "time": element[6],
                "name": element[2],
                "UE": String(element[2]).split("_")[5],
                "semester": parseInt(String(element[2]).split("_")[4].split("S")[1]),
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
                "examType": userData.person.siseBacSeries.code,
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
            await fs.promises.rm("./dataExtract", { recursive: true, force: true });

        } catch (error) {
            console.error("Error during creation/synchronization:", error);
            await fs.promises.rm("./dataExtract", { recursive: true, force: true });
            return false;
        }
        return true;
    }
}