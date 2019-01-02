/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(196,232,255,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "rgb(196,232,255)";
}
var xetrov = {
    curPage: "home",
    init() {
        this.components.init();
    },

    changeContent(newContent) {
        var prevEle = $("#content-area #content-" + this.curPage)[0];
        var curEle = $("#content-area #content-" + newContent)[0];
        var prevNav = $("#navbar-" + this.curPage)[0];
        var curNav = $("#navbar-" + newContent)[0];
        if (prevEle == null || curEle == null) { console.log("Error trying to change content"); if (this.debug) { console.trace() } return; }
        console.log(prevNav);
        console.log(curNav);
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
        },

        navbar: {
            init() {
                $(".sidenav a").on("click", function (e) {
                    var arr = e.target.id.split("-");
                    var name = arr[arr.length - 1];
                    var activeEle = $("#navbar-" + name)[0];
                    xetrov.changeContent(name);
                    closeNav()
                })
            },
        },
    },

};

$(document).ready(function (e) {
    xetrov.init();
});