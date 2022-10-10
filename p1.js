var arr = [3, 15, 26, 19, 5, 38, 36, 48, 4, 45];
var i = 0;
var j = 0;
var abort = false;
var num1, num2;

$(document).ready(function () {
    $("#code-place").hide();
    $("#code-button")
        .mouseenter(function () {
            $("#code-place").fadeIn(500);
        })
        .mouseleave(function () {
            $("#code-place").fadeOut(500);
        })
})



function stop() { abort = true; }
function reset() { window.location.reload(true); }

function setClass(num1, num2) {

    highlight(document.getElementById("line3"))

    setTimeout(function () {
        num1.children[0].setAttribute("class", "active");
        num2.children[0].setAttribute("class", "active");
    }, 500);
}

function remClass(num1, num2) {
    setTimeout(function () {
        num1.children[0].setAttribute("class", "");
        num2.children[0].setAttribute("class", "");
    }, 500);
}

function remLines() {
    setTimeout(function () {
        document.getElementById("line1").classList.remove("active");
        document.getElementById("line2").classList.remove("active");
        document.getElementById("line3").classList.remove("active");
        document.getElementById("line4").classList.remove("active");
    }, 500);
}

function htmlAnim(num1, num2) {

    highlight(document.getElementById("line4"));
    setTimeout(function () {
        //css animation
        //num1.setAttribute("class","swapForward");
        //num2.setAttribute("class","swapBack");

    }, 1000);
    setTimeout(function () {
        var anim1 = `<animateTransform id="` + i + `` + j + `a" attributeName="transform" type="translate" from="0,0" to="60,0" dur="1s"
        additive="sum" fill="freeze"/>`;
        num1.innerHTML += anim1;
        var anim2 = `<animateTransform id="` + i + `` + j + `b" attributeName="transform" type="translate" from="0,0" to="-60,0" dur="1s"
        additive="sum" fill="freeze"/>`;
        num2.innerHTML += anim2;

        document.getElementById("" + i + "" + j + "a" + "").beginElement();
        document.getElementById("" + i + "" + j + "b" + "").beginElement();
    }, 1000);

}

function highlight(id) {
    setTimeout(function () {
        id.classList.add("active");
    }, 1000);
}

function codePrint(id1, id2, flag) {

    if (flag) {
        setTimeout(function () {
            //code-printing 
            var div = document.getElementById("code-print");
            var content = "<p>For i = " + i + " and j = " + (j - 1) + " check if " + id1 + " is greater than " + id2 + ".</p>";
            div.innerHTML = content;
        }, 200);
    }
    else {
        setTimeout(function () {
            var div = document.getElementById("code-print");
            var content = "<p> Swap " + arr[j] + " with " + arr[j - 1] + "!</p>";
            div.innerHTML = content;
        }, 1000);
    }
}

function sort(n) {

    function loop() {

        setTimeout(function () {

            if (abort) return;

            if (i < n - 1) {
                remClass(num1, num2);
                loop();
            }

            if (j < n - i - 1) {

                //code-printing

                var id1 = "r";
                var id2 = "r";
                id1 += j;
                id2 += j + 1;
                codePrint(id1, id2, 1);

                num1 = document.getElementById(id1);
                num2 = document.getElementById(id2);
                setClass(num1, num2);


                if (arr[j] > arr[j + 1]) {

                    //array update
                    var tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;

                    codePrint(id1, id2, 0);
                    htmlAnim(num1, num2);

                    var tmp = document.getElementById(id2);
                    document.getElementById(id1).id = id2;
                    tmp.id = id1;
                }
            }

            if (j >= n - i - 1) {
                i++;
                j = 0;
                highlight(document.getElementById("line1"));
                if (i == 10) {
                    var div = document.getElementById("code-print");
                    var content = "<p>Done!</p>";
                    div.innerHTML = content;
                }
            } else {
                j++;
                highlight(document.getElementById("line2"));
            }

            setTimeout(function () {
                remClass(num1, num2);
            }, 1000);

            remLines();

        }, 1500);

    }
    loop();

}
