require('core-js');
require('@babel/polyfill');

console.log('---- admin_noticias webpack v1.0 ----');


const newsUrl = 'https://api.myjson.com/bins/uo5vm';

$(document).ready(function () {
    getNews('#table-news');
    getNews('#table-filed-news');
});


function getNews(table) {
    $.ajax({
        url: newsUrl,
        cache: false,
        type: 'GET',
        success: function (data) {
            let tbodyHtml = "";
            data.data.map(function (d) {
                tbodyHtml +=
                    '<tr class="row-news">' +
                    '<td class="news__name">' + d[1] + '</td>' +
                    '<td>' +
                    setDropdownByStatus('publicada') +
                    '</td>' +
                    '<td class="news___status ' + setStatusStyle("publicada") + '">Publicada</td>' +
                    '<td>Nome da usuária</td>' +
                    '<td>Nome da usuária</td>' +
                    '<td>16/11/2019</td>' +
                    '<td class="news__group">Equipe; Supervisão; Diretoria; blablablablabla</td>' +
                    '</tr>';

            });

            $(table + ' tbody').append(tbodyHtml);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

/** Define a classe do texto baseado no status */
function setStatusStyle(status) {
    switch (status) {
        case 'publicada':
            return 'published'
        case 'agendada':
            return 'scheduled'
        case 'arquivada':
            return 'filed'
    }
}

/** Altera os links do dropdown baseado no status da notícia */
function setDropdownByStatus(status) {
    return '<div class="dropdown">' +
        '<img class="news__more dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" src="../src/assets/icons/icone-mais-azul.png">' +
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
        (status !== 'arquivada' ? '<li><a href="#">Ir para notícia</a></li>' : '<li><a href="#">Publicar</a></li>') +
        '<li><a href="#">Editar</a></li>' +
        (status !== 'arquivada' ? '<li><a href="#">Arquivar</a></li>' : '<li><a href="#">Deletar</a></li>') +
        '<li><a href="#">Detalhes</a></li>' +
        '<li><a href="#">Alterar permissão</a></li>' +
        '</ul>' +
        '</div>';
}