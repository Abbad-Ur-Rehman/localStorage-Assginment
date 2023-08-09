// GETTING MAIN BUTTON FROM DOM;
let userData = document.getElementById('user-data');
let addUser = document.getElementById('add-user');
let deleteUser = document.getElementById('delete-data');
let loginUser = document.getElementById('login-user');
let closeBtn = document.getElementById('close-btn');
let closeBtn2 = document.getElementById('close-btn2');
let closeBtnOutput = document.getElementById('close-btn-output')
let userOutput = document.getElementById('output');
let userdlt = document.getElementById('delete-data')
// END-=-=-=-=-=-=-=-=-=-=-

addUser.addEventListener('click', () => {
    // Getting from dom user info section
    let userInfoSection = document.getElementById('add-user-form');
    //Wrting actutal funtion
    userInfoSection.classList.add('open');
    userInfoSection.classList.remove('close');
})


//adding slide effect on login page
loginUser.addEventListener('click', openLoginSection)
function openLoginSection(){
    let userLoginSection = document.getElementById('login-page');
    userLoginSection.classList.add('open');
    userLoginSection.classList.remove('close');
}
closeBtn.addEventListener('click', () => {
    let userLoginSection = document.getElementById('login-page');
    userLoginSection.classList.add('close')
});
closeBtn2.addEventListener('click', () => {
    let userInfoSection = document.getElementById('add-user-form');
    userInfoSection.classList.add('close');
});
closeBtnOutput.addEventListener('click',()=>{
let userDisplay = document.getElementById('output');
userDisplay.classList.add('close')
})

userData.addEventListener('click' , ()=>{
let userDisplay = document.getElementById('output');
userDisplay.classList.add('open')
userDisplay.classList.remove('close')
})




// =-=-=-==-=-=LOGIC FOR ADD USER PAGE ==-=-=-=-=-=-=-==-=-=-=-
//GETTING INPUTS VALUE  AND STORE THEM IN TO THE VARIABLE
let userInfoname = document.getElementById('add-user-name-input');
let userInfofatherName = document.getElementById('add-user-fatherName-input');
let userInfoEmail = document.getElementById('add-user-email-input');
let userInfoPassword = document.getElementById('add-user-password-input');
let submitBtn = document.getElementById('submit-btn');
// STARTING FUNCTION;
submitBtn.addEventListener('click', storeData);
function storeData() {
    const name = userInfoname.value
    const fathername = userInfofatherName.value
    const email = userInfoEmail.value
    const password = userInfoPassword.value

    if (name || fathername && email && password > 0) {
        //An empty Arry to store values that we get
        let userDataArry = [];
        //Store them into the local Storage but first check if data if already avail
        let exData = localStorage.getItem('User-Data');
        if (exData) {
            userDataArry = JSON.parse(exData)
        }
        //PUSH DATA WE GOT IN INPUTS
        userDataArry.push({ name, fathername, email, password });
        let localStrValues = localStorage.setItem('User-Data', JSON.stringify(userDataArry));

        userInfoname.value = '';
        userInfofatherName.value = '';
        userInfoEmail.value = '';
        userInfoPassword.value = '';

        document.getElementById('store-or-not').style.color = '#a8eb12'
        document.getElementById('store-or-not').style.transform = 'translate(0%)'
        document.getElementById('store-or-not').innerHTML = 'User Data Has Been Stored'

    } else {
        document.getElementById('store-or-not').style.transform = 'translate(0%)'
        document.getElementById('store-or-not').style.color = 'red'
        document.getElementById('store-or-not').innerHTML = 'Please Enter All Info'
    };

};
// =LOGIC FOR ADD USER PAGE END==-=-=-=-=-=-=-==-=-=-=-;

