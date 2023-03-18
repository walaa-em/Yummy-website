
$(document).ready(function () {

    $('.loadingScreen').fadeOut(2000, function () {

        $('body').css('overflow', 'visible');

    });

    closeNavMenu()

})

function loading() {

    $('.inner-loadingScreen').css('display', 'flex')

    $('.inner-loadingScreen').fadeOut(300)
}



/* nav menu */

function closeNavMenu() {

    let move = $('.links').outerWidth()

    if ($('.naVMenu').css('left') == '0px') {

        document.querySelector(' .changeIcon').classList.replace("fa-x", 'fa-bars');

        $('.naVMenu').animate({ left: -move }, 500);

        $('.slideNav li').css('transform', ' translateY(400px)')

    }
    else {

        document.querySelector(' .changeIcon').classList.replace("fa-bars", 'fa-x');

        $('.naVMenu').animate({ left: 0 }, 500)

        $('.slideNav li').css('transform', ' translateY(0%)')


    }

}



/* home page */


let mainMeals = [];

function getMainPage() {

    var request = new XMLHttpRequest;

    request.open("get", "https://www.themealdb.com/api/json/v1/1/search.php?s=");

    request.send();


    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            mainMeals = JSON.parse(request.response).meals

            // console.log(mainMeals)

            displayMain(mainMeals)
        }
    })

}

getMainPage()


function displayMain(arr) {

    document.querySelector('.searchContainer').innerHTML = '';

    let cartoona = "";

    if (arr.length > 20) {

        for (let i = 0; i < 20; i++) {

            cartoona = cartoona + `<div class="col-md-3">

                <div class="mainMeal position-relative overflow-hidden" onclick="loading() ; getRecepie(${arr[i].idMeal})">

                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">

                    <div class="bg-mainMeal d-flex align-items-center p-2 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>

                </div>


            </div>`
        }
    }

    else {

        for (let i = 0; i < arr.length; i++) {

            cartoona = cartoona + `<div class="col-md-3">

                <div class="mainMeal position-relative overflow-hidden" onclick=" loading() ;getRecepie(${arr[i].idMeal})">

                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">

                    <div class="bg-mainMeal d-flex align-items-center p-2 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>

                </div>


            </div>`
        }
    }

    document.querySelector('#rowMeal').innerHTML = cartoona;


}


/* meal Recepies pages */


async function getRecepie(idMeal) {

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    respone = await respone.json();

    // console.log(respone)

    displayRecepie(respone.meals[0])


}

function displayRecepie(RecepieObj) {

    // console.log(RecepieObj.strTags)


    document.querySelector('.searchContainer').innerHTML = '';


    let ingredients = ''

    for (let i = 1; i <= 20; i++) {

        if (RecepieObj[`strIngredient${i}`] !== "") {

            ingredients += `<li class="alert alert-info m-2 p-1">${RecepieObj[`strMeasure${i}`]} ${RecepieObj[`strIngredient${i}`]}</li>`

        }
    }

    let tagsButtons = ''

    if (RecepieObj.strTags != null) {

        let tags = RecepieObj.strTags.split(",")

        for (let i = 0; i < tags.length; i++) {

            tagsButtons += `<li class="alert alert-info m-2 p-1">${tags[i]}</li>`

        }

    } else {
        tagsButtons = ''
    }

    // console.log(tagsButtons)e

    let cartoona = ` <div class="col-md-4">

                <img class="w-100" src="${RecepieObj.strMealThumb}" alt="">
                <h2>${RecepieObj.strMeal}</h2>

              </div>

            <div class="col-md-8">

                <h2>Instructions</h2>

                <p>${RecepieObj.strInstructions}</p>

                <h3>Area : ${RecepieObj.strArea}</h3>
                <h3>Category : ${RecepieObj.strCategory}</h3>
                <h3>Ingredients :</h3>

                <ul class="list-unstyled d-flex g-3 flex-wrap">
                       ${ingredients}
                </ul>

                <h3>Tags :</h3>

                <ul class="list-unstyled d-flex g-3 flex-wrap">
                
                    ${tagsButtons}
                </ul>

                <a target="_blank" href="${RecepieObj.strSource}"
                    class="btn btn-success">Source</a>

                <a target="_blank" href="${RecepieObj.strYoutube}" class="btn btn-danger">Youtube</a>
            
            </div> `

    document.querySelector('#rowMeal').innerHTML = cartoona;

}


/* search page */

function displaySearchPage() {


    document.querySelector('.searchContainer').innerHTML = `<div>
                <div class="container d-flex mt-3">

                    <input type="text" name="" id="" class="form-control bg-transparent text-white w-50 me-4"
                        placeholder="Search By Name" onkeyup="getMealByName(this.value)">

                    <input type="text" name="" id="" class="form-control bg-transparent text-white w-50"
                        placeholder="Search By First Letter" onkeyup="getMealByLetter(this.value)">
                </div>
                
            </div>`

    document.querySelector('#rowMeal').innerHTML = '';

}


let MealByName = []

