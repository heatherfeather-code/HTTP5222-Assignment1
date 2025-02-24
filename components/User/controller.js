const userModel = require("./model");

//retrieve user and render user page
const getUser = async (request, response) => {
    console.log(request.session);

    //get user from session and render user page
    if(request.session.loggedIn){
        response.render("user/user", { username: request.session.user});

    } else{
        response.redirect("/user/login");
    }
}

const loginForm = (request, response) => {
    response.render("user/login");
}
const login = async (request, response) => {
    //authenticate user and redirect to /user
    let authStatus = await userModel.authenticateUser(request.body.u, request.body.pw);
    console.log(auth);
    if(authStatus){
        request.session.loggedIn = true;
        request.session.user = request.body.u;

        //redirect to /user
        response.redirect("/user");
    }
    else{
        response.render("user/login", {err: "User not found"});
    }
}

const logout = (request, response) => {
    //destroy session and redirect user to home
    request.session.destroy();
    response.redirect("/");
}

//render the registration page
const registerForm = (request, response) => {
    response.render("user/register");
}

const register = async (request,response) =>{
    //get values from the form and create a new user
    let result = await userModel.addUser(request.body.u, request.body.pw);
    console.log(`result: ${result}`);
    if(result){
        response.redirect("/user/login");
    }else{
        response.render("user/register", {err: "Username already exists."});
    }
}

module.exports = {
    getUser, 
    loginForm, 
    login, 
    logout, 
    registerForm,
    register
}