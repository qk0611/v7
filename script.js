document.addEventListener('DOMContentLoaded', function() {
    const tenderForm = document.getElementById('tender-form');
    const clientForm = document.getElementById('client-form');
    const publishedTendersList = document.getElementById('published-tenders-list');

    tenderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const tender = {
            quantity: document.getElementById('quantity').value,
            product: document.getElementById('product').value,
            priceDuration: document.getElementById('priceDuration').value,
            currency: document.getElementById('currency').value,
            description: document.getElementById('description').value,
            endDate: document.getElementById('endDate').value,
            media: document.getElementById('media').files[0] ? URL.createObjectURL(document.getElementById('media').files[0]) : null,
            mediaType: document.getElementById('media').files[0] ? document.getElementById('media').files[0].type : null
        };

        let tenders = JSON.parse(localStorage.getItem('tenders')) || [];
        tenders.push(tender);
        localStorage.setItem('tenders', JSON.stringify(tenders));

        addTenderToList(tender);
        tenderForm.reset();
    });

    clientForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const clientTender = {
            product: document.getElementById('client-product').value,
            priceDuration: document.getElementById('client-price').value,
            currency: document.getElementById('client-currency').value,
            description: document.getElementById('client-description').value,
            endDate: document.getElementById('client-endDate').value,
        };

        let tenders = JSON.parse(localStorage.getItem('tenders')) || [];
        tenders.push(clientTender);
        localStorage.setItem('tenders', JSON.stringify(tenders));

        addTenderToList(clientTender);
        clientForm.reset();
    });

    function addTenderToList(tender) {
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
        publishedTendersList.appendChild(tenderItem);
    }

    const tenders = JSON.parse(localStorage.getItem('tenders')) || [];
    tenders.forEach(addTenderToList);
});
