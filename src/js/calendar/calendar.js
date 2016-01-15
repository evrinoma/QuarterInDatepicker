/**
 * Created by evrinoma@gmail.com on 29.05.2015.
 */
$(function ($) {

    $.datepicker.setDefaults({
        regin: "ru"
    });
    var datepickerLocal = {
        _getRegin: function () {
            return this._defaults.regin;
        },
        _setRegin: function (regin) {
            this._defaults.regin = regin;
        }
    }
    $.extend($.datepicker, datepickerLocal);


    $.datepicker.setDefaults({
        showOwnInputFormat: false,
        ownInputFormatType: "QDMY"
    });
    var datepickerOwnFormat = {
        _getShowOwnInputFormat: function () {
            return this._defaults.showOwnInputFormat;
        },
        _setShowOwnInputFormat: function (showOwnInputFormat) {
            this._defaults.showOwnInputFormat = showOwnInputFormat;
        },
        _getOwnInputFormatType: function () {
            return this._defaults.ownInputFormatType;
        },
        _setOwnInputFormatType: function (ownInputFormatType) {
            this._defaults.ownInputFormatType = ownInputFormatType;
        }
    }
    $.extend($.datepicker, datepickerOwnFormat);


    $.datepicker.setDefaults({
        showMonth: true,
        showCalendar: true
    });
    var datepickerShow = {
        _getShowMonth: function () {
            return this._defaults.showMonth;
        },
        _setShowMonth: function (showMonth) {
            this._defaults.showMonth = showMonth;
        },
        _getShowCalendar: function () {
            return this._defaults.showCalendar;
        },
        _setShowCalendar: function (showCalendar) {
            this._defaults.showCalendar = showCalendar;
        },
        _getFormatDate: function (inst, oDate) {
            return this.formatDate('', oDate, inst.settings);
        }
    }
    $.extend($.datepicker, datepickerShow);

    $.datepicker.formatDate_old = $.datepicker.formatDate;
    $.datepicker.formatDate = function (e, t, i) {

        if (i.showOwnInputFormat) {
            e = '';
            var format = i.ownInputFormatType;
            if (t)
                for (var s = 0; format.length > s; s++)
                    switch (format.charAt(s)) {
                        case"q":
                            if (format.length > s + 1 && format.charAt(s + 1) === "q") {
                                if (typeof i.nameByQuarter != 'undefined') {
                                    e += i.nameByQuarter;
                                } else {
                                    e += this._getNameByQuarter(this);
                                }
                                s++
                            }
                            else
                                e += format.charAt(s);
                            break;
                        default:
                            e += format.charAt(s)
                    }

        }
        return $.datepicker.formatDate_old(e, t, i);
    };


    $.datepicker._getFormatConfig_old = $.datepicker._getFormatConfig;
    $.datepicker._getFormatConfig = function (inst) {
        var oldSettings = $.datepicker._getFormatConfig_old(inst);
        var newSettings = {
            ownInputFormatType: this._get(inst, "ownInputFormatType"),
            showOwnInputFormat: this._get(inst, "showOwnInputFormat"),
            showCalendar: this._get(inst, "showCalendar"),
            showMonth: this._get(inst, "showMonth")
        }
        $.extend(inst, {selectQuarter: this._getOptions(inst, "selectQuarter"), monthQuarter: this._getOptions(inst, "monthQuarter")});
        $.extend(oldSettings, {nameByQuarter: this._getNameByQuarter(inst)});

        return $.extend(newSettings, oldSettings);
    };


    $.datepicker.regional[$.datepicker._getRegin()] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults({
        changeYear: true,
        changeMonth: true,
        yearRange: "2007:c+10",
        dateFormat: 'dd MM yy'
    });
    $.datepicker.setDefaults($.datepicker.regional[$.datepicker._getRegin()]);

    $.datepicker._attachHandlers_old = $.datepicker._attachHandlers;
    $.datepicker._attachHandlers = function (inst) {
        var datepicker = $("#ui-datepicker-div");
        if (inst.settings.showQuarter === true) datepicker.append(this.quarter());
        var html = datepicker.html();
        if (inst.settings.showMonth === false) html = html.replace("select class=\"ui-datepicker-month\"", "select class=\"ui-datepicker-month\" style=\"display: none;\"");
        if (inst.settings.showCalendar === false) html = html.replace("table class=\"ui-datepicker-calendar\"", "table class=\"ui-datepicker-calendar\" style=\"display: none;\"");
        if (inst.settings.inputFieldLocked === true) $(inst.settings.inputFieldName).attr('readonly', true);

        datepicker.html(html);

        var find = datepicker.find("[data-own-handler]");
        var id = "#" + inst.id.replace(/\\\\/g, "\\");
        find.map(function () {
            var handler = {
                selectQuarter: function () {
                    $.datepicker._setSelectMonthQuarter(inst, parseInt(this.value, 10));
                    $.datepicker._setSelectQuarter(inst);
                }
            };
            $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-own-handler")]);
        });

        this._attachHandlers_old(inst);
    };

    $.datepicker._newInst_old = $.datepicker._newInst;
    $.datepicker._newInst = function (t, i) {
        return $.extend(this._newInst_old(t, i), {options: this.options});
    };

    $.datepicker._setDate_old = $.datepicker._setDate;
    $.datepicker._setDate = function (inst, t, i) {
        if (t !== null) {
            inst.options.default.monthQuarter = t.getMonth();
            $.datepicker._setSelectQuarter(inst);
        }
        this._setDate_old(inst, t, i);
    };

    $.datepicker._getObjOptionsDatepicker = function (target, func, key) {
        var inst = this._getInst(target[0]);
        if ($.isFunction($.datepicker[func])) {
            return $.datepicker[func](inst, key);
        }
        return this._get(inst, func);
    };

    $.datepicker._getDayCount = function (inputStart, inputFinish) {
        var dateStart = inputStart.datepicker("getDate");
        var dateFinish = inputFinish.datepicker("getDate");
        return Math.floor((dateFinish.getTime() - dateStart.getTime()) / ( 1000 * 60 * 60 * 24 )) + 1;
    };
});

