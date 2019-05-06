function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function showlist() {
    document.getElementById("langlist").classList.toggle("hide");
}

function changeLang(x){
    document.getElementById("langlist").classList.toggle("hide");
    $("." + main.lang).css("display", "none");
    $("." + x).css("display","block");
    main.lang = x;;
    console.log(x)
}

var main = {
    langs: ["en", "zh-han", "ko"],
    lang: "en",
    curPage: "home",
    init() {
        this.components.init();
        for(var i = 0; i < this.langs.length; i++){
            if (this.langs[i] != this.lang){$("." + this.langs[i]).css("display","none");}
        }
    },

    changeContent(newContent) {
        var prevEle = $("#content-area #content-" + this.curPage)[0];
        var curEle = $("#content-area #content-" + newContent)[0];
        var prevNav = $("#navbar-" + this.curPage)[0];
        var curNav = $("#navbar-" + newContent)[0];
        if (prevEle == null || curEle == null) { console.log("Error trying to change content"); if (this.debug) { console.trace() } return; }
        prevEle.classList.toggle("hide");
        curEle.classList.toggle("hide");
        try {
            prevNav.classList.remove("active");
            curNav.classList.add("active");
        } catch (e) {
            console.log(e);
        }
        this.curPage = newContent;
    },

    components: {
        init() {
            this.navbar.init();

            //Query String Manipulaton
            const sectionsId = Object.values($("#content-area").children().map(function () { return this.id.split("-")[this.id.split("-").length - 1] }));
            const start = getParameterByName('target');
            if (sectionsId.includes(start)) {
                main.changeContent(start);
            }

            x = $("#content-jstris19tables .groupstage table td");
            for (var i = 0; i < x.length; i++){
                console.log(x[i].text);    
            }
        },

        navbar: {
            init() {
                $(".sidenav a").not(".closebtn").on("click", function (e) {
                    if (e.target.classList[0] !== "nil") {
                        var arr = e.target.id.split("-");
                        var name = arr[arr.length - 1];
                        var activeEle = $("#navbar-" + name)[0];
                        main.changeContent(name);
                    }
                })
            },
        },
    },

};

$(document).ready(function (e) {
    main.init();
});