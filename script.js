/*
File: script.js
GUI Assignment: Multiplication Table Web Page part 2
Rahul Pingali, UMass Lowell Computer Science, rahul_pingali@student.uml.edu 
What it does:  This file contains the JavaScript code for the Multiplication Table Web Page. It builds on the first
part of the project by adding jQuery validation and tabs functionality. The code uses the jQuery Validation Plugin
to validate the input fields for the multiplication table. It defines custom validation rules to ensure that the
values are numbers within a specified range and that the start value is less than or equal to the end value. The
code also uses jQuery UI to create sliders for the input fields, allowing users to select values visually. The
code adds tabs functionality to the page, so that each generated table is displayed in a separate tab. The user
can switch between tabs to view different multiplication tables. The code also includes a reset button that clears
the input fields and removes all generated tabs. The background is made using a custom css background that is cited below.
Some code was taken from the jQuery UI documentation and modified to fit the requirements of the project.
Sources: https://jqueryvalidation.org/, https://api.jqueryui.com/slider/, https://api.jqueryui.com/tabs/
CSS background code: https://www.magicpattern.design/tools/css-backgrounds
Copyright (c) 2024 by Rahul. All rights reserved. May be freely copied or 
excerpted for educational purposes with credit to the author.
updated by RP on June 16th, 2024 at 9:30 PM
*/



$(document).ready(function() {
    // Validation rules
    $("#tableForm").validate({
        rules: {
            beginH: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanOrEqualTo: '#endH'
            },
            endH: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            beginV: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanOrEqualTo: '#endV'
            },
            endV: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: { //messages to display when validation fails
            beginH: {
                required: "Please enter a starting horizontal value",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50",
                lessThanOrEqualTo: "Start value must be less than or equal to end value"
            },
            endH: {
                required: "Please enter an ending horizontal value",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            beginV: {
                required: "Please enter a starting vertical value",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50",
                lessThanOrEqualTo: "Start value must be less than or equal to end value"
            },
            endV: {
                required: "Please enter an ending vertical value",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            }
        },
        submitHandler: function(form) {
            genTable();
        }
    });

    $.validator.addMethod("lessThanOrEqualTo", function(value, element, param) { //custom validation method that checks if the value of the element is less than or equal to the value of the target element
        var target = $(param);
        if (this.settings.onfocusout) {
            target.off(".validate-lessThanOrEqualTo").on("blur.validate-lessThanOrEqualTo", function() {
                $(element).valid();
            });
        }
        return parseInt(value) <= parseInt(target.val());
    }, "Start value must be less than or equal to end value"); //error message to display when validation fails

    function syncValues(slider, input) { //function to sync the value of the slider with the value of the input field
        $(slider).on("slide", function(event, ui) {
            $(input).val(ui.value);
        });

        $(input).on("input", function() {
            $(slider).slider("value", this.value);
        });
    }

    $("#beginH_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#beginH").val(ui.value);
        }
    });

    $("#endH_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#endH").val(ui.value);
        }
    });

    $("#beginV_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#beginV").val(ui.value);
        }
    });

    $("#endV_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#endV").val(ui.value);
        }
    });

    syncValues("#beginH_slider", "#beginH");
    syncValues("#endH_slider", "#endH");
    syncValues("#beginV_slider", "#beginV");
    syncValues("#endV_slider", "#endV");

    $("#tabs").tabs();

    function addTab(tabTitle, content) {
        const tabList = $("#tabList");
        const tabId = `tab-${tabList.children().length}`;
        tabList.append(`<li><a href="#${tabId}">${tabTitle}</a></li>`);
        $("#tabs").append(`<div id="${tabId}">${content}</div>`);
        $("#tabs").tabs("refresh");
    }

    function genTable() {
        const beginH = parseInt($("#beginH").val());
        const endH = parseInt($("#endH").val());
        const beginV = parseInt($("#beginV").val());
        const endV = parseInt($("#endV").val());

        if ($("#tableForm").valid()) {
            let table = "<table><tr><th></th>";
            for (let h = beginH; h <= endH; h++) {
                table += `<th>${h}</th>`;
            }
            table += "</tr>";

            for (let v = beginV; v <= endV; v++) {
                table += `<tr><th>${v}</th>`;
                for (let h = beginH; h <= endH; h++) {
                    table += `<td>${h * v}</td>`;
                }
                table += "</tr>";
            }
            table += "</table>";

            const tabTitle = `${beginH}-${endH} x ${beginV}-${endV}`;
            addTab(tabTitle, table);
        }
    }

    function reset() {
        $("#beginH").val(0);
        $("#endH").val(0);
        $("#beginV").val(0);
        $("#endV").val(0);
        $("#beginH_slider").slider("value", 0);
        $("#endH_slider").slider("value", 0);
        $("#beginV_slider").slider("value", 0);
        $("#endV_slider").slider("value", 0);
        $("#tabs").tabs("destroy");
        $("#tabList").empty();
        $("#tabs").tabs();
    }

    $("button[type='reset']").on("click", function(event) {
        event.preventDefault(); 
        reset();
    });
});