function getMealByName(query) {

    var request = new XMLHttpRequest;

    request.open("get", `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    request.send();

    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            MealByName = JSON.parse(request.response).meals

            // console.log(MealByName)

            loading()

            displaySearchMeal(MealByName)


        }
    })


}


let MealByLetter = []

function getMealByLetter(query) {

    // console.log(query)

    var request = new XMLHttpRequest;

    request.open("get", `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);

    request.send();

    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            MealByLetter = JSON.parse(request.response).meals

            // console.log(MealByLetter)

            loading()

            displaySearchMeal(MealByLetter)
        }
    })


}


function displaySearchMeal(arr) {

    let cartoona = "";

    if (arr.length > 20) {

        for (let i = 0; i < 20; i++) {

            cartoona = cartoona + `<div class="col-md-3">

                <div class="mainMeal position-relative overflow-hidden" onclick=" loading() ; getRecepie(${arr[i].idMeal})">

                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">

                    <div class="bg-mainMeal d-flex align-items-center p-2 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>

                </div>


            </div>`
        }

    }
    else {

        for (let i = 0; i < arr.length; i++) {

            cartoona = cartoona + `<div class="col-md-3">

                <div class="mainMeal position-relative overflow-hidden" onclick=" loading() ; getRecepie(${arr[i].idMeal})">

                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">

                    <div class="bg-mainMeal d-flex align-items-center p-2 text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>

                </div>


            </div>`
        }

    }




    document.querySelector('#rowMeal').innerHTML = cartoona;


}


/* all categories page */

let mealCategories = []

function getMealCategories() {

    var request = new XMLHttpRequest;

    request.open("get", "https://www.themealdb.com/api/json/v1/1/categories.php");

    request.send();


    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            mealCategories = JSON.parse(request.response).categories

            // console.log(mealCategories)


        }

        displayMealCategories()
    })

}

function displayMealCategories() {


    document.querySelector('.searchContainer').innerHTML = '';

    let cartoona = "";


    for (let i = 0; i < mealCategories.length; i++) {

        cartoona = cartoona + `<div class="col-md-3">

    <div class="mainMeal position-relative overflow-hidden" onclick=" loading(); getSameCategoryMeals('${mealCategories[i].strCategory}')">

                    <img class="w-100" src="${mealCategories[i].strCategoryThumb}" alt="">

                    <div class="bg-mainMeal p-2 text-black text-center">
                        <h3>${mealCategories[i].strCategory}</h3>
                        <p>${mealCategories[i].strCategoryDescription}</p>
                    </div>

                </div>


            </div>`
    }

    document.querySelector('#rowMeal').innerHTML = cartoona;


}


/* one category page */


let mealsSameCategory = []


function getSameCategoryMeals(Category) {

    var request = new XMLHttpRequest;

    request.open("get", `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);

    request.send();


    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            mealsSameCategory = JSON.parse(request.response).meals

            // console.log(mealsSameCategory)


        }

        displayMain(mealsSameCategory)
    })

}



/* area page */

let mealAreas = []

function getMealAreas() {

    var request = new XMLHttpRequest;

    request.open("get", "https://www.themealdb.com/api/json/v1/1/list.php?a=list");

    request.send();


    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            mealAreas = JSON.parse(request.response).meals

            // console.log(mealAreas)


        }

        displayMealAreas()
    })

}

function displayMealAreas() {

    document.querySelector('.searchContainer').innerHTML = '';

    let cartoona = "";


    for (let i = 0; i < mealAreas.length; i++) {

        cartoona = cartoona + `<div class="col-md-3 pb-2">

                    <div onclick=" loading() ; getSameAreaMeals('${mealAreas[i].strArea}')" class="text-center">

                        <i class="fa-solid fa-house fs-1"></i>

                        <h3>${mealAreas[i].strArea}</h3>

                    </div>               
                    </div>`
    }

    document.querySelector('#rowMeal').innerHTML = cartoona;

}


let mealsSameArea = []

function getSameAreaMeals(area) {

    var request = new XMLHttpRequest;

    request.open("get", `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);

    request.send();


    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            mealsSameArea = JSON.parse(request.response).meals

            // console.log(mealsSameArea)


        }


        displayMain(mealsSameArea)

    })

}


/* ingredients page */

let mealIngredients = []

function getMealIngredients() {

    var request = new XMLHttpRequest;

    request.open("get", "https://www.themealdb.com/api/json/v1/1/list.php?i=list");

    request.send();


    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            mealIngredients = JSON.parse(request.response).meals

            // console.log(mealIngredients)
        }

        displayMealIngredients()

    })

}


function displayMealIngredients() {

    document.querySelector('.searchContainer').innerHTML = '';



    let cartoona = "";

    for (let i = 0; i < 20; i++) {

        cartoona = cartoona + ` <div class="col-md-3">

                    <div onclick="getSameMealIngredients('${mealIngredients[i].strIngredient}')" class="text-center">
                        <i class="fa-solid fa-bowl-rice fs-1 pb-1"></i>
                        <h3>${mealIngredients[i].strIngredient}</h3>
                        <p>${mealIngredients[i].strDescription.substr(0, 100)}</p>
                    </div>

                    </div>`
    }

    document.querySelector('#rowMeal').innerHTML = cartoona;

}

