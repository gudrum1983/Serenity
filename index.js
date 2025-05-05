function applyBlurOnScroll(id, selector) {
    const element = document.getElementById(id);
    if (!element) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            element.classList.add(selector);
        } else {
            element.classList.remove(selector);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyBlurOnScroll('header', 'Header_type_scrolled');
});

const highlightAnchors = ['Comfort', 'Spaciousness', 'Prestige'];

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();

        const yOffset = window.innerHeight / 2 - target.offsetHeight / 2;
        const targetY = target.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: targetY - yOffset,
            behavior: 'smooth'
        });

        console.log(id);


        // Подсвечиваем только нужные якоря
        if (highlightAnchors.includes(id)) {
            target.classList.add('ListPromo-Item_highlighted');

            setTimeout(() => {
                target.classList.remove('ListPromo-Item_highlighted');
            }, 3000);
        }

        if (id === "schedule") {
            target.classList.add('Schedule_highlighted');

            // Установить фокус на поле "Name"
            const nameInput = document.getElementById('Name');
            if (nameInput) {
                // Ждём окончания прокрутки, прежде чем установить фокус
                setTimeout(() => {
                    nameInput.focus();
                }, 600); // должен совпадать с behavior: 'smooth' (~500–700мс)
            }

            setTimeout(() => {
                target.classList.remove('Schedule_highlighted');
            }, 3000);
        }



    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.Schedule-Form');
    const submitButton = form.querySelector('.Schedule-Submit');

    function validateForm() {
        const { Name, Email, checkbox } = form.elements;

        const isNameFilled = Name.value.trim() !== '';
        const isEmailFilled = Email.value.trim() !== '';
        const isChecked = checkbox.checked;

        submitButton.disabled = !(isNameFilled && isEmailFilled && isChecked);
    }

    // Слушаем изменения всех нужных полей
    form.elements.Name.addEventListener('input', validateForm);
    form.elements.Email.addEventListener('input', validateForm);
    form.elements.checkbox.addEventListener('change', validateForm);

    // Первичная проверка
    validateForm();

    // Обработка отправки формы
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // отменяем перезагрузку

        const { Name, Email, checkbox } = form.elements;

        alert(`Пользователь с Именем: ${Name.value.trim()}\n
        и Email: ${Email.value.trim()} установил чекбокс в значение ${checkbox.value.trim()}`);

        // Необязательно: очистка формы и деактивация кнопки
        // form.reset();
        // validateForm();
    });
});
