let editandoId = null;

function getListas() {
    return JSON.parse(localStorage.getItem('listas') || '[]');
}

function salvarListas(listas) {
    localStorage.setItem('listas', JSON.stringify(listas));
}

function renderListas() {
    const listas = getListas();
    const grid = document.getElementById('listas-grid');
    const empty = document.getElementById('empty-msg');

    grid.innerHTML = '';

    if (listas.length === 0) {
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    listas.forEach(lista => {
        const card = document.createElement('div');
        card.className = 'lista-card';
        card.innerHTML = `
            <h3>${lista.nome}</h3>
            <span>${lista.itens.length} item(s)</span>
            <div class="lista-card-actions">
                <button class="btn-abrir" onclick="abrirLista(${lista.id})">Abrir</button>
                <button class="btn-editar" onclick="editarLista(${lista.id})">Editar</button>
                <button class="btn-deletar" onclick="deletarLista(${lista.id})">Deletar</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function abrirLista(id) {
    localStorage.setItem('listaAtiva', id);
    location.href = 'dados.html';
}

function editarLista(id) {
    editandoId = id;
    const listas = getListas();
    const lista = listas.find(l => l.id === id);
    document.getElementById('input-edit-nome').value = lista.nome;
    abrirModal();
}

function salvarEdicao() {
    const nome = document.getElementById('input-edit-nome').value.trim();
    if (!nome) return;

    const listas = getListas();
    const lista = listas.find(l => l.id === editandoId);
    lista.nome = nome;
    salvarListas(listas);
    fecharModal();
    renderListas();
}

function deletarLista(id) {
    if (!confirm('Deletar esta lista e todos os seus itens?')) return;
    const listas = getListas().filter(l => l.id !== id);
    salvarListas(listas);
    renderListas();
}

function abrirModal() {
    document.getElementById('black_bg').style.opacity = '0.3';
    document.getElementById('black_bg').style.zIndex = '5';
    const modal = document.getElementById('editBox');
    modal.style.opacity = '1';
    modal.style.top = '50%';
}

function fecharModal() {
    document.getElementById('black_bg').style.opacity = '0';
    document.getElementById('black_bg').style.zIndex = '-1';
    const modal = document.getElementById('editBox');
    modal.style.opacity = '0';
    modal.style.top = '-50%';
}

renderListas();
