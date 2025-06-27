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