$(function ($) {
    var QuarterSelect = {
        options: {
            default: {
                width: 100,
                height: 20,
                namesNum: ["1 quarter", "2 quarter", "3 quarter", "4 quarter"],
                namesMonth: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
                names: ["1", "2", "3", "4"],
                defaultNames: "namesMonth",
                selectQuarter: 1,
                monthQuarter: 0,
                objectName: "ui-datepicker-quarter"
            }
        },
        quarter: function () {
            var QuarterDiv = $("<div>");
            QuarterDiv.addClass(this.options.default.objectName);
            QuarterDiv.attr('id', this.options.default.objectName);
            QuarterDiv.css("position", "relative");
            QuarterDiv.css("font-size", "12px");
            QuarterDiv.css("text-align", "center");
            var QuarterSelect = $("<select>");
            QuarterSelect.addClass(this.options.default.objectName + "-select");
            QuarterSelect.attr('data-event', 'change');
            QuarterSelect.attr('data-own-handler', 'selectQuarter');
            var names = this._getNames();
            for (var i = 0, j = 0; i < 4; i++, j += 3) {
                var QuarterSelectOption = $("<option>");
                QuarterSelectOption.text(names[i]);
                if (this.options.default.selectQuarter == (i + 1)) {
                    QuarterSelectOption.attr("value", this.options.default.monthQuarter);
                    QuarterSelectOption.attr("selected", "selected");
                } else {
                    QuarterSelectOption.attr("value", j);
                }

                QuarterSelect.append(QuarterSelectOption);
            }
            QuarterDiv.append(QuarterSelect);
            return QuarterDiv;
        },
        _getNames: function () {
            switch (this.options.default.defaultNames) {
                case "namesMonth":
                    return this.options.default.namesMonth;
                case "namesNum":
                    return this.options.default.namesNum;
                default:
                    return this.options.default.names;
            }
        },
        _getRemove: function (target, props) {
            for (var name in props) {
                if (props[name] != null) {
                    target[name] = props[name];
                }
            }
            return target;
        },
        _setOptions: function (settings) {
            return this._getRemove(this.options.default, settings || {});
        },
        _getOptions: function (inst, target) {
            return inst[target] !== undefined ? inst[target] : this.options.default[target];
        },
        _getSelectQuarter: function () {
            return this.options.default.selectQuarter;
        },
        _setSelectQuarter: function (inst) {
            inst.options.default.selectQuarter = ((inst.options.default.monthQuarter + 3) - (inst.options.default.monthQuarter + 3) % 3) / 3;
        },
        _getSelectMonthQuarter: function () {
            return this.options.default.monthQuarter;
        },
        _setSelectMonthQuarter: function (inst, iMonth) {
            inst.options.default.monthQuarter = parseInt(iMonth, 10);
            if (typeof inst.selectedMonth != 'undefined') {
                inst.drawMonth = inst.selectedMonth = inst.currentMonth = inst.options.default.monthQuarter;
            }
        },
        _getShowQuarter: function () {
            return this._defaults.showQuarter;
        },
        _setShowQuarter: function (showQuarter) {
            this._defaults.showQuarter = showQuarter;
        },
        _getNameByQuarter: function (inst) {
            return this._getNames()[inst.options.default.selectQuarter - 1];
        }
    };

    $.datepicker.setDefaults({
        showQuarter: false
    });

    $.extend($.datepicker, QuarterSelect);

    $.datepicker.options[$.datepicker._getRegin()] = {
        namesNum: ["1 квартал", "2 квартал", "3 квартал", "4 квартал"],
        namesMonth: ["Янв-Мар", "Апр-Июн", "Июл-Сен", "Окт-Дек"],
        defaultNames: "namesNum"
    };
    $.datepicker._setOptions($.datepicker.options[$.datepicker._getRegin()]);

});

