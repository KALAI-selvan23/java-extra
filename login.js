class FormValidation{
    formValues = {
        email : "",
        password : "",
        confirmpassword : ""
    }
    errorValues = {
        emailErr : "",
        passwordErr : "",
        confirmpasswordErr : ""
    }
    showErrorMsg(index,msg){
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.add('error')
        form_group.getElementsByTagName('span')[1].textContent = msg   
    }
    showSuccessMsg(index){
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.remove('error')
        form_group.classList.add('success')
    }
    getInputs(){
        this.formValues.email = document.getElementById('email').value.trim()
        this.formValues.password = document.getElementById('password').value.trim()
        this.formValues.confirmpassword = document.getElementById('confirmpassword').value.trim()
    }
    
    validateEmail(){
        //abc@gmail.co.in
        const regExp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/
        if(this.formValues.email === ""){
            this.errorValues.emailErr = "* Please Enter Valid Email"
            this.showErrorMsg(0,this.errorValues.emailErr)
        } else if(!(regExp.test(this.formValues.email))){
            this.errorValues.emailErr = "* Invalid Email"
            this.showErrorMsg(0,this.errorValues.emailErr)
        } else {
            this.errorValues.emailErr = ""
            this.showSuccessMsg(0)
        }
    }
    validatePassword(){
        if(this.formValues.password === ""){
            this.errorValues.passwordErr = "* Please Provide a Password"
            this.showErrorMsg(1,this.errorValues.passwordErr)
        } else if(this.formValues.password.length <= 4){
            this.errorValues.passwordErr = "* Password must be atleast 5 Characters"
            this.showErrorMsg(1,this.errorValues.passwordErr)
        } else if(this.formValues.password.length > 10){
            this.errorValues.passwordErr = "* Password should not exceeds 10 Characters"
            this.showErrorMsg(1,this.errorValues.passwordErr)
        } else {
            this.errorValues.passwordErr = ""
            this.showSuccessMsg(1)
        }
    }
    validateConfirmpassword(){
        if(this.formValues.confirmpassword === ""){
            this.errorValues.confirmpasswordErr = "* Invalid Confirm Password"
            this.showErrorMsg(2,this.errorValues.confirmpasswordErr)
        } else if(this.formValues.confirmpassword === this.formValues.password && this.errorValues.passwordErr === ""){
            this.errorValues.confirmpasswordErr = ""
            this.showSuccessMsg(2)
        } else if(this.errorValues.passwordErr){
            this.errorValues.confirmpasswordErr = "* An error occurred in Password Field"
            this.showErrorMsg(2,this.errorValues.confirmpasswordErr)
        } else {
            this.errorValues.confirmpasswordErr = "* Password Must Match"
            this.showErrorMsg(2,this.errorValues.confirmpasswordErr)
        }
    }
    alertMessage(){
        const {emailErr ,  passwordErr , confirmpasswordErr}= this.errorValues
        if(emailErr === "" &&  passwordErr === "" && confirmpasswordErr === ""){
            swal("Registration Successful","ThankYou , "+this.formValues. email,"success").then(() => {
                console.log(this.formValues)
                this.removeInputs()
            })
        } else {
            swal("Give Valid Inputs","Click ok to Continue" ,"error")
        }
    }

    removeInputs(){
        const form_groups = document.getElementsByClassName('form-group')
        Array.from(form_groups).forEach(element => {
            element.getElementsByTagName('input')[0].value = ""
            element.getElementsByTagName('span')[0].textContent = ""
            element.classList.remove('success')
        })
    }
} 

const ValidateUserInputs = new FormValidation()

document.getElementsByClassName('form')[0].addEventListener('submit' , event => {
    event.preventDefault()
    ValidateUserInputs.getInputs()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePassword()
    ValidateUserInputs.validateConfirmpassword()
    ValidateUserInputs.alertMessage()
})
