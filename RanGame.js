//tự động phát nhạc khi user tương tác với web
const bgm = document.getElementById("bgm");

let killCount = 0;
let REnemyName

//Hàm hổ trợ chung
function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateStatsDisplay(target, stats){
    document.querySelectorAll(`.show${target}Name`).forEach(el => el.textContent = stats.Name);
    document.querySelectorAll(`.show${target}HP`).forEach(el => el.textContent = stats.HP);
    document.querySelectorAll(`.show${target}Atk`).forEach(el => el.textContent = stats.Atk);
    document.querySelectorAll(`.show${target}Def`).forEach(el => el.textContent = stats.Def);
}

//step1 
// nhận input tên và gán vào file CharacterStats
function CharacterName(){

    const nameInput = document.getElementById("NameInput").value.trim();
    if (nameInput === "") return alert ("Vui lòng nhập tên nhân vật !!");

    // Chuyển sang bước 2
    CharacterStats.Name = nameInput;
    document.getElementById("step1").style.display= "none";
    document.getElementById("step2").style.display= "block";
    updateStatsDisplay("", CharacterStats);
}

//Set main character stats
function setMainCharStats() {
    CharacterStats.HP = rand(5, 8);
    CharacterStats.Atk = rand(1, 5);
    CharacterStats.Def = rand(1, 5);

    const totalStats = CharacterStats.HP + CharacterStats.Atk + CharacterStats.Def ;
    if (totalStats == 18 ){
        alert ( " 🎉 Thật tuyệt vời , bạn đã roll ra nhân vật với chỉ số khởi đầu tốt nhất" );
    } else if (totalStats == 7 ){
        alert ( "úi cha, bạn đã roll ra nhân vật với chỉ số thấp nhất , nhưng đừng lo , bạn vẫn có thể tiếp tục cuộc hành trình với 1 chút khó khăn hơn với người thường thôi");
    }
}

//step2
function RanSta(){
    setMainCharStats();

    // Chuyển sang bước 3
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";

    // Gán kết quả
    updateStatsDisplay("", CharacterStats);

}

// set enemy name stats , gif , main character gif
function setEnemy(){
    REnemyName = rand(0, EnemyName.length - 1);
    EnemyStats.Name = EnemyName[REnemyName];
    EnemyStats.HP = rand(5, 8);
    EnemyStats.Atk = rand(1, 5);
    EnemyStats.Def = rand(1, 5);
}

//step3
function GameStart(){
    //thay đổi bgm
    document.getElementById("bgm").src="bgm/Zambolino-Machine.mp3";
    document.getElementById("bgm").play();

    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";

    setMainCharGif()
    setEnemyGif()
    setBGGif()
    setEnemy()

    updateStatsDisplay("", CharacterStats);
    updateStatsDisplay("E", EnemyStats);
}

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

//BGM
function enableBGM(){
    bgm.play();
    document.removeEventListener('click', enableBGM);
}
document.addEventListener('click', enableBGM);

// Nút quay lại khi xác nhận tên
function backToStep1(){
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step1").style.display = "block";

    document.getElementById("NameInput").value = "";

}

//combat
function Combat(){
    const yourRoll = rand(1, 6);
    const enemyRoll = rand(1, 6);

    let result = `🧍 Bạn roll ra : <b>${yourRoll}</b><br>👾 Kẻ địch roll ra : <b>${enemyRoll}</b><br>`;

    if ( yourRoll > enemyRoll ){
        result += " Bạn được ra đòn";
        document.getElementById("dialogueBox").innerHTML = result;
        setTimeout(YourAttack, 2000);
    } else if (yourRoll < enemyRoll){ 
        result += " Kẻ địch được ra đòn";
        document.getElementById("dialogueBox").innerHTML = result;
        setTimeout(EnemyAttack, 2000);
    } else {
        document.getElementById("dialogueBox").innerHTML = " Hòa! Hãy roll lại !!";
    }

}

// Attack
function YourAttack(){
    const damage = Math.max(CharacterStats.Atk - EnemyStats.Def, 1);
    EnemyStats.HP -= damage;

    document.getElementById("dialogueBox").innerHTML = 
        `💥 Bạn gây <span class="text-danger">${damage} damage </span> . Địch còn <span class="text-success">${EnemyStats.HP} HP</span>`;
        updateStatsDisplay("E", EnemyStats);

        if ( EnemyStats.HP <= 0){
            killCount ++;
            if ( killCount === 2){
                alert("🎉Chúc mừng bạn !! bạn đã chiến thắng ! Quay trở lại để bắt đầu cuộc hành trình mới nào");
                location.assign("index.html");
            } else {
                setTimeout(()=> {
                    alert ("🎉 Kẻ địch đã bị hạ! Chuẩn bị đối mặt kẻ tiếp theo !!");
                nextEnemy();
                }, 1000)
            }
        }
    }

function EnemyAttack(){
    const damage = Math.max(EnemyStats.Atk - CharacterStats.Def, 1);
    CharacterStats.HP -= damage;

    document.getElementById("dialogueBox").innerHTML =
        ` Địch gây <span class="text-danger">${damage} damage </span>. Bạn còn <span class="text-success">${EnemyStats.HP} HP</span>`;
        updateStatsDisplay("", CharacterStats);

    if (CharacterStats.HP <= 0){
        document.getElementById("dialogueBox").style.display = "none";
        document.getElementById("gameOver").style.display = "block";
        setTimeout(()=> {
            alert("💀 Bạn đã thua ! bạn phải bắt đầu lại từ đầu");
            location.assign("index.html");
        }, 1500);
    }
}

// Next Enemy
function nextEnemy(){
    setEnemyGif();
    setBGGif();
    setEnemy();

    updateStatsDisplay("E", EnemyStats);
    document.getElementById("dialogueBox").innerHTML = "⚔️ Kẻ địch mới đã xuất hiện! Chúc bạn roll may mắn !";
}
