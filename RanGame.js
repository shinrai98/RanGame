//tự động phát nhạt thì user tương tác với web
const bgm = document.getElementById("bgm");

// Random Main Character Gif
function setMainCharGif() {
    const ranMainCharGif = Math.floor(Math.random() * 10 + 1);
    document.getElementById("MainCharGif").src = `gif/main${ranMainCharGif}.gif`;
}

//Random Enemy Gif
function setEnemyGif(){
    const ranEnemyGif = Math.floor(Math.random() * 14 + 1);
    document.getElementById("EnemyGif").src = `gif/monster${ranEnemyGif}.gif`; 
}
//Random BG gif
function setBGGif(){
    const ranBGGif = Math.floor(Math.random() * 2 + 1);
    document.getElementById("BG").style.backgroundImage = `url('gif/bg${ranBGGif}.gif')`;
    // document.getElementById("BG").style.backgroundImage = ` linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('gif/bg${ranBGGif}.gif')`;
    document.getElementById("BG").style.backgroundSize = "100% 100%";
    document.getElementById("BG").style.backgroundRepeat = "no-repeat";
    document.getElementById("BG").style.backgroundPosition = "center";
}

function enableBGM(){
    bgm.play();
    document.removeEventListener('click', enableBGM);
}

document.addEventListener('click', enableBGM);

//step1
function CharacterName(){

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

//step2
function RanSta(){
    CharacterStats.HP = Math.floor(Math.random() * (10 - 5 + 1 ) + 5);
    CharacterStats.Atk = Math.floor(Math.random() * (5 -1 + 1 ) + 1);
    CharacterStats.Def = Math.floor(Math.random() * (5 -1 + 1 ) + 1);

    if (CharacterStats.HP == 10 && CharacterStats.Atk == 5 && CharacterStats.Def == 5 ){
        alert = "Thật tuyệt vời , bạn đã roll ra nhân vật với chỉ số khởi đầu tốt nhất"
    } else if (CharacterStats.HP == 5 && CharacterStats.Atk == 1 && CharacterStats.Def == 1 ){
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

//step3
function GameStart(){
    //thay đổi bgm
    document.getElementById("bgm").src="bgm/Zambolino-Machine.mp3";
    document.getElementById("bgm").play();

    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";

    setMainCharGif()

    document.querySelectorAll(".showName").forEach(el => el.textContent = CharacterStats.Name);
    document.querySelectorAll(".showHP").forEach(el => el.textContent = CharacterStats.HP);
    document.querySelectorAll(".showAtk").forEach(el => el.textContent = CharacterStats.Atk);
    document.querySelectorAll(".showDef").forEach(el => el.textContent = CharacterStats.Def);

    const REnemyName = Math.floor(Math.random() * EnemyName.length);
    EnemyStats.HP = Math.floor(Math.random() * (10 - 5 + 1 ) + 5);
    EnemyStats.Atk = Math.floor(Math.random() * (5 -1 + 1 ) + 1);
    EnemyStats.Def = Math.floor(Math.random() * (5 -1 + 1 ) + 1);

    setEnemyGif()

    document.querySelectorAll(".showEName").forEach(el => el.textContent = EnemyName[REnemyName]);
    document.querySelectorAll(".showEHP").forEach(el => el.textContent = EnemyStats.HP);
    document.querySelectorAll(".showEAtk").forEach(el => el.textContent = EnemyStats.Atk);
    document.querySelectorAll(".showEDef").forEach(el => el.textContent = EnemyStats.Def);

    setBGGif()
}

//combat
function Combat(){
    const yourRoll = Math.floor(Math.random() * 6 + 1);
    const enemyRoll = Math.floor(Math.random() * 6 + 1);
    
    if ( yourRoll > enemyRoll ){
        document.getElementById("dialogueBox").innerHTML = 
        `🧍 Bạn roll ra : <b>${yourRoll}</b><br>👾 Kẻ địch roll ra : <b>${enemyRoll}</b><br> Bạn lớn hơn nên bạn được ra đòn`;
        setTimeout(YourAttack, 2500); // 2.5 giây
    } else if (yourRoll < enemyRoll){ 
        document.getElementById("dialogueBox").innerHTML = 
        `🧍 Bạn roll ra : <b>${yourRoll}</b><br>👾 Kẻ địch roll ra : <b>${enemyRoll}</b><br> Kẻ địch lớn hơn nên kẻ địch được ra đòn`;
        setTimeout(EnemyAttack, 2500); // 2.5 giây
    } else {
        document.getElementById("dialogueBox").innerHTML = " Hãy roll lại !!"
    }

}
// Attack
function YourAttack(){
    if (CharacterStats.Atk > EnemyStats.Def ){
        const Damage = CharacterStats.Atk - EnemyStats.Def;
        EnemyStats.HP -= Damage;
        document.getElementById("dialogueBox").innerHTML = 
        "Bạn gây ra <span class = 'text-danger'>" + Damage + " Damge </span> cho địch . Kẻ địch còn <span class='text-success'>" + EnemyStats.HP + " HP </span>";
        document.querySelectorAll(".showEHP").forEach(el => el.textContent = EnemyStats.HP);
    } else{
        EnemyStats.HP -= 1;
        document.getElementById("dialogueBox").innerHTML =
        "Bạn gây ra <span class = 'text-danger'> 1 Damage </span> cho địch . Kẻ địch còn <span class='text-success'>" + EnemyStats.HP + " HP </span>";
        document.querySelectorAll(".showEHP").forEach(el => el.textContent = EnemyStats.HP);
    }

    if ( EnemyStas.HP <= 0 ){
        setTimeout(() => alert("🎉 Kẻ địch đã bị hạ! Chúc mừng bạn!"), 500);
    }
}
function EnemyAttack(){
    if (EnemyStats.Atk > CharacterStats.Def ){
        const Damage = EnemyStats.Atk - CharacterStats.Def;
        CharacterStats.HP -= Damage;
        document.getElementById("dialogueBox").innerHTML =
        "Kẻ địch gây ra <span class = 'text-danger'>" + Damage + " Damage </span> cho bạn . Bạn còn <span class='text-success'>" + CharacterStats.HP + " HP</span>";
        document.querySelectorAll(".showHP").forEach(el => el.textContent = CharacterStats.HP);
    } else{
        CharacterStats.HP -= 1;
        document.getElementById("dialogueBox").innerHTML =
        "Kẻ địch gây ra <span class = 'text-danger'> 1 Damge </span> cho bạn . Bạn còn <span class='text-success'>" + CharacterStats.HP + " HP </span>";
        document.querySelectorAll(".showHP").forEach(el => el.textContent = CharacterStats.HP);
    }

    if (CharacterStats.HP <= 0) {
        //document.getElementById("gameOver").src = "gif/gameover1.gif";
        setTimeout(() => alert("💀 Bạn đã thua trận!"), 500);
    }
}
