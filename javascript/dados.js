let editandoId = null;
const listaId = Number(localStorage.getItem('listaAtiva'));

function getListas() {
    return JSON.parse(localStorage.getItem('listas') || '[]');
}

function salvarListas(listas) {
    localStorage.setItem('listas', JSON.stringify(listas));
}

function getLista() {
    return getListas().find(l => l.id === listaId);
}

function renderItens() {
    const lista = getLista();
    const table = document.getElementById('itens-table');
    const empty = document.getElementById('empty-msg');
    const selectMsg = document.getElementById('select-msg');
    const tbody = document.getElementById('itens-body');

    if (!lista) {
        selectMsg.style.display = 'block';
        document.getElementById('btn-novo-item').style.display = 'none';
        return;
    }

    selectMsg.style.display = 'none';
    document.getElementById('lista-titulo').textContent = lista.nome;

    tbody.innerHTML = '';

    if (lista.itens.length === 0) {
        table.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    table.style.display = 'table';
    empty.style.display = 'none';

    lista.itens.forEach((item, index) => {
        const statusLabel = { pendente: 'Pendente', andamento: 'Em andamento', concluido: 'Concluído' };
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nome}</td>
            <td>${item.descricao}</td>
            <td><span class="status-badge status-${item.status}">${statusLabel[item.status]}</span></td>
            <td class="td-actions">
                <button class="btn-editar" onclick="editarItem(${item.id})">Editar</button>
                <button class="btn-deletar" onclick="deletarItem(${item.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function abrirModal(modo = 'criar') {
    document.getElementById('modal-title').textContent = modo === 'criar' ? 'Novo Item' : 'Editar Item';
    document.getElementById('black_bg').style.opacity = '0.3';
    document.getElementById('black_bg').style.zIndex = '5';
    const modal = document.getElementById('itemBox');
    modal.style.opacity = '1';
    modal.style.top = '50%';
}

function fecharModal() {
    document.getElementById('black_bg').style.opacity = '0';
    document.getElementById('black_bg').style.zIndex = '-1';
    const modal = document.getElementById('itemBox');
    modal.style.opacity = '0';
    modal.style.top = '-50%';
    document.getElementById('input-nome').value = '';
    document.getElementById('input-desc').value = '';
    document.getElementById('input-status').value = 'pendente';
    editandoId = null;
}

function salvarItem() {
    const nome = document.getElementById('input-nome').value.trim();
    const descricao = document.getElementById('input-desc').value.trim();
    const status = document.getElementById('input-status').value;
    if (!nome) return;

    const listas = getListas();
    const lista = listas.find(l => l.id === listaId);

    if (editandoId !== null) {
        const item = lista.itens.find(i => i.id === editandoId);
        item.nome = nome;
        item.descricao = descricao;
        item.status = status;
    } else {
        lista.itens.push({ id: Date.now(), nome, descricao, status });
    }

    salvarListas(listas);
    fecharModal();
    renderItens();
}

function editarItem(id) {
    editandoId = id;
    const lista = getLista();
    const item = lista.itens.find(i => i.id === id);
    document.getElementById('input-nome').value = item.nome;
    document.getElementById('input-desc').value = item.descricao;
    document.getElementById('input-status').value = item.status;
    abrirModal('editar');
}

function deletarItem(id) {
    if (!confirm('Deletar este item?')) return;
    const listas = getListas();
    const lista = listas.find(l => l.id === listaId);
    lista.itens = lista.itens.filter(i => i.id !== id);
    salvarListas(listas);
    renderItens();
}

renderItens();
