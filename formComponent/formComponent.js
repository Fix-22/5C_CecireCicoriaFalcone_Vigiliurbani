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
                    <label class="input-group-text">Via</label>
                    <input type="text" id="streetInput" class="form-control" />
                </div>

                <div class="row">
                    <label class="input-group-text">Data e Ora</label>
                    <input type="datetime-local" id="datetimeInput" class="form-control" />
                </div>

                <div class="row">
                    <label class="input-group-text">Targa 1</label>
                    <input type="text" id="plate1Input" class="form-control" />
                </div>

                <div class="row">
                    <label class="input-group-text">Targa 2</label>
                    <input type="text" id="plate2Input" class="form-control" />
                </div>

                <div class="row">
                    <label class="input-group-text">Targa 3</label>
                    <input type="text" id="plate3Input" class="form-control" />
                    </div>
                </div>

                <div class="row">
                    <label class="input-group-text">Morti</label>
                    <input type="text" id="deathsInput" class="form-control" />
                </div>
                
                <div class="row">
                    <label class="input-group-text">Feriti</label>
                    <input type="text" id="injuredInput" class="form-control" />
                </div>
            </form>` ;
            parentElement.innerHTML = html ;
        },
        getInputData : function() {
            let newAddress = document.getElementById("streetInput").value + ", milano" ;
            let newDatetime = document.getElementById("datetimeInput").value ;
            let newPlate1 = document.getElementById("plate1Input").value ;
            let newPlate2 = document.getElementById("plate2Input").value ;
            let newPlate3 = document.getElementById("plate3Input").value ;
            let newPlates = [newPlate1, newPlate2, newPlate3] ;
            let newDeaths = document.getElementById("deathsInput").value ;
            let newInjured = document.getElementById("injuredInput").value ;

            streetInput.value = "" ;
            newDatetime.value = "" ;
            newPlate1.value = "" ;
            newPlate2.value = "" ;
            newPlate3.value = "" ;
            newDeaths.value = "" ;
            newInjured.value = "" ; 

            return {
                address: newAddress,
                date: newDatetime,
                plates: newPlates,
                deaths: newDeaths,
                injured: newInjured
            }
        }
    }
};