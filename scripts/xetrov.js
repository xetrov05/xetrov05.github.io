var xetrov = {
    modules: {},
    curPage: "home",
    debug: true,
    curscroll: 1,
    /**
     * Call on page load.
     */
    init() {
        this.components.init();
    },

    /** 
     * Change the content shown to the content specified. Affects navbar and content-area.
     */
    changeContent(newContent) {
        newContent = newContent.toLowerCase();
        var prevEle = $("#content-area #content-" + this.curPage)[0];
        var curEle = $("#content-area #content-" + newContent)[0];
        var prevNav = $("#navbar-" + this.curPage)[0];
        var curNav = $("#navbar-" + newContent)[0];
        if (prevEle == null || curEle == null) { console.log("Error trying to change content"); if (this.debug) { console.trace() } return; }
        prevEle.classList.toggle("hide");
        curEle.classList.toggle("hide");
        try {
            if (prevNav !== undefined)
                prevNav.classList.toggle("active");
            curNav.classList.toggle("active");
        } catch (e) {
            console.log(e);
        }
        this.curPage = newContent;
    },

    components: {
        init() {
            this.hamburger.init();
            this.navbar.init();
        },

        navbar: {
            init() {
                $(".navbar ul li").on("click", function (e) {
                    var arr = e.target.id.split("-");
                    var name = arr[arr.length - 1];
                    var activeEle = $("#navbar-" + name)[0];
                    $("#navbar-title")[0].innerHTML = name.substring(0, 1).toUpperCase() + name.substring(1);
                    xetrov.changeContent(name);
                })
            },
        },

        hamburger: {
            init() {
                // navbar hamburger show navbar
                $("#navbar-hamburger").on("click", function (e) {
                    $(".navbar ul")[0].classList.toggle("mobile-hide");
                });
            },
        },
    },

};

$(document).ready(function (e) {
    xetrov.init();
});