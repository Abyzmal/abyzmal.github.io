let isDark = false;

function switchModes(){

    if(isDark === true){
        console.log("I'm true");
        document.documentElement.style.setProperty("--col-01", "#171219");
        document.documentElement.style.setProperty("--col-02", "#f2fbeb");

        document.documentElement.style.setProperty("--col-05", "#1a3843");
        document.documentElement.style.setProperty("--col-06", "#3D7944");

        document.documentElement.style.setProperty("--back-02", "url(img/background2.jpg)");

        document.getElementById("modeButton").innerHTML ="Dark Mode";
        isDark = false;
    } else {
        console.log("i'm false");
        document.documentElement.style.setProperty("--col-01", "#f2fbeb");
        document.documentElement.style.setProperty("--col-02", "#171219");

        document.documentElement.style.setProperty("--col-05", "#e6a6d1");
        document.documentElement.style.setProperty("--col-06", "#DA7DBC");

        document.documentElement.style.setProperty("--back-02", "url(img/background1.jpg)");

        document.getElementById("modeButton").innerHTML ="Light Mode";
        isDark = true;
    }
}
