require('core-js');
require('@babel/polyfill');

console.log('---- admin_noticias webpack v1.0 ----');


const newsUrl = '/Servicos/YPE.WebService.asmx/getNoticias?cargo=&novas=true';

$(document).ready(function () {
    getNews('#table-news');
    getNews('#table-archived-news');
});


function getNews(table) {
    $.ajax({
        url: newsUrl,
        cache: false,
        type: 'GET',
        success: function (data) {
            console.log("-->> XML: ", data);
                const xml = $($.parseXML(data)); // Parse the XML String to a Document, and Wrap jQuery

                const json = xml.find("string").text(); // Get the text of the XML

                console.log("-->> json", json);

                const jsonObj = $.parseJSON(json); // Parse the JSON String
            
                console.log("-->> jsonObj: ", jsonObj);

            // let tbodyHtml = "";
            // data.data.map(function (d) {
            //     tbodyHtml +=
            //         '<tr class="row-news">' +
            //         '<td class="news__name">' + d[1] + '</td>' +
            //         '<td>' +
            //         setDropdownByStatus('publicada') +
            //         '</td>' +
            //         '<td class="news___status ' + setStatusStyle("publicada") + '">Publicada</td>' +
            //         '<td>Nome da usuária</td>' +
            //         '<td>Nome da usuária</td>' +
            //         '<td>16/11/2019</td>' +
            //         '<td class="news__group">Equipe; Supervisão; Diretoria; blablablablabla</td>' +
            //         '</tr>';

            // });

            // $(table + ' tbody').append(tbodyHtml);
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
            return 'archived'
    }
}

/** Altera os links do dropdown baseado no status da notícia */
function setDropdownByStatus(status) {
    return '<div class="dropdown">' +
        '<img class="news__more dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" src="../src/assets/icons/icone-mais-azul.png">' +
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
        (status !== 'arquivada' ? '<li><a href="#">Ir para notícia</a></li>' : '<li><a href="#">Publicar</a></li>') +
        '<li><a href="#">Editar</a></li>' +
        (status !== 'arquivada' ? '<li><a href="#" data-toggle="modal" data-target="#archivedModal">Arquivar</a></li>' : '<li><a href="#">Deletar</a></li>') +
        '<li><a href="#">Detalhes</a></li>' +
        '<li><a href="#">Alterar permissão</a></li>' +
        '</ul>' +
        '</div>';
}