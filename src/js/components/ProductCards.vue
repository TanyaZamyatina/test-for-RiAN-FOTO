<template>
    <main>
        <div class="column column1" droppable="true" @dragover="onDragOver" @drop="onDrop2">
            <div class="sort">
                <button class="btnSort" @click="sortProducts('column1')">Сортировать по рейтингу</button>
                <button class="btnSort" @click="addNewElement()">Создать новую</button>
                <div class="products" v-if="add">
                    <input v-model.trim="text1" type="text" placeholder="Введите category">
                    <input v-model.trim="text2" type="text" placeholder="Введите title">
                    <input v-model.trim="text3" type="text" placeholder="Введите url image">
                    <div class="rating">
                        <input v-model.trim="text4" type="text" placeholder="Введите count">
                        <input v-model.trim="text5" type="text" placeholder="Введите rate">
                    </div>
                    <input v-model.trim="text6" type="text" placeholder="Введите description">
                    <input v-model.trim="text7" type="text" placeholder="Введите price">
                    <h2 class="warning">Для добавления карточки необходимо заполнить все поля!</h2>
                    <div class="btn">
                        <button class="btn" @click="save()">OK</button>
                    </div>
                </div>
            </div>
            <div v-if="!editing" >
                <div class="products" v-for="el in products" :key="el.id" draggable="true" @dragstart="onDragStart(el)">
                    <h2>{{ el.category }}</h2>
                    <h3>{{ el.title }}</h3>
                    <img class="img" :src="el.image" :alt="el.title">
                    <div class="rating">
                        <span>count: {{ el.rating.count }}</span>
                        <span>rate: {{ el.rating.rate }}</span>
                    </div>
                    <p>{{ el.description }}</p>
                    <p>{{ el.price }}</p>
                    <div class="btn">
                        <button @click="removeEl(el, 'column1')">Удалить</button>
                        <button @click="editEl(el, 'column1')">Редактировать</button>
                    </div>
                </div>
            </div>
            <div v-if="editing" >
                <div class="products" v-for="el in products" :key="el.id">
                    <input v-model="el.category" type="text" placeholder="Введите изменения">
                    <input v-model="el.title" type="text" placeholder="Введите изменения">
                    <img class="img" :src="el.image" :alt="el.title">
                    <div class="rating">
                        <input v-model="el.rating.count" type="text" placeholder="Введите изменения">
                        <input v-model="el.rating.rate" type="text" placeholder="Введите изменения">
                    </div>
                    <input v-model="el.description" type="text" placeholder="Введите изменения">
                    <input v-model="el.price" type="text" placeholder="Введите низменения">
                    <div class="btn">
                        <button class="btn" @click="saveChanges('column1')">OK</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="column column2" droppable="true" @dragover="onDragOver" @drop="onDrop">
            <div class="sort">
                <button class="btnSort" @click="sortProducts('column2')">Сортировать по рейтингу</button>
            </div>
            <div v-if="!editing2" >
                <div class="products productsColumn2" v-for="el in productsColumn2" :key="el.id" draggable="true" @dragstart="onDragStart(el)">
                    <h2>{{ el.category }}</h2>
                    <h3>{{ el.title }}</h3>
                    <img class="img" :src="el.image" :alt="el.title">
                    <div class="rating">
                        <span>count: {{ el.rating.count }}</span>
                        <span>rate: {{ el.rating.rate }}</span>
                    </div>
                    <p>{{ el.description }}</p>
                    <p>{{ el.price }}</p>
                    <div class="btn">
                        <button @click="removeEl(el,'column2')">Удалить</button>
                        <button @click="editEl(el,'column2')">Редактировать</button>
                    </div>
                </div>
            </div>
            <div v-if="editing2" >
                <div class="products productsColumn2" v-for="el in productsColumn2" :key="el.id">
                    <input v-model="el.category" type="text" placeholder="Введите изменения">
                    <input v-model="el.title" type="text" placeholder="Введите изменения">
                    <img class="img" :src="el.image" :alt="el.title">
                    <div class="rating">
                        <input v-model="el.rating.count" type="text" placeholder="Введите изменения">
                        <input v-model="el.rating.rate" type="text" placeholder="Введите изменения">
                    </div>
                    <input v-model="el.description" type="text" placeholder="Введите изменения">
                    <input v-model="el.price" type="text" placeholder="Введите низменения">
                    <div class="btn">
                        <button class="btn" @click="saveChanges('column2')">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
           urlProducts: "https://fakestoreapi.com/products",
           products: [],
           errors: [],
           editing: false,
           editing2: false,
           newText: "",
           newText2: "",
           productsColumn2: [],
           add: false,
           newElement: [],
           text1: "",
           text2: "",
           text3: "",
           text4: "",
           text5: "",
           text6: "",
           text7: "",
        }
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        async getProducts() {
            try {
                // Отправляем запрос на получение продуктов с помощью API
                let response = await fetch(this.urlProducts)
                // Преобразуем полученные данные в формат JSON
                let result = await response.json()
                // Добавляем полученные продукты в массив products
                this.products.push(...result)
            } catch (error) {
                // Если возникает ошибка, добавляем ее в массив errors
                this.errors.push(error)
            }
        },
        removeEl(el, column) {
            // Проверяем, по какой колонке нужно выполнить сортировку
            if (column === "column1") {
                // Удаляем необходимые элементы из массива products
                this.products.splice(el, 1);
            } else if (column === "column2") {
                // Удаляем необходимые элементы из массива productsColumn2
                this.productsColumn2.splice(el, 1);
            }
        },
        editEl(el, column) {
            // Проверяем, по какой колонке нужно выполнить сортировку
            if (column === "column1") {
                // Устанавливаем значение newText в выбранный элемент для редактирования
                this.newText = el;
                // Меняем значение переменной editing на true для переключения в режим редактирования
                this.editing = true;
            } else if (column === "column2") {
                // Устанавливаем значение newText2 в выбранный элемент для редактирования
                this.newText2 = el;
                // Меняем значение переменной editing на true для переключения в режим редактирования
                this.editing2 = true;
            }
        },
        saveChanges(column) {
            // Проверяем, по какой колонке нужно выполнить сортировку
            if (column === "column1") {
                // Меняем значение переменной editing на false для переключения в режим просмотра
                this.editing = false;
            } else if (column === "column2") {
                // Меняем значение переменной editing2 на false для переключения в режим просмотра
                this.editing2 = false;
            }
        },
        sortProducts(column) {
            // Проверяем, по какой колонке нужно выполнить сортировку
            if (column === "column1") {
                // Сортируем массив products по убыванию рейтинга
                this.products.sort((a, b) => b.rating.rate - a.rating.rate);
            } else if (column === "column2") {
                // Сортируем массив productsColumn2 по убыванию рейтинга
                this.productsColumn2.sort((a, b) => b.rating.rate - a.rating.rate);
            }
        },
        onDragStart(item) {
            // Сохраняем данные перетаскиваемого элемента в формате JSON
            event.dataTransfer.setData("text/plain", JSON.stringify(item));
        },
        onDragOver(event) {
            // Предотвращаем стандартное поведение браузера
            event.preventDefault();
        },
        onDrop(event) {
            // Получаем данные перетаскиваемого элемента
            const item = JSON.parse(event.dataTransfer.getData("text/plain"));
            // Добавляем элемент в массив товаров колонки column2
            this.productsColumn2.push(item);
            // Удаляем элемент из массива товаров колонки column1
            const index = this.products.findIndex((el) => el.id === item.id);
            if (index > -1) {
                this.products.splice(index, 1);
            }
        },
        onDrop2(event) {
            // Получаем данные перетаскиваемого элемента
            const item = JSON.parse(event.dataTransfer.getData("text/plain"));
            // Добавляем элемент в массив товаров колонки column1
            this.products.push(item);
            // Удаляем элемент из массива товаров колонки column2
            const index = this.productsColumn2.findIndex((el) => el.id === item.id);
            if (index > -1) {
                this.productsColumn2.splice(index, 1);
            }
        },
        addNewElement() {
            // Меняем значение переменной add на true для переключения в режим добавления карточки
            this.add = true;
        },
        generateUniqueId() {
            // Генерация уникального идентификатора
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },  
        save() {
            // Создание нового элемента с заполненными данными из полей input
            this.newElement = {
                id: this.generateUniqueId(),
                category: this.text1,
                title: this.text2,
                image: this.text3,
                rating: {
                    count: this.text4,
                    rate: this.text5,
                },
                description: this.text6,
                price: this.text6,
            };
            // Проверка, что все поля заполнены
            if (Object.values(this.newElement).every(value => value !== "")) {
                // Добавление нового элемента в начало массива products
                this.products.unshift(this.newElement);
            } 
            // Очистка значений полей после сохранения
            this.clearFields();
            // Скрытие блока с добавлением
            this.add = false;
        },
        clearFields() {
            // Очистка значений полей после сохранения
            this.text1 = "";
            this.text2 = "";
            this.text3 = "";
            this.text4 = "";
            this.text5 = "";
            this.text6 = "";
            this.text7 = "";
        }
    }
}
</script>

