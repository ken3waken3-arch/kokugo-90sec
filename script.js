const slides=[
 {k:'なぜ見直す？｜資料の事実',t:'学びのつながりが見えにくい',b:'領域や文章の種類ごとに学ぶと、共通する力や知識・技能との関係が見えにくい。情報の信頼性を確かめる必要も高まっています。'},
 {k:'続けて大切にする方向｜資料の事実',t:'読む・書く・話す／聞く',b:'三領域をなくすのではなく、領域ごとの力を育てながら、相互のつながりを明確にする方向です。'},
 {k:'見直す方向｜資料中の仮称・例示',t:'「話や文章の機能」で結ぶ',b:'事実や知識の理解、理由や主張の吟味、思いや経験の表出、協働による深化。四分類は仮称・例示です。'},
 {k:'見直す方向｜資料の事実',t:'知識・技能の位置付けを整理',b:'学びの中で使って深める側面と、言葉や文化の理解を教養として深める側面に整理する案です。'},
 {k:'見直す方向｜資料の事実',t:'情報・AI・書く手段',b:'情報源やAI出力を吟味。書写の評価と筆記手段を区別し、書字困難にはICTや代替措置を含めて対応します。'},
 {k:'授業への提案',t:'読む→確かめる→書く→対話',b:'短い記事で主張と根拠を読み、出典を比べ、自分の意見を書く。対話後に推敲する授業例です。'}
];
const topics=[
 {type:'why',title:'なぜ見直す？ 学びのつながりが見えにくい',text:'文章の種類ごと、領域ごとに学習すると、共通して働く力が見えづらく、単元間の関連を作りにくいという課題が資料に記されています。',pages:'資料1/4 印刷頁127–130（PDF頁128–131）'},
 {type:'continues',title:'続けて大切にする方向：三領域',text:'「話すこと・聞くこと」「書くこと」「読むこと」は学びの領域として置かれます。領域を廃止するのではなく、機能に着目して関連付ける方向です。',pages:'資料1/4 印刷頁129–133（PDF頁130–134）'},
 {type:'change',title:'見直す方向：領域・単元を関連付ける',text:'話や文章が社会の中で果たす機能に着目し、異なる領域の学びをつなぐ考え方が提案されています。',pages:'資料1/4 印刷頁129–133（PDF頁130–134）'},
 {type:'change',title:'4つの機能は仮称・例示',text:'事実や知識の整理と理解、考えや主張の理由付けと吟味、思いや経験の表出と想像、協働による深化や合意。確定済みの評価基準ではありません。',pages:'資料1/4 印刷頁132–133（PDF頁133–134）'},
 {type:'change',title:'知識・技能を二側面で整理する案',text:'①各領域の学習過程で使い深める ②言葉や言語文化の知識を教養として深める、という整理です。',pages:'資料1/4 印刷頁129–130（PDF頁130–131）'},
 {type:'change',title:'情報の妥当性・信頼性を確かめる',text:'生成AIを含むICTは学習のねらいに合うときに活用し、出力も比較・吟味する。児童生徒自身が行うべき思考・判断・表現を置き換えないよう留意する方向です。',pages:'資料1/4 印刷頁138–139（PDF頁139–140）'},
 {type:'change',title:'書写の評価と表現手段を区別する',text:'書写で評価する「文字を整えて書く力」と、表現のための筆記を区別。小中学校で書写を引き続き重視し、特に小学校の手書き指導を推進する方向です。',pages:'資料1/4 印刷頁140（PDF頁141）'},
 {type:'change',title:'書字に困難がある子への支援',text:'デジタル学習基盤の活用や代替措置の提供を含め、一人一人の特性を踏まえた指導を明確にする案です。',pages:'資料1/4 印刷頁140（PDF頁141）'},
 {type:'proposal',title:'授業案：記事を読み、確かめ、意見を書く',text:'主張・根拠・出典を確認し、別資料と比べて意見を書く。対話を受けて推敲する。ここに示す一連の活動は、審議まとめをもとにした授業への提案です。',pages:'授業への提案（公的な決定事項ではありません）'}
];
let index=0,playing=false,elapsed=0,timerId=null;const $=id=>document.getElementById(id);const TOTAL=90,PER_SCENE=TOTAL/slides.length;
function render(){const s=slides[index];$('slideCount').textContent=`${index+1} / ${slides.length}`;$('slideTitle').textContent=s.t;$('slideBody').textContent=s.b;$('kicker').textContent=s.k;$('slideImage').src=`assets/video-slide-${String(index+1).padStart(2,'0')}.jpg`;$('slideImage').alt=`${s.k}：${s.t}`;$('progress').style.width=`${Math.min(100,elapsed/TOTAL*100)}%`;$('timer').textContent=`${fmt(elapsed)} / 01:30`;$('prev').disabled=index===0;$('next').disabled=index===slides.length-1}
function fmt(sec){sec=Math.floor(sec);return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`}
function tick(){elapsed=Math.min(TOTAL,elapsed+1);index=Math.min(slides.length-1,Math.floor(elapsed/PER_SCENE));render();if(elapsed>=TOTAL)stop()}
function stop(){playing=false;clearInterval(timerId);timerId=null;$('play').textContent='▶ スライド解説を再生'}
$('prev').onclick=()=>{index=Math.max(0,index-1);elapsed=index*PER_SCENE;render()};$('next').onclick=()=>{index=Math.min(slides.length-1,index+1);elapsed=index*PER_SCENE;render()};$('play').onclick=()=>{if(playing){stop();return}if(elapsed>=TOTAL){elapsed=0;index=0}playing=true;$('play').textContent='⏸ 一時停止';timerId=setInterval(tick,1000)};
function fillCards(q=''){const found=topics.filter(x=>(x.title+x.text+x.pages+x.type).toLowerCase().includes(q.toLowerCase()));$('cards').innerHTML=found.map(x=>`<article class="card"><span class="tag ${x.type==='proposal'||x.type==='change'?'proposal':''}">${x.type==='proposal'?'授業への提案':x.type==='continues'?'続けて大切にする方向':x.type==='why'?'なぜ見直す？':'見直す方向｜資料の事実'}</span><h3>${x.title}</h3><p>${x.text}</p><p class="pages">${x.pages}</p></article>`).join('');$('resultCount').textContent=`${found.length}件を表示`}
$('search').addEventListener('input',e=>fillCards(e.target.value));render();fillCards();
