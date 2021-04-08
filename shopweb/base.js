window.onload = function phoneList() {
    data = {
        pic: ["phone_1.png", "phone_2.png", "phone_1.png", "phone_2.png",
            "phone_1.png", "phone_2.png", "phone_1.png", "phone_2.png",
            "phone_1.png", "phone_2.png", "phone_1.png", "phone_2.png",
            "phone_1.png", "phone_2.png", "phone_1.png", "phone_2.png",
            "phone_1.png", "phone_2.png", "phone_1.png", "phone_2.png",
        ],
        title: ["小米11", "k30系列", "小米11", "k30系列",
            "小米11", "k30系列", "小米11", "k30系列",
            "小米11", "k30系列", "小米11", "k30系列",
            "小米11", "k30系列", "小米11", "k30系列",
            "小米11", "k30系列", "小米11", "k30系列",]
    }
    let center_pic_scroll = document.getElementById("center_pic_scroll");
    let center_phone_list = document.getElementById("center_phone_list");
    //设置每个元素的高度为236px
    let scroll_width = center_pic_scroll.offsetWidth;
    let picture = data.pic;
    console.log(picture);
    let temp = []
    for (let i = 0; i < picture.length; i++) {
        let html = center_phone_list.innerHTML.replace("{{id}}", i).
            replace("{{img}}", picture[i]).
            replace("{{tag}}", data.title[i]);
        temp.push(html);
    }
    center_phone_list.innerHTML = temp.join("<br>");
    let list_width = center_phone_list.offsetWidth;
    let phone = document.getElementsByClassName("phone")[0];
    let phone_width = phone.offsetWidth;
    let phone_height = phone.clientHeight;
    let num = 4;
    console.log("num" + num);
    for (let j = 0; j < picture.length; j++) {
        let x = parseInt(j % num);
        let y = parseInt(j / num);
        let html = document.getElementById(j);
        html.style.left = x * phone_width + "px";
        html.style.top = y * phone_height + "px";
    }
    let center_menu_list = document.getElementsByClassName("center_phone_list")[0];
    let center_menu = document.getElementsByClassName("center_menu");
    center_menu.addEventListener("mouseover", dis());
    center_menu.addEventListenter("mouseout", hidden());
    function dis() {
        let name = center_menu_list.className.replace("display", "");
        center_menu_list.className = name;
    };
    function hidden() {
        console.log(sfdfds);
        let name = center_menu_list.className + "&nbsp" + "dispaly";
        center_menu_list.className = name;
    };

}