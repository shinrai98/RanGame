function CharacterName (){

    CharacterStats.Name = document.getElementById("NameInput").value.trim();
    if (CharacterStats.Name === ""){
        alert ("Vui lòng nhập tên nhân vật !!");
        return;
    }

    // Chuyển sang bước 2
    document.getElementById("step1").style.display= "none";
    document.getElementById("step2").style.display= "block";
    document.querySelectorAll(".showName").forEach(el => el.textContent = CharacterStats.Name);
    
}

function backToStep1(){
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step1").style.display = "block";

    document.getElementById("NameInput").value = "";

}

function RanSta(){
    CharacterStats.HP = Math.floor(Math.random() * (10 - 5 + 1 ) + 5);
    CharacterStats.Atk = Math.floor(Math.random() * (5 -1 + 1 ) + 1);
    CharacterStats.Def = Math.floor(Math.random() * (5 -1 + 1 ) + 1);

    if (CharacterStats.HP == 10 && CharacterStats.Atk == 5 && CharacterStats.Def == 5 ){
        alert = "Thật tuyệt vời , bạn đã roll ra nhân vật với chỉ số khởi đầu tốt nhất"
    } else {
        alert = "úi cha, bạn đã roll ra nhân vật với chỉ số thấp nhất , nhưng đừng lo , bạn vẫn có thể tiếp tục cuộc hành trình với 1 chút khó khăn hơn với người thường thôi"
    }

    // Chuyển sang bước 3
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";

    // Gán kết quả
    document.querySelectorAll(".showName").forEach(el => el.textContent = CharacterStats.Name);
    document.querySelectorAll(".showHP").forEach(el => el.textContent = CharacterStats.HP);
    document.querySelectorAll(".showAtk").forEach(el => el.textContent = CharacterStats.Atk);
    document.querySelectorAll(".showDef").forEach(el => el.textContent = CharacterStats.Def);

}

function GameStart(){
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";

    document.querySelectorAll(".showName").forEach(el => el.textContent = CharacterStats.Name);
    document.querySelectorAll(".showHP").forEach(el => el.textContent = CharacterStats.HP);
    document.querySelectorAll(".showAtk").forEach(el => el.textContent = CharacterStats.Atk);
    document.querySelectorAll(".showDef").forEach(el => el.textContent = CharacterStats.Def);

    RName = Math.floor(Math.random() * (3 -1 + 1 ) + 1);
    RGif = Math.floor(Math.random() * (3 -1 + 1 ) + 1);
    EnemyStats.HP = Math.floor(Math.random() * (10 - 5 + 1 ) + 5);
    EnemyStats.Atk = Math.floor(Math.random() * (5 -1 + 1 ) + 1);
    EnemyStats.Def = Math.floor(Math.random() * (5 -1 + 1 ) + 1);

    switch (RName){
        case 1 :
            EnemyStats.Name = "Sasuke";
            break;
        case 2 :
            EnemyStats.Name = "Naruto";
            break;
        case 3:
            EnemyStats.Name = "Obito";
            break;
    }

    switch (RGif){
        case 1:
            document.getElementById("RanGif").src = "gif/monster1.gif";
            break;
        case 2:
            document.getElementById("RanGif").src = "gif/monster2.gif";
            break;
        case 3:
            document.getElementById("RanGif").src = "gif/monster3.gif";
            break;
    }

    document.querySelectorAll(".showEName").forEach(el => el.textContent = EnemyStats.Name);
    document.querySelectorAll(".showEHP").forEach(el => el.textContent = EnemyStats.HP);
    document.querySelectorAll(".showEAtk").forEach(el => el.textContent = EnemyStats.Atk);
    document.querySelectorAll(".showEDef").forEach(el => el.textContent = EnemyStats.Def);
}