<style lang="scss" scoped>

main {
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media(max-width: 500px) {
        flex-direction: column;
    }

    .column {
        display: flex;
        flex-direction: column;
        width: 30%;

        @media(max-width: 1400px) {
            width: 45%;
        }

        @media(max-width: 500px) {
            width: 100%;
        }

        .sort {
            margin: 0 auto;

            .btnSort {
                background: #000;   
                color: #fff;
                border: none;
                font-size: 1.3em;
                font-weight: 600;
                margin: 0 auto;
                display: block;
                padding: 5px 10px;
                margin-top: 20px;
                cursor: pointer;
                transition: all 700ms ease;
                height: 50px;

                @media(max-width: 705px) {
                        height: 80px;
                    }


                &:hover {
                    transform: scale(1.1);
                    background: #fff;
                    color: #000;
                }
            }
        }

        .products {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            text-align: center;
            background-color: rgb(254, 139, 216);
            border-radius: 10px;
            margin-top: 50px;

            h2, h3 {
                margin: 0 auto;
                width: 90%;
                margin-top: 20px;
            }

            .img {
                margin: 0 auto;
                width: 90%;
                border-radius: 10px;
            }

            .rating {
                display: flex;
                justify-content: space-between;
                font-weight: 600;
                margin: 0 auto;
                width: 90%;
            }

            p {
                margin: 0 auto;
                width: 90%;
                font-weight: 600;
            }

            input {
                padding: 10px;
                outline: 0;
                border: 1px solid rgb(252, 2, 2);
                border-radius: 10px;
                margin: 10px auto;
                width: 85%;


                &:active    {
                    outline: 0;
                }
            }

            .btn {
                display: flex;
                margin-bottom: 20px;

                @media(max-width: 1400px) {
                    flex-direction: column;
                }

                button {
                    background: #000;   
                    color: #fff;
                    border: none;
                    font-size: 1.3em;
                    font-weight: 600;
                    margin: 0 auto;
                    display: block;
                    padding: 5px 10px;
                    margin-top: 20px;
                    cursor: pointer;
                    transition: all 700ms ease;
                    line-height: 40px;
                    height: 50px;

                    &:hover {
                        transform: scale(1.1);
                        background: #fff;
                        color: #000;
                    }
                }
            }

            .warning {
                color: red;
            }
        }

        .productsColumn2 {
            background-color: rgb(122, 217, 251);
        }
    }
}


</style>