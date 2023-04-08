function renderLoading(isLoading, btn, previousTextContent) {
    if (isLoading) {
        btn.textContent = 'Сохранение...';
    } else {
        btn.textContent = previousTextContent;
    }
}

export {renderLoading};