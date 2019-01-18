//dataset
var nutriInfo = [
    {'name':'total fat','percentage':'10%'},
    {'name':'vitamin c','percentage':'40%'},
]

var nutriPercent = [
    {inner: [50, 24, 16, 5, 2, 3],outer: [9,91]},
    {inner: [50, 24, 16, 5, 2, 3],outer: [40,60]},
];
// 1.tool function
//create DOM element
function tag(tagName){
    return document.createElement(tagName);
}

//create popup_down, enter div's id via para1 and nutrition name, nutrition percent via para2 and para3 respectively
// var temp = [];
// var hovered = false;
// document.addEventListener('mouseover',myfunction)

// function myfunction(eee){
//     hovered = true;
//     tarNum = eee.target.className.baseVal;
//     console.log(tarNum);
//     switch (tarNum){
//         case 'st54':
//         temp = [];
//         temp.push(nutriInfo[0])
        
//         break;

//         case 'st60':
//         temp = [];
//         temp.push(nutriInfo[1])
//         break;
//     }
//     console.log(hovered)
//     return temp
// }


function createPopUp1(entID){
    var div = tag('div');
    div.id = entID
    var title = tag('h2');
    title.id = 'nutriName'
    title.innerHTML = '';
    div.appendChild(title);
    var content = tag('p');
    content.id = 'nutriPercent'
    content.innerHTML = '';
    div.appendChild(content);

    var desc = tag('h4');
    desc.textContent = 'Inner Radius - ';
    div.appendChild(desc);

    var desc2 = tag('h4');
    desc2.textContent = 'Food Containment/Daily Intake Percentage';
    div.appendChild(desc2);

    var desc = tag('h4');
    desc.textContent = 'Outer Radius - ';
    div.appendChild(desc);

    var desc2 = tag('h4');
    desc2.textContent = 'Percentage of Various Nutrients Required Daily';
    div.appendChild(desc2);

    return div;
}

//create popup_left, enter div's id via para1
function createPopUp2(entID, imgUrl){
    var div = tag('div');
    div.id = entID;
    var divImg = tag('div');
    divImg.className = 'divImg';
    divImg.style.background = imgUrl;
    // console.log(divImg);
    div.appendChild(divImg);

    var title = tag('h3');
    title.textContent = 'COLOR';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = 'Brown';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    
    var title = tag('h3');
    title.textContent = 'CATEGORY';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = 'Legumes';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    // console.log(div);

    var title = tag('h3');
    title.textContent = 'AMOUNT PER DAY';
    div.appendChild(title);
    var content = tag('p');
    content.textContent = '1 oz';
    div.appendChild(content);
    var line = tag('hr');
    div.appendChild(line);
    console.log(div);

    return div;
}

//draw ring chart, and set svg's id via entId
function drawRingchart(entId){
    var width = 460,
        height = 300,
        cwidth = 30;

    var color = d3.scale.category20c();

    var pie = d3.layout.pie()
        .sort(null);

    var arc = d3.svg.arc();
    var svg = d3.select("#popup_left").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('class','ringChart')
        .attr("id", entId)
        .append("g")
        .attr("transform", "translate(" + (-80 + width / 3) + "," + (height / 3 -10) + ")")

    var gs = svg.selectAll("g").data(d3.values(nutriPercent[0])).enter().append("g");
    var path = gs.selectAll("path")
        .data(function(d) { return pie(d); })
        .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", function(d, i, j) { return arc.innerRadius(16+cwidth*j).outerRadius(cwidth*(j+1))(d); });

    function drawRect(){
        var data2 = [
            {'name':'Carbohydrate(sugar)'},
            {'name':'Total fat'},
            {'name':'Protein'},
            {'name':'Mineral Substance'},
            {'name':'Fiber'},
            {'name':'Other'},
        ]
        // var data2 = [1,2,3,4,5,6]
        var w = 300;
        var h = 100;
        var gs2 = svg.selectAll("g").data(d3.values(data2)).enter().append("g");
        var rectangle = gs2.selectAll('rect')
                            .data(data2)
                            .enter()
                            .append("rect")
                            .attr("y", function(d, i) {
                                return (i * 18) - 50;  //Bar width of 20 plus 1 for padding
                            })
                            .attr("x", 80)
                            .attr("width", 16)
                            .attr("height", 6)
                            .attr("fill", function(d, i) { return color(i); });
        var text =gs2.selectAll('text')
                    .data(data2)
                    .enter()
                    .append('text')
                    .text(function(d,i) {
                        return data2[i].name;
                })
                .attr("y", function(d, i) {
                    return -45 +i * (w / data2.length)/2.7;
            })
            .attr("x", function(d) {
                    return 100 ;
            })
            .style("fill","#525e6a")
        }
        drawRect();
    return svg
}

//position popup window to certain div as my icon, the popup will appear when the mouse hover at "myicon",
//while whichpop determines which kind of popup to choose: popup_left or popup_down

function positionPopUp(entID,whichpop){
    var myicon = document.getElementById(entID);
    var currentPop = document.getElementById(whichpop);

    function showPopup(evt) {
    
        myicon.style = "cursor:pointer;opacity:0.95";
        
        var iconPos = myicon.getBoundingClientRect();
        if(whichpop == 'popup_left'){
            currentPop.style.left = (iconPos.right + 20) + "px";
            currentPop.style.top = (window.scrollY + iconPos.top - 70) + "px";
        }else if(whichpop == 'popup_down'){
            currentPop.style.left = (iconPos.right -144) + "px";
            currentPop.style.top = (window.scrollY + iconPos.top + 24) + "px";
        }else{
            return;
        }
        currentPop.style.display = "block";
    }
    function hidePopup(evt) {
        myicon.style = "opacity:0.6";
        currentPop.style.display = "none";

    }
    myicon.addEventListener("mouseover", showPopup);
    myicon.addEventListener("mouseout", hidePopup);

}


///////////////////////////////////////////////////////////////////////
//2.监听全局点击事件
// var nutriCont = [
//     {'name':'total fat231','percentage':'8%'},
//     {'name':'Protein','percentage':'65%'}
// ]  

// document.onmouseover = function(eee){
//     tarNum = eee.target.className.baseVal;
//     var list=[]
//     switch(tarNum){
//         case 'st54':
//         console.log('first');
//         list=[];
//         list.push(nutriCont[0]);
//         enterCont(list[0].name,list[0].percentage)
//         positionPopUp("myicon",'popup_left');
//         break;
        
//         case 'st60':
//         list=[];
//         list.push(nutriCont[1]);
//         enterCont(list[0].name,list[0].percentage)
//         positionPopUp("myicon2",'popup_left');
//         break;
//     }
        
// }
var pop1 = createPopUp1('popup_left');
document.body.appendChild(pop1);
function changeText(info1,info2){
    var name = document.getElementById('nutriName');
    var percent = document.getElementById('nutriPercent');
    name.innerHTML = info1
    percent.innerHTML = info2
}
document.onmouseover = function(eee){
    num = eee.target.className.baseVal
    console.log(num);
    // pop1 = createPopUp1('popup_left');
    switch(num){
        case 'st54':
        var info1 = nutriInfo[0].name;
        var info2 = nutriInfo[0].percentage;
        changeText(info1, info2);
        ring = drawRingchart('ringchart');

        case 'st60':

        ring = drawRingchart('ringchart');
    }
    
    positionPopUp('myicon','popup_left')
    positionPopUp('myicon2','popup_left')
}


var pop2 = createPopUp2('popup_down',"#000 url('images/walnut2.jpg') no-repeat");
document.body.appendChild(pop2);
positionPopUp('myfood','popup_down');




