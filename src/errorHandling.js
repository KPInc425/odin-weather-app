import { hideLoadingWidget } from "./helperFunctions";

function errorHandler(error) {
    const alertContainer = document.querySelector('#alertContainer');
    const alertMessage = document.querySelector('#alertMessage');
    if (alertContainer.classList.contains('hidden')) {
        alertMessage.textContent = `ERROR(${error.code}): ${error.message}`;
        alertContainer.classList.remove('hidden');
        console.warn(`ERROR(${error.code}): ${error.message}`);
    }
    hideLoadingWidget();
    // alert(`ERROR(${error.code}): ${error.message}`);
}

export {
    errorHandler,
}