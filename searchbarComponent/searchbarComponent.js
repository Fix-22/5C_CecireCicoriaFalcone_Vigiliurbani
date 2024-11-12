export const generateSearchbar = (parentElement) => {
    let placeholder;
    let searchCallback, cancelCallback;

    return {
        build: (inputPlaceholder) => {
            placeholder = inputPlaceholder;
        },
        onsearch: (inputSearchCallback) => {
            searchCallback = inputSearchCallback;
        },
        oncancel: (inputCancelCallback) => {
            cancelCallback = inputCancelCallback;
        },
        render: () => {
            let HTML = '<div class="input-group mb-3"><input type="text" class="form-control" placeholder="' + placeholder + '" id="searchText"><button type="button" class="btn btn-primary" id="searchButton"><i class="bi bi-search"></i></button><button type="button" class="btn btn-danger" id="cancelButton"><i class="bi bi-x-lg"></i></button></div>';

            parentElement.innerHTML = HTML;
            
            document.getElementById("searchButton").onclick = () => {
                let searchText = document.getElementById("searchText").value;
                searchCallback(searchText);
            };

            document.getElementById("cancelButton").onclick = () => {
                cancelCallback();
            };
        }
    };
};