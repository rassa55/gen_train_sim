    let formCount = 1;
        const maxForms = 3;
        const formContainer = document.getElementById('form-container');
        const addFormButton = document.getElementById('add-form');
        const submitAllButton = document.getElementById('submit_all');

        function createForm(handsSelected = false) {
            if (formCount < maxForms) {
                const formId = `form-${formCount + 1}`;
                const newForm = document.createElement('form');
                newForm.id = formId;
                newForm.innerHTML = `
                    <input type="hidden" name="type_form" value="${formId}">
                    <div class="form-group">
                        <label for="muscles-${formCount + 1}">Группа мышц</label>
                        <select id="muscles-${formCount + 1}" class="form-control" disabled>
                            <option value="">Выберите группу мышц</option>
                        </select>
                    </div>
                    <div id="hands-options-${formCount + 1}" class="form-group" style="display: none">
                        <label for="hands-parts-${formCount + 1}">Часть рук</label>
                        <select id="hands-parts-${formCount + 1}" class="form-control">
                            <option value="">Выберите часть рук</option>
                            <option value="biceps">Бицепс</option>
                            <option value="triceps">Трицепс</option>
                            <!-- Добавьте другие опции для рук -->
                        </select>
                    </div>
                `;
                formContainer.appendChild(newForm);
                formCount++;
            }
        }

        // Обработчик для кнопки "Еще"
        addFormButton.addEventListener('click', function() {
            const firstFormMusclesSelect = document.getElementById('muscles-1');
            const firstFormHandsOptions = document.getElementById('hands-options-1');
            const firstFormMusclesValue = firstFormMusclesSelect.value;

            if (firstFormMusclesValue !== 'hands') {
                createForm();
            } else {
                const firstFormHandsSelect = document.getElementById('hands-parts-1');
                const firstFormHandsValue = firstFormHandsSelect.value;
                createForm(true);

                // Блокируем выбор рук в других формах
                const newForm = document.getElementById(`form-${formCount}`);
                const newMusclesSelect = newForm.querySelector(`#muscles-${formCount + 1}`);
                const newHandsOptions = newForm.querySelector(`#hands-options-${formCount + 1}`);
                newMusclesSelect.disabled = true;
                newHandsOptions.style.display = "block";

                // Если руки выбраны в первой форме, блокируем выбор рук во всех других формах
                const allForms = document.querySelectorAll('form');
                allForms.forEach(form => {
                    if (form.id !== newForm.id) {
                        const musclesSelect = form.querySelector('select');
                        const handsOptions = form.querySelector('.form-group:last-child');
                        musclesSelect.value = '';
                        musclesSelect.disabled = true;
                        handsOptions.style.display = 'none';
                    }
                });

                // Если в первой форме выбрана часть рук, блокируем ее выбор во всех формах
                if (firstFormHandsValue) {
                    const newHandsSelect = newForm.querySelector(`#hands-parts-${formCount + 1}`);
                    newHandsSelect.value = firstFormHandsValue;
                    newHandsSelect.disabled = true;
                }
            }
        });