$.fn.dateInit = function () {
    if ((selDate = $(this).val()) != '') {
        var iYear = (isNaN(year = parseInt(selDate.substring(selDate.length - 4, selDate.length), 10)) ? 1 : year);
        var iMonth = (isNaN(month = parseInt(selDate.substring(3, 5), 10)) ? 1 : month - 1);
        var iDay = (isNaN(day = parseInt(selDate.substring(0, 2), 10)) ? 1 : day);
        var oDate = new Date(iYear, iMonth, iDay);

        $(this).datepicker('setDate', oDate)
        $(this).datepicker('option', 'defaultDate', oDate);
        if ($.isFunction($.datepicker._getObjOptionsDatepicker)) {
            if ($.datepicker._getObjOptionsDatepicker(this, "showOwnInputFormat")) {
                $(this).val($.datepicker._getObjOptionsDatepicker(this, "_getFormatDate", oDate));
            }
        }
    }
}

$.fn.cloneDateInput = function (format) {

    if ($(this).attr("value")) {
        var sDate = $(this).val();
        var sYear = sDate.substr(sDate.length - 4, 4);
        var sMonth = sDate.substr(sDate.length - 7, 2)
        switch (format) {
            case "QMY":
            case "MY":
                sDate = '01.' + sMonth + '.' + sYear;
                $(this).attr("value", sDate);
                break;
            case "Y":
                sDate = '01.01.' + sYear;
                $(this).attr("value", sDate);
                break;
        }
    } else {
        $(this).attr("value", "");
    }

    var input = $(this).clone(true);
    input.attr("format", format);
    input.attr("type", "hidden");
    input.on('onCloseDatepicker', function (event, iDay, iMonth, iYear, sFormat) {
        var child = $(this).attr('id');
        iMonth = parseInt(iMonth, 10) + 1;
        var sMonth = ((iMonth > 9) ? iMonth : "0" + iMonth);
        var sDay = ((iDay > 9) ? iDay : "0" + iDay);
        var sDate = sDay + '.' + sMonth + '.' + iYear;
        this.value = sDate;
        $("#" + child + '_' + sFormat).attr("value", sDate);
    });

    $(this).parent().append(input);
    var id = this.attr('id');
    var name = this.attr('name');
    $(this).attr('id', id + '_' + format);
    $(this).attr('parent', id);
    $(this).attr('name', name + '_' + format);
    $(this).selector = id + '_' + format;
    var DivCont = $("<div>");
    DivCont.attr('id', 'ui-datepicker-div-' + id + '-' + format);
    DivCont.css("width", "auto");
    DivCont.css("display", "inline-block");
    DivCont.css("margin", "0px");
    DivCont.css("white-space", " nowrap");
    $("#" + id + '_' + format).css("margin", "1px");

    $("#" + id + '_' + format).after(DivCont);
    $("#" + id + '_' + format).appendTo(DivCont);
}

