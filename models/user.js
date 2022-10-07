class User {
    guid;
    username;
    password;
    email;
    isConfirmed;
    avatar;

    constructor(guid,username,password,email,isConfirmed,avatar) {
        this.guid = guid;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isConfirmed = isConfirmed;
        this.avatar = ((avatar) ?  new URL(avatar) : null);
    }
}