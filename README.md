# Quarter-in-datepicker
Удобный набор методов для работы с Datepicker

- Квартальный календарь
- Русификация календаря
- Дополнительная кнопка очистки даты календаря

[Demo](http://jsfiddle.net/gh/get/mootools/2/evrinoma/QuarterInDatepicker/tree/master/Demo/)

<b>Установка</b>

Копируем репозиторий
<p><b>git clone https://github.com/evrinoma/Quarter-in-datepicker.git</b></p>

Подключаем не обходимый набор библиотек
<p><b>wget https://code.jquery.com/jquery-2.2.0.min.js</b></p>

<p><b>wget https://jqueryui.com/resources/download/jquery-ui-1.11.4.zip</b></p>
<p><b>unzip -e jquery-ui-1.11.4.zip</b></p>

Например для создания компонента Квартального календаря нужно добавить в <b>index.html</b>

<div class="highlight highlight-text-html-basic"><pre>&lt;<span class="pl-ent">input</span> <span class="pl-e">type</span>=<span class="pl-s"><span class="pl-pds">"</span>text<span class="pl-pds">"</span><span class="pl-e"> id</span>=<span class="pl-s"><span class="pl-pds">"</span>qmy<span class="pl-pds">"</span></span>&gt;</pre>
</div>

и настроить элемент с помощью готового метода <b>$('#qmy').dateQMY();</b>

<p><b>.dateDMY()</b>	- метод настраивает календарь день месяц год</p>
<p><b>.dateQMY()</b>	- метод настраивает календарь квартал год</p>
<p><b>.dateMY()</b>	- метод настраивает календарь месяц год</p>
<p><b>.dateY()</b>	- метод настраивает календарь год</p>
