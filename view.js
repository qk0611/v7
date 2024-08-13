document.addEventListener('DOMContentLoaded', function() {
    const tendersList = document.getElementById('tenders-list');
    const suppliersList = document.getElementById('suppliers-list');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const tenders = JSON.parse(localStorage.getItem('tenders')) || [];

    function displayTenders(filteredTenders) {
        tendersList.innerHTML = ''; // Очистить список перед отображением
        filteredTenders.forEach(tender => {
            const tenderItem = document.createElement('li');
            tenderItem.innerHTML = `
                <h3>Товар: ${tender.product}</h3>
                <p><strong>Количество:</strong> ${tender.quantity || 'Не указано'}</p>
                <p><strong>Цена:</strong> ${tender.priceDuration} ${tender.currency}</p>
                <p><strong>Описание:</strong> ${tender.description}</p>
                <p><strong>Срок:</strong> ${tender.endDate}</p>
                ${tender.mediaType && tender.mediaType.startsWith('image/') ? 
                    `<img src="${tender.media}" alt="Тендер Фото" style="max-width: 100%; height: auto;">` :
                    tender.mediaType && tender.mediaType.startsWith('video/') ? 
                    `<video controls style="max-width: 100%; height: auto;">
                        <source src="${tender.media}" type="${tender.mediaType}">
                        Ваш браузер не поддерживает видео.
                    </video>` : ''}
            `;
            tendersList.appendChild(tenderItem);
        });
    }

    // Показать все тендеры при загрузке страницы
    displayTenders(tenders);

    // Фильтрация тендеров при нажатии на кнопку поиска
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        const filteredTenders = tenders.filter(tender => 
            tender.product.toLowerCase().includes(query) ||
            tender.description.toLowerCase().includes(query)
        );
        displayTenders(filteredTenders);
    });

    // Добавим данные для поставщиков (пример)
    const suppliers = [
        { name: "Поставщик 1", description: "Описание поставщика 1" },
        { name: "Поставщик 2", description: "Описание поставщика 2" }
    ];

    suppliers.forEach(supplier => {
        const supplierItem = document.createElement('li');
        supplierItem.innerHTML = `
            <h3>${supplier.name}</h3>
            <p>${supplier.description}</p>
        `;
        suppliersList.appendChild(supplierItem);
    });
});
