function abrirModal() {
    document.getElementById('black_bg').style.opacity = '0.3';
    document.getElementById('black_bg').style.zIndex = '5';
    const modal = document.getElementById('createBox');
    modal.style.opacity = '1';
    modal.style.top = '50%';
}

function fecharModal() {
    document.getElementById('black_bg').style.opacity = '0';
    document.getElementById('black_bg').style.zIndex = '-1';
    const modal = document.getElementById('createBox');
    modal.style.opacity = '0';
    modal.style.top = '-50%';
    document.getElementById('input-nome').value = '';
}

function criarLista() {
    const nome = document.getElementById('input-nome').value.trim();
    if (!nome) return;

    const listas = JSON.parse(localStorage.getItem('listas') || '[]');
    listas.push({ id: Date.now(), nome, itens: [] });
    localStorage.setItem('listas', JSON.stringify(listas));

    fecharModal();
    location.href = 'pages/listas.html';
}
