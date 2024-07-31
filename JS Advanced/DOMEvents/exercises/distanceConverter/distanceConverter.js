function attachEventsListeners() {
    
    let btn = document.querySelector('#convert');
    
    let conversionRatesFromMeter = {
        km:1000,
        m:1,
        cm:0.01,
        mm:0.001,
        mi:1609.34,
        yrd:0.9144,
        ft:0.3048,
        in:0.0254,
    }
    btn.addEventListener('click', function(){
        
        let num1 = document.querySelector('#inputDistance');
        let output = document.querySelector('#outputDistance');
    
        let inputUnits = document.querySelector('#inputUnits');
        let outputUnits = document.querySelector('#outputUnits');
 
        let convertInput = inputUnits[inputUnits.selectedIndex].value;
        let convertOutput = outputUnits[outputUnits.selectedIndex].value;
    
        
        let valueInMeters = num1.value * conversionRatesFromMeter[convertInput];
        let convertedValue = valueInMeters / conversionRatesFromMeter[convertOutput];
        output.value = convertedValue;
        
    });
}