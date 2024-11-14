export const generateForm = (parentElement) => {
    let callback  ;

    return {
        build : function() {
        },
        onsubmit : function(inputCallback) {
            callback = inputCallback ;
        },
        render : function() {
            let html = `<form id="accidentForm" class="container">
                <div class="row">
                    <label>Via</label>
                    <input type="text" id="streetInput" class="form-control" />
                </div>

                <div class="row">
                    <label>Data e Ora</label>
                    <input type="datetime-local" id="datetimeInput" class="form-control" />
                </div>

                <div class="row">
                    <label>Targa 1</label>
                    <input type="text" id="plate1Input" class="form-control" />
                </div>

                <div class="row">
                    <label>Targa 2</label>
                    <input type="text" id="plate2Input" class="form-control" />
                </div>

                <div class="row">
                    <label>Targa 3</label>
                    <input type="text" id="plate3Input" class="form-control" />
                    </div>
                </div>

                <div class="row">
                    <label>Morti</label>
                    <input type="number" id="deathsInput" class="form-control" />
                </div>
                
                <div class="row">
                    <label>Feriti</label>
                    <input type="number" id="injuredInput" class="form-control" />
                </div>

                <div class="row">
                    <label id="resultLabel" class="text-danger"></label>
                </div>
            </form>` ;
            parentElement.innerHTML = html ;

            let newAddress = document.getElementById("streetInput") ;
            let newDatetime = document.getElementById("datetimeInput") ;
            let newPlate1 = document.getElementById("plate1Input") ;
            let newPlate2 = document.getElementById("plate2Input") ;
            let newPlate3 = document.getElementById("plate3Input") ;
            let newPlates = [] ;
            let newDeaths = document.getElementById("deathsInput") ;
            let newInjured = document.getElementById("injuredInput") ;

            document.querySelectorAll(".clearForm").forEach(b => {
                b.onclick = () => {
                    if (b.id === "submitButton") {                        
                        if (newPlate1.value && newPlates.indexOf(newPlate1.value) === -1) newPlates.push(newPlate1.value)
                        if (newPlate2.value && newPlates.indexOf(newPlate2.value) === -1) newPlates.push(newPlate2.value)
                        if (newPlate3.value && newPlates.indexOf(newPlate3.value) === -1) newPlates.push(newPlate3.value)

                        let accident = {} ;
                        accident.address = newAddress.value + ", milano" ;
                        accident.dateTime = newDatetime.value;
                        accident.plates = newPlates ;
                        accident.injured =  newInjured.value ;
                        accident.deaths = newDeaths.value ;
                        
                        callback(accident);    
                    }
                    else {
                        newAddress.value = "" ;
                        newDatetime.value = "" ;
                        newPlate1.value = "" ;
                        newPlate2.value = "" ;
                        newPlate3.value = "" ;
                        newDeaths.value = "" ;
                        newInjured.value = "" ;
                    }
                };
            })
        },
        clear: () => {
            newAddress.value = "" ;
            newDatetime.value = "" ;
            newPlate1.value = "" ;
            newPlate2.value = "" ;
            newPlate3.value = "" ;
            newDeaths.value = "" ;
            newInjured.value = "" ;
            document.getElementById("resultLabel").innerText = "";
        },
        setError: (error) => {
            document.getElementById("resultLabel").innerText = error;
        }
    }
};