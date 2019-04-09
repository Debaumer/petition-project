const titles = document.getElementById("title").innerHTML.split(",");
console.log(titles);
var count = 0;

setInterval(function() {
    var overFive = count >= titles.length;
    if (overFive) {
        console.log("over five");
        count = 0;
    }
    document.getElementById("title").innerHTML = titles[count];
    console.log(titles[count], count);
    count++;
}, 800);
