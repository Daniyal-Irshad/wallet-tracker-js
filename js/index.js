// console.log(firebase);

var auth = firebase.auth();
var firestore = firebase.firestore();

// console.log(auth);
// console.log(firestore);

var signupForm = document.querySelector(".signupForm");
var fullNameSignup = document.querySelector(".fullName-Signup");
var emailSignup = document.querySelector(".email-Signup");
var passwordSignup = document.querySelector(".password-Signup");

signupForm.addEventListener("submit",async (e) =>{
    e.preventDefault();
    try {
        var fullName = fullNameSignup.value;
        var email = emailSignup.value;
        var password = passwordSignup.value;
        var signedUser = await auth.createUserWithEmailAndPassword(email,password);
        var userObj = {
            name: fullName,
            email: email
        }
        await firestore.collection("users").doc(signedUser.user.uid).set(userObj);

    } catch (error) {
        console.log(error.message);
    }
});




var signinForm = document.querySelector(".signinForm");
var emailSignin = document.querySelector(".email-Signin");
var passwordSignin = document.querySelector(".password-Signin");

signinForm.addEventListener("submit",async (e) =>{
    e.preventDefault();
    try {
        var email = emailSignin.value;
        var password = passwordSignin.value;
        var loggedUser = await auth.signInWithEmailAndPassword(email,password);
        var userInfo = await firestore.collection("users").doc(loggedUser.user.uid).get();
        console.log(userInfo.data());
        
    } catch (error) {
        console.log(error.message);
    }
});