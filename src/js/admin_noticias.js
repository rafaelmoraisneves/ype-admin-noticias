require('core-js');
require('@babel/polyfill');

console.log('---- admin_noticias webpack v1.0 ----');


$(document).ready(function () {
    console.log('---------------------- document ready ------------------ ');
    getNews('#table-news', 'true');
    getNews('#table-archived-news', 'false');
});


function getNews(table, novasNoticias) {
    $.ajax({
        url: '/Servicos/YPE.WebService.asmx/getNoticias?cargo=&novas=' + novasNoticias,
        cache: false,
        type: 'GET',
        success: function (data) {
            console.log('---------------------- RETORNO DA API ------------------ ');
            const newsData =  JSON.parse($(data).find('string')[0].textContent);
            console.log(newsData);

            let tbodyHtml = "";
            newsData.map(function (n) {
                tbodyHtml +=
                    '<tr class="row-news">' +
                        '<td class="news__name">' + n.Titulo + '</td>' +
                        '<td>' + setDropdownByStatus(n.Status) + '</td>' +
                        '<td class="news___status ' + setStatusStyle(n.Status) + '">'+ n.Status +'</td>' +
                        '<td>'+ n.CriadoPor +'</td>' +
                        '<td>'+ n.ModificadoPor + '</td>' +
                        '<td>'+ n.UltimaModificacao +'</td>' +
                        '<td class="news__group">' + n.Grupo + '</td>' +
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
        case 'Publicado':
            return 'published'
        case 'Agendado':
            return 'scheduled'
        case 'Arquivado':
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

        // ../src/assets/icons/icone-mais-azul.png
}