$.fn.addButtonClear = function (format) {
    var id = this.attr('id');
    var name = this.attr('name');
    var ButtonImg = $("<img>");
    ButtonImg.addClass("ui-datepicker-input-button-div-img-" + format);
    ButtonImg.attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkNJREFUeNqMU01rU0EUPZM3yUvSJDZaS2mSRloXJaVFCaUiFpJNF37gooi4MmtXRXDhJotsXfkDhKKLghG0+LEIQqS4C66EGIgUwSbFJrFpPm3eyxvvJG1NYgQvnFxmzpxz70zuw3fGsEN4QaBYItyVWa5zRxjGSY3Uss4PECMisCnEuXA6HUwGAp9uMvYNPTGESwsgyltd/sJ0LHYjlEggm80itLwc9ITDwV6DUDL5h1tZCW5Hoxa5z391edWo1VCsVPAlEsHo1BT0crlX38fJs6RTOwYNIWS2tRsNXN7YwFwqBbOqouT1wrm+fmKwMD+PGb8fIy4X5FnS2fo7oM382hpsdjs02mjS2jo2dmIgn9HhcACGAXn2uAPMdnFfUBj/CRlSI7VcdAsobbqKQe7/iv3cU1T23sE1fhVnfBGQTpH7JmkgFzqJtXZ7KFpaA9XSFibPr3aypjc7GqnlRwW6Bro+tHqtkIBqPwvVwimfxkHhfUfT2wHXyOCQDP6Cdojy7muccvtwJ/IcTtcEfuY3oZhhEYNXaJFgEAeFLXB6KaHtIR6Po1nZhtCruLjIprm5pwOdHrEl79sHHeXcK9hdDuT3U3j75gGKhxkIawNLVzD3+AljpiZ9C4IxVeEcVputD+36ZzBjlwpkYDEVce36I9h5FTbLD3j8IxPU4CWeF2LSz5jzQ8/UHQfHMwQWSGCi0TIbqJceolZ62eFmZkfdXzP1e3LAguOM3aKx8g0arN7Goscr3MP+GUVBa6eIj78FGAB/Zl5KrhRXwAAAAABJRU5ErkJggg==");
    ButtonImg.attr("parent", $("#" + id).attr("parent"));
    ButtonImg.attr("format", format);
    ButtonImg.css("cursor", "pointer");
    ButtonImg.click(function () {
        var parent = $(this).attr("parent");
        var format = $(this).attr("format");
        $("#" + parent).attr("value", "");
        $("#" + parent + "_" + format).attr("value", "");
        $("#" + parent + "_" + format).val('');
    });
    $("#" + id).after(ButtonImg);
}

$.fn.dateQMY = function (event) {

    var format = "qq yy";
    var name = "QMY";

    var eventListner = event;

    $(this).each(function () {

        $(this).datepicker({
            dateFormat: 'dd.mm.yy',
            stepMonths: 12,

            showCalendar: false,
            showMonth: false,
            showQuarter: true,

            showOwnInputFormat: true,
            ownInputFormatType: format,

            inputFieldLocked: true,
            inputFieldName: '#' + $(this).attr('id') + '_' + name,

            onClose: function (sData, oSelect) {

                var parent = $(this).attr('parent');

                var iQuarterMonth = parseInt($("#ui-datepicker-quarter :selected").val(), 10);

                $(this).datepicker('setDate', new Date(oSelect.selectedYear, oSelect.selectedMonth, parseInt(oSelect.selectedDay, 10)));

                $("#" + parent).trigger('onCloseDatepicker', [parseInt(oSelect.selectedDay, 10), iQuarterMonth, oSelect.selectedYear, name]);

                if (eventListner) {
                    if ($.isFunction(eventListner.onClose)) {
                        eventListner.onClose();
                    }
                }
            },

            beforeShow: function () {

                var parent = $(this).attr('parent');

                var selDate = $("#" + parent).val();

                if (selDate.length > 0) {

                    var year = parseInt(selDate.substring(selDate.length - 4, selDate.length), 10);

                    var month = jQuery.inArray(selDate.substring(3, selDate.length - 5), $(this).datepicker('option', 'monthNames'));

                    var day = parseInt(selDate.substring(0, 2), 10);

                    var iYear = (isNaN(year) ? 1 : year);

                    var iMonth = ( (( month ) != -1) ? month : (isNaN(month = parseInt(selDate.substring(3, 5), 10)) ? 1 : month - 1) );

                    var iDay = (isNaN(day) ? 1 : day);

                    $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, iDay));

                    $(this).datepicker('setDate', new Date(iYear, iMonth, iDay));

                }

                if (eventListner) {
                    if ($.isFunction(eventListner.beforeShow)) {
                        eventListner.beforeShow();
                    }
                }

            }

        }).cloneDateInput(name);

        $(this).addButtonClear(name);

        $(this).dateInit();
    });
}


$.fn.dateDMY = function (event) {

    var name = "DMY";

    var eventListner = event;


    $(this).each(function () {


    $(this).datepicker({

            dateFormat: 'dd.mm.yy',

            onClose: function (sData, oSelect) {

                var parent = $(this).attr('parent');

                $(this).datepicker('setDate', new Date(oSelect.selectedYear, oSelect.selectedMonth, parseInt(oSelect.selectedDay, 10)));

                $("#" + parent).trigger('onCloseDatepicker', [parseInt(oSelect.selectedDay, 10), oSelect.selectedMonth, oSelect.selectedYear, name]);

                if (eventListner) {
                    if ($.isFunction(eventListner.onClose)) {
                        eventListner.onClose();
                    }
                }
            },
            beforeShow: function () {

                if (eventListner) {
                    if ($.isFunction(eventListner.beforeShow)) {
                        eventListner.beforeShow();
                    }
                }

            }
        }
    ).cloneDateInput(name);

    $(this).addButtonClear(name);

    $(this).dateInit();

    });
}

