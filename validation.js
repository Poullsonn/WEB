
document.addEventListener("DOMContentLoaded", function () { 
    var form = document.getElementById("bmiForm"); 
 
    form.addEventListener("submit", function (event) { 
        event.preventDefault(); 
 
        var age = document.getElementsByName("age")[0].value; 
        var weight = document.getElementsByName("weight")[0].value; 
        var height = document.getElementsByName("height")[0].value; 
        var gender = document.getElementsByName("gender")[0].value; 
        var units = document.getElementsByName("units")[0].value; 
        $.ajax({ 
            type: 'POST', 
            url: '/bmicalculator', 
            data: { age, weight, height, gender, units }, 
            success: function(response) { 
                var responseData = JSON.parse(response); 
                displayResult(responseData.bmi, responseData.interpretation); 
            }, 
            error: function(response) { 
                console.error('Error:', response); 
                updateResult("Error calculating BMI."); 
            } 
        }); 
    }); 
    function displayResult(bmiValue, interpretation) { 
        let resultDiv = document.getElementById('result'); 
        resultDiv.innerHTML = <h4>Your BMI: ${bmiValue}, you are: ${interpretation}</h4>; 
    } 
    function updateResult(message) { 
        let resultDiv = document.getElementById('result'); 
        resultDiv.innerHTML = <h4>${message}</h4>; 
    }     
});