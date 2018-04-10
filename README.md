<p>Для начала работы нужно установить npm и bower компоненты. Для этого ввести в командную строку с корне проекта:<br>
npm install<br>
bower install<br>
</p>
<h2>Команды:</h2>

<p><b>gulp</b> - запускает основной задачи на сборку проекта, сервер и отслеживение изменения файлов в директории /src/
    включает в себя:
    <ul>
        <li>gulp build - сборка проекта</li>
        <li>gulp webserver - запуск сервера на основе файлов в директории /build/</li>
        <li>gulp watch - задача на отслеживение изменения файлов в директории /src/</li>
    </ul>
</p>    
<p>
<b>gulp clean</b> - чистка папка build
</p>
<p>
<b>gulp sprite</b> - сборка спрайтов (можно запускать параллельно работе основной задачи)
</p>
<p><b>gulp dest</b> - отправка текущего билда на сервер через ssh (предварительно нужно настроить доступы в gulpfile.js [201-217])</p>

<h2>Готовые модули</h2>

<p><b>modal</b> - для открытия модалки нужна ссылка вида 

<p>
<code>
<a href="#name" class="open-modal"></a>
</code>
</p> 
и класс "open_modal". Будет открыта модалка с id="name" в обертке "#overlay"</p>
<p><b>select</b> - заменяет стандартный селект. Для этого используем шаблон из components/select.html<br>
Классы: .select-default - пункт выбранный по умолчанию; .selected - текущий выбранный пункт</p>
<p><b>scrollto</b> - весим на элементы 
<p><code>
<a href="#element" class=".j-scroll-to"></a>
</code></p> 
и плавно скролим до элемента c id="element"</p>

<h3>Сторонние плагины лежат в папке /src/plugin и при неободимости инклудятся в файлах lib.js и main.less</h3>
<ul>
    <li>owl.carousel - <a href="https://owlcarousel2.github.io/OwlCarousel2/docs/started-welcome.html">Документация</a></li>
    <li>jquery.cycle - <a href="http://jquery.malsup.com/cycle/options.html">Документация</a></li>
    <li>jquery.hyphen - <a href="https://github.com/kozachenko/jQuery-Russian-Hyphenation">Плагин jQuery для расстановки переносов в русском тексте</a></li>
    <li>Swiper - <a href="http://idangero.us/swiper/">Документация</a></li>
    <li>Magnific Popup</li> - <a href="http://dimsemenov.com/plugins/magnific-popup/">Документация</a>
</ul>

