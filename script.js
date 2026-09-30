document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        const gameName = card.getAttribute('data-name').toLowerCase();
        card.style.display = gameName.includes(searchTerm) ? 'block' : 'none';
    });
});

function openGame() { document.getElementById('gameModal').style.display = 'flex'; }
function closeGame() { document.getElementById('gameModal').style.display = 'none'; document.getElementById('gameArea').innerHTML = ''; }

function startReactionGame() {
    openGame();
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <h2>⚡ اختبار سرعة البديهة</h2>
        <p style="margin: 15px 0;">انتظر حتى تتحول الشاشة إلى اللون الأخضر، ثم اضغط بأسرع ما يمكن!</p>
        <div id="reactionBox" style="width: 100%; height: 200px; background-color: #dc3545; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 1.5rem; font-weight: bold;">انتظر...</div>
        <p id="reactionResult" style="margin-top: 15px; font-size: 1.2rem; color: #00e5ff;"></p>
    `;
    const box = document.getElementById('reactionBox');
    const result = document.getElementById('reactionResult');
    let startTime;
    let timeout = setTimeout(() => {
        box.style.backgroundColor = '#28a745';
        box.innerText = 'اضغط الآن!';
        startTime = Date.now();
    }, Math.random() * 3000 + 2000);
    box.onclick = () => {
        if (box.style.backgroundColor === 'rgb(40, 167, 69)') {
            const reactionTime = Date.now() - startTime;
            result.innerText = `زمن رد فعلك: ${reactionTime} مللي ثانية!`;
            box.style.backgroundColor = '#007bff';
            box.innerText = 'انتهت اللعبة';
            box.onclick = null;
        } else if (box.innerText === 'انتظر...') {
            clearTimeout(timeout);
            result.innerText = 'لقد ضغطت مبكراً! حاول مرة أخرى.';
            box.style.backgroundColor = '#dc3545';
            box.innerText = 'فشل!';
            box.onclick = null;
        }
    };
}
