class User {

    constructor (name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }    

    get id() {
        return this._id;         
    }

    get name() {
        return this._name;         
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }

    set photo(value){
        this._photo = value;
    }

    set id(value) {
        this._id = value;         
    }

    loadFromJSON(json) {

        for (let name in json) {

            switch(name) {

                case '_register':
                    this[name] = new Date(json[name]);
                break;

                default:
                   if (name.substring(0, 1) === '_') this[name] = json[name];

            }
           

        }

    } 

    toJSON() {

        let json = {};

        Object.keys(this).forEach(key => {

            if (this[key] !== undefined) json[key] = this[key];

        });
        
        return json;

    }

    save() {

        return new Promise((resolve, reject) => {

            let promise;

            if (this.id) {
    
                promise = HttpRequest.put(`/users/${this.id}`, this.toJSON());
    
            } else {
    
                promise = HttpRequest.post(`/users`, this.toJSON());
    
            }
    
            promise.then(data => {
    
                this.loadFromJSON(data);

                resolve(this);
    
            }).catch(e=>{

                reject(e);

            });

        });      

    }   

    static getUserStorage() {

      return Fetch.get('/users');

    }

    deleteUser() {

        return HttpRequest.delete(`/users/${this.id}`);

    }   

}









    // deleteUser() {

    //     let users = User.getUserStorage();

    //     users.forEach((userData, index)=>{

    //         if(this._id == userData._id) {
    //             // Remove one Item of Array
    //             users.splice(index, 1);

    //         }

    //     });

    //     localStorage.setItem("users", JSON.stringify(users)); 

    // }


    // save() {

    //     let users = User.getUserStorage();

    //     if (this.id > 0) {

    //         users.map(user => {

    //             if (user._id == this.id) {

    //                Object.assign(user, this);

    //             }

    //             return user;

    //         });

    //     } else {

    //         this._id = this.getNewId();

    //         users.push(this);

    //     }

    //     sessionStorage.setItem("users", JSON.stringify(users));
    //     localStorage.setItem("users", JSON.stringify(users));    

    // }


    // static getUserStorage() {

    //     let users = [];

    //     if (localStorage.getItem("users")) {

    //         users = JSON.parse(localStorage.getItem("users"));

    //     }

    //     return users;

    // }


    // getNewId() {

    //     let usersID = parseInt(localStorage.getItem("usersID"));

    //     if (!usersID > 0) usersID = 0;

    //     usersID++;

    //     localStorage.setItem("usersID", usersID);

    //     return usersID;

    // }