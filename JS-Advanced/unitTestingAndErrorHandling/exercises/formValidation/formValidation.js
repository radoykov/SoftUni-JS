function validate() {
    const btn = document.querySelector("button");
    btn.addEventListener('click', OnClick);

    const [username, email, password, confirmPassword, company] = document.querySelectorAll("fieldset#userInfo div input");
    const companyNumber = document.querySelector("input#companyNumber");

    company.addEventListener('click', OnCompany);

    function OnCompany(ev) {
        const aboutCompany = document.querySelector("fieldset#companyInfo");
        if (company.checked == true) {
            aboutCompany.style.display = 'block';
        } else {
            aboutCompany.style.display = 'none';
            companyNumber.value = '';
        }
    }
    function OnClick(ev) {
        ev.preventDefault();

        var flag = true;

        //username
        if (/^[a-zA-Z0-9]{4,20}$/.test(username.value) == false) {
            flag = false;
            username.style.borderColor = 'red';
        } else {
            username.style.borderColor = '';
        }

        //password and confirmPassword
        if (/^[a-zA-Z0-9_]{5,15}$/.test(password.value) == true && password.value === confirmPassword.value) {
            password.style.borderColor = '';
            confirmPassword.style.borderColor = '';
        } else {
            flag = false;
            password.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
        }

        //email
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) == false) {
            flag = false;
            email.style.borderColor = 'red';
        } else {
            email.style.borderColor = '';
        }

        if (company.checked == true) {
            if (Number(companyNumber.value) > 1000 && Number(companyNumber.value) < 9999) {
                companyNumber.style.borderColor = '';
            } else {
                flag = false;
                companyNumber.style.borderColor = 'red';
            }
        }

        //final
        const valid = document.querySelector("div#valid");
        if (flag == true) {
            valid.style.display = 'block';
        } else {
            valid.style.display = 'none';
        }
    }
}
