// ==UserScript==
// @name         תצוגה מקדימה של קבצים בNodeBB
// @version      1
// @description  מוסיף תצוגה מקדימה של תוכן קבצים ללא צורך בהורדה. תוכן הקובץ מוצג בconsole
// @match        https://mitmachim.top/*
// @grant        none
// ==/UserScript==
/* globals $ app */

$(window).on('action:ajaxify.end action:posts.loading action:posts.loaded', () => {
    $('ul[component="topic"] a[href*="/assets/uploads/files/"]:not(.processed,:has(>img))').each((i, e) => {
        $(e).addClass('processed').after(
            $(`<button class="btn btn-link">📄</button>`).click(() => {
                $.get(e.href).done(content => {
                    console.log(content)
                    app.require('alerts').then(alerts => {
                        alerts.success('תוכן הקובץ מוצג בConsole')
                    })
                })
            })
        )
    })
})