$.fn.dateMY = function (event) {

    var format = "MM yy";
    var name = "MY";

    var eventListner = event;

    $(this).each(function () {

    $(this).datepicker({

        dateFormat: 'dd.mm.yy',

        showCalendar: false,

        ownInputFormatType: format,
        showOwnInputFormat: true,

        inputFieldLocked: true,
        inputFieldName: '#' + $(this).attr('id') + '_' + name,

        onClose: function (sData, oSelect) {

            var parent = $(this).attr('parent');

            $(this).datepicker('setDate', new Date(oSelect.selectedYear, oSelect.selectedMonth, parseInt(oSelect.selectedDay, 10)));

            $("#" + parent).trigger('onCloseDatepicker', [parseInt(oSelect.selectedDay, 10), oSelect.selectedMonth, oSelect.selectedYear, name]);

            if (eventListner) {
                if ($.isFunction(eventListner.onClose)) {
                    eventListner.onClose();
                }
            }

        },
        beforeShow: function () {

            var parent = $(this).attr('parent');

            var selDate = $("#" + parent).val();

            if (selDate.length > 0) {

                var year = parseInt(selDate.substring(selDate.length - 4, selDate.length), 10);

                var month = jQuery.inArray(selDate.substring(3, selDate.length - 5), $(this).datepicker('option', 'monthNames'));

                var day = parseInt(selDate.substring(0, 2), 10);

                var iYear = (isNaN(year) ? 1 : year);

                var iMonth = ( ((month) != -1) ? month : (isNaN(month = parseInt(selDate.substring(3, 5), 10)) ? 1 : month - 1) );

                var iDay = (isNaN(day) ? 1 : day);

                $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, iDay));

                $(this).datepicker('setDate', new Date(iYear, iMonth, iDay));

            }

            if (eventListner) {
                if ($.isFunction(eventListner.beforeShow)) {
                    eventListner.beforeShow();
                }
            }

        }
    }).cloneDateInput(name);

    $(this).addButtonClear(name);

    $(this).dateInit();
    });
}

$.fn.dateY = function (event) {

    var name = "Y";
    var format = "yy";

    var eventListner = event;

    $(this).each(function () {

    $(this).datepicker({

        dateFormat: 'dd.mm.yy',
        stepMonths: 12,

        showCalendar: false,
        showMonth: false,

        ownInputFormatType: format,
        showOwnInputFormat: true,

        inputFieldLocked: true,
        inputFieldName: '#' + $(this).attr('id') + '_' + name,

        onClose: function (sData, oSelect) {

            var parent = $(this).attr('parent');

            $(this).datepicker('setDate', new Date(oSelect.selectedYear, oSelect.selectedMonth, parseInt(oSelect.selectedDay, 10)));

            $("#" + parent).trigger('onCloseDatepicker', [parseInt(oSelect.selectedDay, 10), oSelect.selectedMonth, oSelect.selectedYear, name]);

            if (eventListner) {
                if ($.isFunction(eventListner.onClose)) {
                    eventListner.onClose();
                }
            }
        },

        beforeShow: function () {

            var parent = $(this).attr('parent');

            var selDate = $("#" + parent).val();

            if (selDate.length > 0) {

                var year = parseInt(selDate.substring(selDate.length - 4, selDate.length), 10);

                var month = jQuery.inArray(selDate.substring(3, selDate.length - 5), $(this).datepicker('option', 'monthNames'));

                var day = parseInt(selDate.substring(0, 2), 10);

                var iYear = (isNaN(year) ? 1 : year);

                var iMonth = ( ((month) != -1) ? month : (isNaN(month = parseInt(selDate.substring(3, 5), 10)) ? 1 : month - 1) );

                var iDay = (isNaN(day) ? 1 : day);

                $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, iDay));

                $(this).datepicker('setDate', new Date(iYear, iMonth, iDay));

            }

            if (eventListner) {
                if ($.isFunction(eventListner.beforeShow)) {
                    eventListner.beforeShow();
                }
            }
        }
    }).cloneDateInput(name);

    $(this).addButtonClear(name);

    $(this).dateInit();
});
}