let sameMealIngredients = []

function getSameMealIngredients(ingredient) {


    var request = new XMLHttpRequest;

    request.open("get", `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

    request.send();


    request.addEventListener("loadend", function () {

        if (request.status == 200) {

            sameMealIngredients = JSON.parse(request.response).meals

            loading();

            displayMain(sameMealIngredients)

        }



    })
}



/* contact page */

function displayContact() {

    document.querySelector('#rowMeal').innerHTML = `<div class=" d-flex justify-content-center align-items-center vh-100">


                <div class="container w-75 text-center">
                
                    <div class="row g-4">
                
                        <div class="col-md-6">
                
                            <input id="uName" onkeyup="validationName(this.value)" type="text" class="form-control"
                                placeholder="Enter Your Name">
                            <div id="alertName" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                
                        <div class="col-md-6">
                            <input id="uEmail" onkeyup="validationEmail(this.value)" type="email" class="form-control "
                                placeholder="Enter Your Email">
                            <div id="alertEmail" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid example@yyy.zzz
                            </div>
                        </div>

                        <div class="col-md-6">
                            <input id="uPhone" onkeyup="validationPhone(this.value)" type="text" class="form-control "
                                placeholder="Enter Your Phone">
                            <div id="alertPhone" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>

                        <div class="col-md-6">
                            <input id="uAge" onkeyup="validationAge(this.value)" type="number" class="form-control "
                                placeholder="Enter Your Age">
                            <div id="alertAge" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age (10 to 99)
                            </div>
                        </div>

                        <div class="col-md-6">
                            <input id="upassword" onkeyup="validationPw(this.value)" type="password" class="form-control "
                                placeholder="Enter Your Password">
                            <div id="alertPassword" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password (Minimum eight characters, at least one letter and one number)
                            </div>
                        </div>

                        <div class="col-md-6">
                            <input id="uRepassword" onkeyup="validationRePw(this.value)" type="password" class="form-control "
                                placeholder="Repassword">
                            <div id="alertRepassword" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid repassword
                            </div>
                        </div>

                    </div>

                    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>

                </div>


            </div>`;


}

let nameTest

function validationName(name) {

    let nameRegx = /^[a-z]{3,10}$/i

    nameTest = nameRegx.test(name)

    // console.log(nameTest)


    if (nameTest == false) {

        document.querySelector('#alertName').classList.replace('d-none', 'd-block')

    } else {

        document.querySelector('#alertName').classList.replace('d-block', 'd-none')

    }
    enableButton()

}

let emailTest = ''

function validationEmail(email) {

    let emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    emailTest = emailRegx.test(email)

    // console.log(emailTest)


    if (emailTest == false) {

        document.querySelector('#alertEmail').classList.replace('d-none', 'd-block')

    } else {

        document.querySelector('#alertEmail').classList.replace('d-block', 'd-none')

    }

    enableButton()
}

let phoneTest = ''

function validationPhone(phone) {

    let phoneRegx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g

    phoneTest = phoneRegx.test(phone)

    // console.log(phoneTest)


    if (phoneTest == false) {

        document.querySelector('#alertPhone').classList.replace('d-none', 'd-block')

    } else {

        document.querySelector('#alertPhone').classList.replace('d-block', 'd-none')

    }

    enableButton()

}

let ageTest = ''

function validationAge(Age) {

    let ageRegx = /^([1-9][0-9])$/

    ageTest = ageRegx.test(Age)

    // console.log(ageTest)


    if (ageTest == false) {

        document.querySelector('#alertAge').classList.replace('d-none', 'd-block')

    } else {

        document.querySelector('#alertAge').classList.replace('d-block', 'd-none')

    }

    enableButton()

}

let passwordTest = ''

function validationPw(password) {

    let passwordRegx = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

    passwordTest = passwordRegx.test(password)

    // console.log(passwordTest)


    if (passwordTest == false) {

        document.querySelector('#alertPassword').classList.replace('d-none', 'd-block')

    } else {

        document.querySelector('#alertPassword').classList.replace('d-block', 'd-none')

    }

    enableButton()

}

let rePasswordTest = ''

function validationRePw(rePassword) {


    if (rePassword == document.querySelector('#upassword').value) {

        document.querySelector('#alertRepassword').classList.replace('d-block', 'd-none')

        rePasswordTest = true



    } else {

        document.querySelector('#alertRepassword').classList.replace('d-none', 'd-block')

        rePasswordTest = false



    }

    enableButton()
}


function enableButton() {

    if (nameTest == true && emailTest == true && ageTest == true && passwordTest == true && rePasswordTest == true) {

        $('#submitBtn').removeAttr("disabled")


    } else {

        $('#submitBtn').attr("disabled", "true")



    }
}



