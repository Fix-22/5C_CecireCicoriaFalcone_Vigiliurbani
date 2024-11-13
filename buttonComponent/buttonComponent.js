export const buttonComponent = (parentElement) => {
    let nome ;
    let callback ;

    return {
        build : function(label) {
            nome = label ;
        },
        onsubmit : function(inputCallback) {
            callback = inputCallback ;
        },
        render : function() {
            let html = '<button type="button" id="' + nome + '" class="btn btn-info text-white actionButton ' + nome + '">' + nome + '</button>' ;

            parentElement.innerHTML = html ;

            let e = document.getElementById(nome) ;
            
            e.onclick = () => {
                callback() ;
            }
        }
    }
};