// =-=-=-==-=-==-=-=-=LOGIC FOR LOGIN USER PAGE -=-=-=-
//GEEING INPUTS FROM LOGIN PAGE;
let loginbtn = document.getElementById('login-btn');
let loginOrNot = document.getElementById('loginornot');
//STARTING FUNCTION
loginbtn.addEventListener('click', matchValues);
function matchValues() {
    let loginEmail = document.getElementById('login-email-input').value;
    let loginPassword = document.getElementById('login-password-input').value;
    let oldData = JSON.parse(localStorage.getItem('User-Data'));

    let matchedUser = null;
    oldData.forEach(Element => {
        if (Element.email === loginEmail || Element.password === loginPassword) {
            matchedUser = Element;
        }

    });
    if (matchedUser) {
        let logoutBtn = document.getElementById('logout-user');
        setTimeout(()=>{
            let userLoginSection = document.getElementById('login-page');
            userLoginSection.classList.add('close');
            loginOrNot.innerHTML = ''
        },2000);
        setInterval(()=>{
            closeBtn.style.transform ='translateY(00%)'
        },4000)
        closeBtn.style.transform ='translateY(-600%)'
        
        // loginUser.innerHTML = 'Log Out';
        logoutBtn.style.display = 'block'

        loginOrNot.style.color= '#a8eb12'
        loginOrNot.style.transform= 'translate(0%)'
        loginOrNot.style.fontWeight= '300'
        loginOrNot.innerHTML = 'Congrats! You Are Successfully Logged In'
        document.getElementById('login-email-input').value ='';
        document.getElementById('login-password-input').value ='';
        

    } else {
    document.getElementById('login-email-input').value = ''
    document.getElementById('login-password-input').value = ''
        loginOrNot.style.transform= 'translate(0%)'
        loginOrNot.style.color= 'red'
        loginOrNot.style.fontWeight= '300'
        loginOrNot.innerHTML = 'Sorry! Your Details Are Not Found In Our Data'
    }

}

//=-=-=-=-=-=-=-=-=-=-=-= DISPLAY DATA OF USER
let displayedData = [];

userData.addEventListener('click',showOutput);
function showOutput(){
let userDisplay = document.getElementById('output');
    let oldDataToShow = JSON.parse(localStorage.getItem('User-Data'));
        oldDataToShow.map(user =>{
        if(!displayedData.includes(user.email)){
        const userContainer = document.createElement('div');
        const nameEle= document.createElement('p')
        const emailEle= document.createElement('p')
        const passwordEle = document.createElement('p')
        const fatherEle = document.createElement('p')

        nameEle.style.fontWeight = 'bold'
 
        userContainer.style.color = 'white';
        userContainer.style.padding = '10px';
        userContainer.style.borderBottom = '1px solid white';
        nameEle.style.fontWeight = 'bold';
        nameEle.style.marginBottom = '3px';
        passwordEle.style.color = 'orange'

        nameEle.textContent = `Name: ${user.name}`
        fatherEle.innerHTML = `F,name: ${user.fathername}`
        emailEle.textContent = `Email: ${user.email}`
        passwordEle.textContent = `Password: ${user.password}`

        userContainer.appendChild(nameEle);
        userContainer.appendChild(fatherEle);
        userContainer.appendChild(emailEle);
        userContainer.appendChild(passwordEle);

        userDisplay.appendChild(userContainer);
        displayedData.push(user.email);
        }
    })  
    
}

userdlt.addEventListener('click',deleteDataWithIndex2)
function deleteDataWithIndex(index){
    const old_data = JSON.parse(localStorage.getItem('User-Data')) ||[];
    if (index >= 0 && index < old_data.length) {
        old_data.splice(index,1)
        localStorage.setItem('User-Data' ,JSON.stringify(old_data));
    }
}
function deleteDataWithIndex2(){
const itemIndexToDelete = prompt('Please enter the Index that you want to remove'); // Specify the index of the item to be deleted
if(itemIndexToDelete >= 0){
    deleteDataWithIndex(itemIndexToDelete);
    
    location.reload();
}else{

}

};












// LOGOUT BUTTON LOGIC
let logoutBtn = document.getElementById('logout-user');
logoutBtn.addEventListener('click' , ()=>{
    logoutBtn.style.display = 'none';
    alert('You are Logged Out');
});

 