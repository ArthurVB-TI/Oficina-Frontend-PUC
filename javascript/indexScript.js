function active_black_bg(active){
    var black_bg = document.getElementById("black_bg");
    if(active){
        black_bg.style.opacity = "0.3";
        black_bg.style.zIndex = "5";
    } else {
        black_bg.style.opacity = "0";
        black_bg.style.zIndex = "-1";
    }
}

class list{
    constructor(){

    }
    active_creatListBox(active){
        var creat_list_box = document.getElementById("createBox");
        if(active){
            creat_list_box.style.opacity = "1";
            creat_list_box.style.top = "50%";
        } else {
            creat_list_box.style.opacity = "0";
            creat_list_box.style.top = "-50%";
        }
    }
    active_recuperarListBox(acite){
        var recuperar_list_box = document.getElementById("recuperarBox");
        if(acite){
            recuperar_list_box.style.opacity = "1";
            recuperar_list_box.style.top = "50%";
        } else {
            recuperar_list_box.style.opacity = "0";
            recuperar_list_box.style.top = "-50%";
        }
    }
}

function criar_listBox(){
    const list_box = new list();
    active_black_bg(true);
    list_box.active_creatListBox(true);
}

function close_listBox(){
    const list_box = new list();
    active_black_bg(false);
    list_box.active_creatListBox(false);
}

function criar_recuperar_listBox(){
    const list_box = new list();
    active_black_bg(true);
    list_box.active_recuperarListBox(true);
}

function close_recuperar_listBox(){
    const list_box = new list();
    active_black_bg(false);
    list_box.active_recuperarListBox(false);
}