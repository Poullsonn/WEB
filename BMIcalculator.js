const express = require('express'); 
const bodyparser = require('body-parser'); 
const port = 3000; 
const app = express(); 
 
app.use(bodyparser.urlencoded({extended:true})); 
 
app.get("/", function (req, res) { 
    res.sendFile(__dirname+"/index.html");  
}); 
 
 
app.post("/bmicalculator", function (req, res) { 
    var weight = Number(req.body.weight); 
    var height = Number(req.body.height); 
    var age = Number(req.body.age); 
    var gender = req.body.gender; 
    var units = req.body.units; 
 
    let errors = {}; 
 
    if (isNaN(weight) || weight <= 0) { 
        errors.weight = 'Invalid weight.'; 
    } 
    if (isNaN(height) || height <= 0) { 
        errors.height = 'Invalid height.'; 
    } 
    if (isNaN(age) || age <= 0) { 
        errors.age = 'Invalid age.'; 
    } 
    if (Object.keys(errors).length > 0) { 
        return res.status(400).json({ errors }); 
    } 
     
    var bmi; 
    if (units !== 'imperial') { 
        bmi = (weight / (height/100 * height/100)).toFixed(2); 
    } else{ 
        weight *= 2.2046;  
        height /= 2.54;   
        bmi = 703 * (weight/(height*height)).toFixed(2); 
    } 
    let interpretation = ''; 
    if (age > 20) { 
        if (bmi < 16) 
            interpretation = "Severe Thinness"; 
        else if (bmi == 16 || bmi == 17) 
            interpretation = "Moderate Thinness"; 
        else if (bmi >= 17 && bmi < 18.5) 
            interpretation = "Mild Thinness"; 
        else if (bmi < 25) 
            interpretation = "Normal"; 
        else if (bmi < 30) 
            interpretation = "Overweight"; 
        else if (bmi < 35)  
            interpretation = "Obese Class I"; 
        else if (bmi < 40) 
            interpretation = "Obese Class II"; 
        else 
            interpretation = "Obese Class III"; 
    } 
    else { 
        if (bmi < 18.5) { 
            interpretation = 'Underweight'; 
        } else if (bmi >= 18.5 && bmi <= 24.9) { 
            interpretation = 'Normal weight'; 
        } else if (bmi >= 25 && bmi <= 29.9) { 
            interpretation = 'Overweight'; 
        } else if(bmi >= 30 && bmi <= 34.9){ 
            interpretation = 'Obesity'; 
        } else{ 
            interpretation = "Severe obesity"; 
        } 
    } 
    res.send("Your bmi is: " + bmi + " " + interpretation); 
}); 
 
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});